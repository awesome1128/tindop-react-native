import React, {Component} from 'react';
import {Image, Text, View, TouchableOpacity, TouchableHighlight, SafeAreaView, ScrollView, Dimensions, Animated, Alert, Platform, Modal } from 'react-native';

import { Actions } from 'react-native-router-flux';
import ActionSheet from 'react-native-actionsheet';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Carousel, { Pagination, ParallaxImage } from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import moment from 'moment';

import firebaseService from '../services/firebase';
import * as userActions from '../store/actions/userActions';
import styles from '../style/dashboardStyle';
import I18n from '../i18n/index';
import ProfileMenu from '../components/ProfileMenu';

const dbRef = firebaseService.database();
const reportOptions = [I18n.t('cancel'), I18n.t('reportProfile'), I18n.t('shareProfile')];

export default class PopupSwipeUserList extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      likeCount: 0,
      userIndex: this.props.selectedUserIndex,
    }
  }

  componentWillMount(){
    this.selectedUser(this.props.selectedUserIndex);
  }

  onBack(){
     this.props.onProfileShow(false);
  }

  selectedUser(index){
    this.setState({ userIndex: index });
    const userItem = this.props.userList[index];
    this.getLikeCounts(userItem['userID']);
  }


  likeClicked(){

    const userItem = this.props.userList[this.state.userIndex];

    const likerUserID = userItem['userID'];
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

  getLikeCounts(ownerUserID){
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

  async messageClicked(){

    const userItem = this.props.userList[this.state.userIndex];
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

    this.props.onProfileShow(false);

  }

  moreClicked(item){
    Actions.Profile({user: item});
    this.props.onProfileShow(false);
  }

  onPressActionSheet(i) {

    if(i==1){
      this.reportProfile();
    }
    else if(i==2){
      this.shareProfile();
    }

  }

  reportProfile(){

    console.log('reported');
    const userItem = this.props.userList[this.state.userIndex];

    const reportorID = window.currentUser['userID'];
    const userID = userItem['userID'];

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

  shareProfile(){

  }

  _renderItem({item, index}, parallaxProps) {

      const { firstname, pictures, birth, avatar } = item;
      let contacts = item.contacts;
      if(contacts === undefined)
        contacts = [];
      const age = moment(birth, 'DD / MM / YYYY').fromNow();
      const title = I18n.t("userNameAge", {name: firstname, age: age.replace(/\D/g,'')});

      var imgListstr = "";
      pictures.map((picture) =>{
        if(picture !== ''){
          imgListstr = imgListstr + ' ● ';
        }
      })

      const even = (index + 1) % 2 == 0;
      const isNewFlag = userActions.getNewFlag(item.createdAt)

      return (
          <View
            activeOpacity={1}
            style={styles.slideInnerContainer}
          >

              <View style={styles.shadow} />
              <View style={styles.imageContainer}>

                  <ParallaxImage
                    source={{uri: avatar}}
                    containerStyle={[styles.imageContainer, even ? styles.imageContainerEven : {}]}
                    style={styles.image}
                    parallaxFactor={0.35}
                    showSpinner={true}
                    spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
                    {...parallaxProps}
                  />
                  <View style={styles.radiusMask} />

              </View>

              <View style={{ alignSelf: 'center', position: 'absolute', bottom: 125, elevation: 2, flexDirection: 'row', justifyContent: 'center', alignContent: 'center' }}>
                  <Text style={{ color: '#fdda39', fontSize: responsiveFontSize(1.6) }}>{imgListstr}</Text>
              </View>

              <View style={styles.profileContainer}>
                  <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems:'center'}}>
                      <Text style={styles.profileName}>{title}</Text>
                      {
                        isNewFlag &&
                        <View style={styles.newProfileBack}>
                          <Text style={styles.newProfileText}>New</Text>
                        </View>
                      }
                  </View>
                  <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                      <Text style={styles.likeCount}>{this.state.likeCount}</Text>
                      <Image source={require('../../assets/UI/icons8-heart_filled.png')} style={styles.likeFilledImage} />
                  </View>
              </View>

              <View style={styles.interestContainer}>
                  <Text style={styles.interest}>{I18n.t('contactWishes')}</Text>
              </View>

              <View style={styles.interestItems}>

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

                  <TouchableOpacity style={styles.morebutton} onPress={() => this.moreClicked(item)}>
                      <Text style={styles.morebuttonText}>+ {I18n.t('more')}</Text>
                  </TouchableOpacity>

              </View>

          </View>
      );
    }

  render(){

    const {userList, vipProfile, selectedUserIndex, latitude, longitude} = this.props;
    const {userIndex} = this.state;
    const userItem = userList[userIndex];

    let userDistance = userActions._getDistanceFromLatLonInKm(latitude, longitude, userItem['position'].latitude, userItem['position'].longitude);

    // We hide location value if it's too close
    if (userDistance < 1){
      userDistance = I18n.t('lessThan');
    }

    return(
      <View style={styles.dialogContent}>

        <View style={styles.vipPart}>
        {vipProfile &&
            <View>
                <Image source={require('../../assets/UI/icon_star.png')} style={styles.vipIcon}/>
                <Text style={styles.vipText}>VIP</Text>
            </View>
        }
        </View>

        <TouchableOpacity hitSlop={{top: 10, bottom: 10, left: 10, right: 10}} onPress={() => this.ActionSheet.show()} style={styles.detailsPart}>
            <Image source={require('../../assets/UI/icon8-three_dots.png')} style={styles.iconthreedots}/>
        </TouchableOpacity>

        <ActionSheet
          ref={o => this.ActionSheet = o}
          options={[I18n.t('cancel'), I18n.t('reportProfile')]}
          cancelButtonIndex={0}
          onPress={(index) => {this.onPressActionSheet(index)}}
        />

        <View style={styles.mainPartContaier}>

            <Carousel
                ref={c => this._carouselRef = c}
                data={userList}
                renderItem={this._renderItem.bind(this)}
                sliderWidth={responsiveWidth(100)}
                itemWidth={responsiveWidth(85.1)}
                hasParallaxImages={true}
                firstItem={selectedUserIndex}
                inactiveSlideScale={0.94}
                inactiveSlideOpacity={0.7}
                loop={true}
                loopClonesPerSide={2}
                containerCustomStyle={styles.slider}
                contentContainerCustomStyle={styles.sliderContentContainer}
                onSnapToItem={(index) => {
                  this.selectedUser(index);
                }}
            />

            </View>

            <View>
                <Text style={styles.distanceText}>{I18n.t("userDistance", {userDistance: userDistance})}</Text>
            </View>

            <ProfileMenu
              onPressBack={() => { this.onBack()}}
              onPressChat={()=>this.messageClicked()}
              onPressLike={() => this.likeClicked()}
            />

        </View>
    )
  }
}
