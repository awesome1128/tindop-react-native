import React, {Component} from 'react';
import {Platform, Alert, StyleSheet, Image, Text, View, ScrollView, TouchableOpacity} from 'react-native';


import { Actions } from 'react-native-router-flux';
import { Transition } from 'react-navigation-fluid-transitions';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import Rate, { AndroidMarket } from 'react-native-rate';

import firebaseService from '../services/firebase';
import styles from '../style/settingsStyle';
import I18n from '../i18n/index';
import LogoHeader from '../components/logoHeader';
import * as userActions from '../store/actions/userActions';


export default class Settings extends Component {

	constructor(props) {
		super(props);
	}

	rateApp(){

		let options = {
			AppleAppID:"1444649893",
			preferInApp:false,
			openAppStoreIfInAppFails:true,
			fallbackPlatformURL:"https://www.tindop.com/",
		}

		Rate.rate(options, success=>{
				if (success) {
					console.log('success');
				}
		})
	}

	async openLink() {
    try {
      await InAppBrowser.isAvailable()
      InAppBrowser.open('https://www.tindop.com', {
        // iOS Properties
        dismissButtonStyle: 'go',
        preferredBarTintColor: '#1a1a1a',
        preferredControlTintColor: 'white',
        readerMode: false,
        // Android Properties
        showTitle: true,
        toolbarColor: '#1a1a1a',
        secondaryToolbarColor: 'black',
        enableUrlBarHiding: true,
        enableDefaultShare: true,
        forceCloseOnRedirection: false,
				animations: {
					startEnter: 'slide_in_right',
					startExit: 'slide_out_left',
					endEnter: 'slide_in_right',
					endExit: 'slide_out_left',
				},
      }).then((result) => {
        console.log(JSON.stringify(result))
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  logOutClicked(){
    userActions.cleardata();
    Actions.reset('ImageSlider');
  }

  deleteClicked(){

    Alert.alert(
      '',
      I18n.t('deleteAccountMsg'),
      [
        {text: I18n.t('no'), onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: I18n.t('yes'), onPress: () => this.deleteAccount()},
      ],
      { cancelable: false }
    )
  }

  deleteAccount(){
    const accountID = window.currentUser['userID'];
    const databaseRef = firebaseService.database();
    databaseRef.ref('UsersList').child(accountID).remove();
    databaseRef.ref('PhotoFluxImg')
    .orderByChild('owner').equalTo(accountID)
    .once('value', (snapshot)=>{
      snapshot.forEach((data) => {
        databaseRef.ref('PhotoFluxImg').child(data.key).remove();
      });
    })
    databaseRef.ref('ChatRooms')
    .once('value', (snapshot)=>{
      snapshot.forEach((data) => {
        if(data.key.includes(accountID))
          databaseRef.ref('ChatRooms').child(data.key).remove();
      });
    })

    var currentUser = firebaseService.auth().currentUser;
    currentUser.delete().then(()=> {
      this.logOutClicked();
      console.log('delete account success')
    })
    .catch((error)=> {
      console.log('account delete error=', error);
    });
  }

  render() {
    return (
      <View style={styles.container}>

				<LogoHeader
					onPress={()=> Actions.pop()}
					text='Settings'
					displayLogo={false}
					position='absolute'
				/>

				<ScrollView style={{paddingVertical: 150}}>

					<View>
						<TouchableOpacity style={styles.itemContainer} onPress={() => Actions.Privacy()}>
							<Text style={styles.textItem}>{I18n.t('privacyPolicy')}</Text>
							<Image style={styles.imgItem} source = {require('../../assets/UI/icons8-right-arrow.png')}/>
						</TouchableOpacity>
					</View>
					<View
						style={{
							width: "100%",
							borderColor: "#636363",
							borderWidth: 0.5,
						}}
					/>

	        <View>
	          <TouchableOpacity style={styles.itemContainer} onPress={() => this.openLink()}>
	            <Text style={styles.textItem}>{I18n.t('about')}</Text>
	            <Image style={styles.imgItem} source = {require('../../assets/UI/icons8-right-arrow.png')}/>
	          </TouchableOpacity>
	        </View>
	        <View
	          style={{
	            width: "100%",
	            borderColor: "#636363",
	            borderWidth: 0.5,
	          }}
	        />

{/*	        <View>
	          <TouchableOpacity style={styles.itemContainer}>
	            <Text style={styles.textItem}>{I18n.t('help')}</Text>
	            <Image style={styles.imgItem} source = {require('../../assets/UI/icons8-right-arrow.png')}/>
	          </TouchableOpacity>
	        </View>
	        <View
	          style={{
	            width: "100%",
	            borderColor: "#636363",
	            borderWidth: 0.5,
	          }}
	        /> */}

	        <View style={styles.itemTextContainer}>
						<TouchableOpacity onPress={() => this.rateApp()}>
	          	<Text style={styles.optionText}>{I18n.t('giveOpinion')}</Text>
						</TouchableOpacity>
	        </View>

	        <View style={styles.logoutBtnContainer}>
	          <TouchableOpacity style={styles.itemTextContainer} onPress={()=>this.logOutClicked()}>
	            <Text style={styles.textItem}>{I18n.t('logOut')}</Text>
	          </TouchableOpacity>
	        </View>

	        <View style={styles.logoContainer}>
	          <Image source={require('../../assets/main/logo.png')} style={styles.logoImg}/>
	        </View>

	        <View style={styles.deleteBtnContainer}>
	          <TouchableOpacity style={styles.itemTextContainer} onPress={()=>this.deleteClicked()}>
	            <Text style={styles.textItem}>{I18n.t('deleteAccount')}</Text>
	          </TouchableOpacity>
	        </View>

				</ScrollView>

      </View>
    )
  }


}
