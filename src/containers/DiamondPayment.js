import React, {Component} from 'react';
import {Alert, Platform, StyleSheet, Image, Text, View, ScrollView, TouchableOpacity} from 'react-native';

import { Actions } from 'react-native-router-flux';
import Switch from 'react-native-switch-pro';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import OneSignal from 'react-native-onesignal';

import I18n from '../i18n/index';
import firebaseService from '../services/firebase';
import LogoHeader from '../components/logoHeader';
import YellowButton from '../components/yellowButton';
import * as userActions from '../store/actions/userActions';

const dbRef = firebaseService.database();

export default class DiamondPayment extends Component {

	constructor(props) {

		super(props);
	}

  backClicked(){
    Actions.pop()
  }

  async goClicked(){

    const {chatID, user} = this.props;
    const userItem = window.currentUser;
    const diamondCount = parseInt(userItem['diamondCounts']);
    const userID = userItem['userID'];

    if(diamondCount > 0){
      var message = { "_id":userActions.generatorMessageID(),
                      "text": "I like to add you in my contact lists.",
                      "createdAt": Date.now(),
                      "user": { "_id": userID,
                                "name": userItem['firstname'],
                                "avatar": userItem['avatar']},
      };

      let contents = {
        'en': I18n.t('notificationNewMessage')
      }
      let otherParameters = {"notifyType": 'message'};
      const tokenList = [userItem['deviceToken']];

      await dbRef.ref('ChatRooms').child(chatID).push(message)
      .then((data) => {
        this.setState({message: ''});
        for ( i = 0; i < tokenList.length; i++)
        {
          OneSignal.postNotification(contents, otherParameters, tokenList[i]);
        }
      }).
        catch((err) => {
          console.log('error===', err);
      });

      userItem['diamondCounts'] = diamondCount - 1;
      window.currentUser = userItem;
      dbRef.ref('UsersList/'+userID).update(userItem);

      Actions.PersonChatRoom({user: user, chatID: chatID, rootBack: true});
    } else {

			Actions.Shop();

		}

  }

  laterClicked(){
    Actions.pop();
  }

  diamondClicked(){
		Actions.Shop();
  }

  render() {

    const {user} = this.props;

		const userItem = window.currentUser;
    const diamondCount = parseInt(userItem['diamondCounts']);

    return (

      <View style={{flex: 1, backgroundColor: '#161616'}}>

				<LogoHeader
					onPress={()=> this.backClicked()}
					displayLogo={false}
					position='absolute'
				/>

				<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>

					<View style={{
						height: responsiveWidth(45),
						width: responsiveWidth(45),
						borderRadius: 500,
						backgroundColor: user['personType'] == 'man' ? '#004eff' : '#f65890',
						overflow: 'hidden'}}
					>

						<View style={{height: responsiveWidth(44), width: responsiveWidth(44), margin: responsiveWidth(0.5), borderRadius: 500, borderColor: '#161616', borderWidth: 5, overflow: 'hidden'}}>
							<FastImage style={{height: responsiveWidth(44), width: responsiveWidth(44)}} source={{uri: user['avatar']}}/>
						</View>

					</View>

					<Text
						style={{fontFamily: 'Lato-Regular',
										width: responsiveWidth(80),
										fontSize: responsiveFontSize(2.4),
										color: '#e1e1e1',
										marginTop: responsiveHeight(6),
										textAlign: 'center',
										lineHeight: 30}}
					>
							{I18n.t('useDiamondTo')} <Text style={{color: '#fde256'}}>{user['firstname']}</Text>?
					</Text>

          <TouchableOpacity style={{width: 50, height: 50, position: 'absolute', right: 20, top: responsiveHeight(16)}} onPress={()=>this.diamondClicked()}>
            <LinearGradient colors={ ["#FDDA39", "#FEEE00"]} style={{flex: 1, borderRadius: 25, alignItems: 'center', justifyContent: 'center'}}>
              <Image source={require('../../assets/main/ruby.png')} style={{width: 39, height: 34.3, marginTop: 3}}/>
              <View style={{position:'absolute', bottom: 5, right: 5, width: 20, height: 20, borderColor: '#fde256', borderWidth: 2, backgroundColor: '#2e2e2e', borderRadius: 500}}>
                <Text style={{color: '#fde256', fontWeight: 'bold', fontSize: 10, marginTop:2, textAlign: 'center'}}>{diamondCount}</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>

					<Image style={{position: 'absolute', left: 20, top: responsiveHeight(17), height: 100, width: 100}} source={require('../../assets/sliders/greenDiamond.png')}></Image>

					<Image style={{position: 'absolute', right: 70, top: responsiveHeight(48), height: 110, width: 110}} source={require('../../assets/sliders/yellowDiamond.png')}></Image>

					<Image style={{position: 'absolute', right: 40, top: responsiveHeight(28), height: 80, width: 80}} source={require('../../assets/sliders/blueDiamond.png')}></Image>

				</View>

        <YellowButton
          text='go'
          onPress={()=> this.goClicked()}
          alternative={true}
					alternativeText='later'
          alternativeAction={()=> this.laterClicked()}
        />

      </View>
    )
  }


}
