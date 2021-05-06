import React, {Component} from 'react';
import {Alert, Image, Text, View, ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-carousel-view';
import Dialog, { DialogContent, SlideAnimation } from 'react-native-popup-dialog';
import { Transition } from 'react-navigation-fluid-transitions';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import Lightbox from 'react-native-lightbox';

import firebaseService from '../services/firebase';
import I18n from '../i18n/index';
import styles from '../style/profileStyle';
import ProfileMenu from '../components/ProfileMenu';
import ContactSubCategoryItem from '../components/ContactSubCategoryItem';
import * as userActions from '../store/actions/userActions';

const dbRef = firebaseService.database();

export default class Profile extends Component {
  constructor(props){
    super(props)
    this.state = {
      profileUser: this.props.user,
      photoList: [],
      likeCount: '',
      subContactList: [],
      isNewFlag: true,
      dialogVisible: false,
    }

    this.showContactSubItemDialog = this.showContactSubItemDialog.bind(this);
  }

  componentWillMount(){
    this.getLikeCounts();
    this.getSubContactList();

    dbRef.ref('PhotoFluxImg').orderByChild('owner')
    .equalTo(this.state.profileUser.userID)
    .limitToLast(6).once("value", (snapshot)=> {
      let imgList = []
      snapshot.forEach((data)=> {
        imgList.push(data.val());
      });
      this.setState({photoList: imgList});
    })

    navigator.geolocation.getCurrentPosition(
       ({coords}) => {
         const {latitude, longitude} = coords;
         if(!!latitude){
           this.setState({
              latitude: latitude,
              longitude: longitude,
           })
         }
       },
       (error) => {
          alert('Error: Are location services on?');
          console.log('error====', error);
        },
       {enableHighAccuracy: true}
     );

    this.setState({isNewFlag: userActions.getNewFlag(this.props.user.createdAt)});
  }

  getSubContactList(){
    const contactList = this.state.profileUser['contacts'];
    let subList = [];
    contactList.map((contactItem)=>{
      // let contactSublist = [];
      contactItem.subcategory.map((subItem)=>{
        if(subItem.selected){
          subList.push(subItem);
        }
      })
      // const selectedSubItem = {
      //   begin: contactItem.begin,
      //   end: contactItem.end,
      //   list: contactSublist,
      // }
      // contactList.push(selectedSubItem);
    })

    console.log('contactList===', subList);
    this.setState({subContactList: subList});
  }

  getLikeCounts(){
    const ownerUserID = this.state.profileUser['userID'];
    dbRef.ref('UserLikes')
    .orderByChild('likeUser').equalTo(ownerUserID)
    .on('value', (snapshot)=>{
      let count_num = 0;
      snapshot.forEach((data) => {
        count_num = count_num + 1;
      });
      this.setState({likeCount: count_num});
    })
  }

  likeClicked(){
    const likerUserID = this.state.profileUser['userID'];
    const ownerUserID = window.currentUser['userID'];

    dbRef.ref('UserLikes')
    .orderByChild('ownerUser').equalTo(ownerUserID)
    .once('value', (snapshot)=>{
        let isExist = false;
        let isExistKey = '';
        snapshot.forEach((data) => {
          const child = data.val();
          if(child['likeUser'] === likerUserID);
          {
            isExist = true;
            isExistKey = data.key;
            return;
          }
        });

        if(!isExist){
          const pushData = {
            likeUser: likerUserID,
            ownerUser: ownerUserID,
            createdAt: new Date().getTime()
          }

          dbRef.ref('UserLikes').push(pushData).then((data) => {
            console.log('liked');
          })
          .catch((err) => {
            console.log('like error===', err);
          });
        }else{
          dbRef.ref('UserLikes').child(isExistKey).remove()
        }
    })
  }

  async messageClicked(){
    const userItem = this.state.profileUser;
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
  }

  reportAbuse(){
    console.log('reported');
    const reportorID = window.currentUser['userID'];
    const userID = this.state.profileUser['userID'];

    firebaseService.database().ref('UserReports')
    .orderByChild('reportor').equalTo(reportorID)
    .once('value', (snapshot)=>{
      let isExist = false;
      snapshot.forEach((childObj)=>{
        const data = childObj.val();
        if(data.user === userID){
          isExist = true;
          return;
        }
      })
      if(!isExist){
        const newData = {
          reportor: reportorID,
          user: userID,
          createdAt: new Date().getTime()
        }
        firebaseService.database().ref('UserReports').push(newData);
        Alert.alert(I18n.t('alertProfileReported'));
      }else{
        Alert.alert(I18n.t('alertAlreadyReportedProfile'));
      }
    })
  }

  showContactSubItemDialog(flag){
    this.setState({ dialogVisible: flag });
  }

  render() {

    const {profileUser, photoList, likeCount, latitude, longitude, isNewFlag, dialogVisible, subContactList} = this.state;

    const { firstname, pictures, contacts, birth, description } = profileUser;
    const age = moment(birth, 'DD / MM / YYYY').fromNow();
    const title = I18n.t("userNameAge", {name: firstname, age: age.replace(/\D/g,'')});

    let imgList = [];
    pictures.map((picture) =>{
      if (picture !== ''){
        imgList.push(picture);
      }
    })

    let userDistance = userActions._getDistanceFromLatLonInKm(latitude, longitude, profileUser['position'].latitude, profileUser['position'].longitude);

    // We hide location value if it's too close
    if (userDistance < 1){
      userDistance = I18n.t('lessThan');
    }

    return (

        <View style={styles.mainContainer}>

            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.mainPart}>
                    <Carousel height={364.5}
                        indicatorSize={7.5}
                        indicatorColor="#FDDA39"
                        indicatorSpace = "10"
                        animate={false}
                        indicatorOffset = {10.5}
                    >
                      {
                        imgList.map((imgObj) => {
                          return(
                            <View>
                              <Lightbox>
                                <FastImage source={{uri: imgObj}} style={styles.carouselImage}/>
                              </Lightbox>
                            </View>
                          )
                        })
                      }
                    </Carousel>
                    <View style={styles.profileContainer}>
                        <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems:'center'}}>
                            <Text style={styles.profileName}>{title}</Text>
                            {
                              isNewFlag &&
                              <View style={styles.newProfileBack}>
                                <Text style={styles.newProfileText}>NEW</Text>
                              </View>
                            }
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                            <Text style={styles.likeCount}>{likeCount}</Text>
                            <Image source={require('../../assets/UI/icons8-heart_filled.png')} style={styles.likeFilledImage} />
                        </View>
                    </View>
                    <View style={styles.interestContainer}>
                        <View style={styles.interestItems}>
                            <Text style={styles.interest}>{I18n.t('contactWishes')}</Text>
                            <View style={styles.interestPart}>
                              {
                                contacts.map((contactObj) =>{
                                  const colorBegin = contactObj.begin;
                                  const colorEnd = contactObj.end;
                                  let imageFile = userActions.getContactImagePath(contactObj['image']);

                                  return(
                                    <LinearGradient colors={ [colorBegin, colorEnd]} style={styles.interestItem}>
                                        <Image resizeMode='contain' source={imageFile} style={styles.interestItemIcon} />
                                    </LinearGradient>
                                  )
                                })
                              }
                            </View>
                        </View>
                        <View style={styles.vipPart}>
                            <Text style={styles.vipText}>VIP</Text>
                            <Image source={require('../../assets/UI/icon_star.png')} style={styles.vipIcon}/>
                        </View>
                    </View>
                    <View style={styles.hobbyContainer}>
                        <ScrollView horizontal style={styles.hobbyPart}>
                        {
                          subContactList.length>0 &&

                          subContactList.map((subContact)=>{
                            return(
                              <TouchableOpacity style={styles.hobbyItem}>
                                  <Text style={styles.hobbyText}>{subContact.text}</Text>
                              </TouchableOpacity>
                            )
                          })
                        }
                        </ScrollView>
                    </View>
                </View>
                <View style={styles.bottomTextContainer}>
                    <Text style={styles.userDistance}>{I18n.t("userDistance", {userDistance: userDistance})}</Text>
                </View>
                <View style={styles.bottomTextContainer}>
                    <Text style={styles.bottomDescription}>{description}</Text>
                </View>
                <View style={styles.photosContainer}>

                    <Text style={styles.bottomDescription}>PHOTOS IN LIVE</Text>

                    <View style={styles.photoItems}>
                      {
                        photoList.map((photoObj)=>{
                          return(
                            <Lightbox>
                              <FastImage source={{uri: photoObj.uri}} style={styles.photoItem} />
                            </Lightbox>
                          )
                        })
                      }
                    </View>
                </View>

                <TouchableOpacity onPress={() => this.reportAbuse()}>
                    <Text style={styles.abuseButton}>{I18n.t('reportAbuse')}</Text>
                </TouchableOpacity>

            </ScrollView>

            <ProfileMenu
              position='stickyBottom'
              onPressBack={() => Actions.pop()}
              onPressChat={() => this.messageClicked()}
              onPressLike={() => this.likeClicked()}
            />

        </View>
    );
  }
}
