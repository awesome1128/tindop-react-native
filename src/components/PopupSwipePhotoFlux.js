import React, {Component} from 'react';
import {Alert, Image, Text, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Animated, StyleSheet, Platform, Modal } from 'react-native';

import { Actions } from 'react-native-router-flux';
import Carousel, { Pagination, ParallaxImage } from 'react-native-snap-carousel';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import PopupDialog, { ScaleAnimation, SlideAnimation, Dialog, DialogContent } from 'react-native-popup-dialog';
import moment from 'moment';
import Lightbox from 'react-native-lightbox';
import ProfileMenu from '../components/ProfileMenu';


import * as userActions from '../store/actions/userActions';
import firebaseService from '../services/firebase';
import styles from '../style/dashboardStyle';
import I18n from '../i18n/index';

const dbRef = firebaseService.database();

export default class PopupSwipePhotoFlux extends Component{

  constructor(props)
  {
    super(props);
    this.state = {
      isloadingBar: false,
      fluxImgUser: '',
      fluxImgItem: '',
      latitude: 0,
      longitude: 0
    }
  }

  componentWillMount(){
    this.selectedFluxItem(this.props.selectedFluxIndex, this.props);
  }

  onBack(){
    this.props.showFluxDialog(false);
  }

  goToprofile(item){
    Actions.Profile({user: item});
    this.props.showFluxDialog(false);
  }

  async messageClicked(){

    const userItem = this.state.fluxImgUser;
    let IDlist = [userItem['userID'], window.currentUser['userID']];
    IDlist.sort();
    const chatID = IDlist[0] + '*_*' + IDlist[1];

    let isExistContact = false;
    await dbRef.ref('ChatRooms/' + chatID).once('value', (snapshot)=>{
      if(snapshot.val() !== null)
        isExistContact = true;
    })
    if(isExistContact){
      Actions.PersonChatRoom({user: userItem, chatID: chatID, rootBack: false});
    }
    else{
      Actions.DiamondPayment({
        user: userItem,
        chatID: chatID
      });
    }
    this.props.showFluxDialog(false)
  }

  selectedFluxItem(index, props){
    if(props.fluxImgList.length > 0){
      const item = props.fluxImgList[index];
      this.getFluxImgInfo(item);
      this.setState({fluxImgItem: item});
    }
  }

  getFluxImgInfo(item){
    this.setState({isloadingBar: true});
    dbRef.ref('UsersList/' + item.owner).once('value', (data)=>{
      if(data.val()!== null){
        let user = data.val();
            user['userID'] = data.key;
            user['type'] = data.type;
        let avatarList = user.pictures;
        if(avatarList){
          avatarList.map((avatar)=>{
            if(avatar !== ''){
              user['avatar'] = avatar;
              return;
            }
          })
        }else{
          user['avatar'] = 'https://i.imgur.com/UYiroysl.jpg';
        }
        let age = moment(user['birth'], 'DD / MM / YYYY').fromNow();
        user['age'] = age.replace(/\D/g,'');
        this.setState({isloadingBar: false,fluxImgUser: user});
      }
      else{
        this.setState({isloadingBar: false,fluxImgUser: ''});
      }
    })
  }

  _renderItem({item, index}) {

      const {latitude, longitude} = this.props;
      const {fluxImgItem, fluxImgUser} = this.state;

      let userDistance = userActions._getDistanceFromLatLonInKm(latitude, longitude, fluxImgItem.latitude, fluxImgItem.longitude);

      // We hide location value if it's too close
      if (userDistance < 1){
        userDistance = I18n.t('lessThan');
      }

      return (
        <View style={styles.dialogContent}>
          <View style={{alignItems: 'center'}}>
            <Lightbox style={{alignItems: 'center', justifyContent: 'center'}}>
              <FastImage
                style = {styles.personImage}
                source = {{uri: item.uri}}
              />
            </Lightbox>
          </View>
          {
            fluxImgUser !== '' &&
            <TouchableOpacity style={styles.namePart} onPress={()=>this.goToprofile(fluxImgUser)}>
                <FastImage
                  style={{width: 27,
                          height: 27,
                          borderRadius: 14,
                          borderWidth: 1,
                          borderColor: fluxImgUser['personType'] == 'man' ? '#004eff' : '#f65890'}}
                  source={{uri: fluxImgUser['avatar']}}
                />
              <Text style={styles.personName}>{fluxImgUser.firstname + ', ' + fluxImgUser['age'] + I18n.t('userAge')}</Text>
            </TouchableOpacity>
          }
          {
            fluxImgItem !== '' &&
            <View style={styles.bottompart}>
              <Text style={styles.distance}>{I18n.t("userDistance", {userDistance: userDistance})}</Text>
            </View>
          }

        </View>
      );
    }

  render(){
    const {fluxImgList, selectedFluxIndex, latitude, longitude} = this.props;
    const {fluxImgItem, fluxImgUser} = this.state;

    return(
      <View style={{height: responsiveHeight(75), minHeight: 600}}>

        <Carousel
            ref={c => this._carouselRef = c}
            data={fluxImgList}
            renderItem={this._renderItem.bind(this)}
            sliderWidth={responsiveWidth(100)}
            itemWidth={responsiveWidth(87)}
            firstItem={selectedFluxIndex}
            inactiveSlideScale={0.9}
            inactiveSlideOpacity={0.7}
            loop={true}
            loopClonesPerSide={2}
            containerCustomStyle={styles.slider}
            contentContainerCustomStyle={styles.sliderContentContainer}
            onSnapToItem={(index) => this.selectedFluxItem(index, this.props) }
        />

        <ProfileMenu
          onPressBack={() => { this.onBack()}}
          onPressChat={()=>this.messageClicked()}
          onPressLike={() => Alert.alert("Like")}
          displayHeart={false}
        />

      </View>
    )
  }
}
