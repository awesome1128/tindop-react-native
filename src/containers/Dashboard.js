import React, {Component} from 'react';
import {Alert, Image, Text, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Animated, StyleSheet, Platform, Modal, StatusBar } from 'react-native';

// Libraries
import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import PopupDialog, { ScaleAnimation, SlideAnimation, Dialog, DialogContent } from 'react-native-popup-dialog';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Carousel, { Pagination, ParallaxImage } from 'react-native-snap-carousel';
import { connect } from 'react-redux'
import MapView, { PROVIDER_GOOGLE, Circle, Marker, AnimatedRegion } from 'react-native-maps';
import OneSignal from 'react-native-onesignal';
import { sessionGetAllPostPictures } from '../store/session/actions'
import PropTypes from 'prop-types';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import { BallIndicator } from 'react-native-indicators';
import { Transition } from 'react-navigation-fluid-transitions';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import I18n from '../i18n/index';
import * as userActions from '../store/actions/userActions';
import firebaseService from '../services/firebase';
import PopupSwipeUserList from '../components/PopupSwipeUserList';
import PopupSwipePhotoFlux from '../components/PopupSwipePhotoFlux';

// Styles
import styles from '../style/dashboardStyle';
import mapStyle from '../style/mapStyle';

const dbRef = firebaseService.database();

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;
const DEFAULT_ZOOM = 0.09;

var mapRegion = {}

class Dashboard extends Component {

    constructor(props){
        super(props);

        this.state = {
            vipProfile: false,
            isloadingBar: false,
            fluxImageList: [],
            userList: [],
            profileVisible: false,
            reportDialog: false,
            profileSetting: false,
            photoFluxVisible: false,
            selectedFluxIndex: 0,
            selectedUserIndex: 0,
            isHideLocation: false,
            position:{
              latitude: 0,
              longitude: 0
            },
            markers: [],
            error: null,
            photoFluxImg: null,
            displayLocation: true
        }
        this.onProfileShow = this.onProfileShow.bind(this);
        this.uploadPhotoFluxImag = this.uploadPhotoFluxImag.bind(this);
        this.onRegionChange = this.onRegionChange.bind(this);
        this.showFluxDialog = this.showFluxDialog.bind(this);

        this.onReceived = this.onReceived.bind(this);
        this.onOpened = this.onOpened.bind(this);
    }

    onOpened(openResult){
      let additionalData = openResult.notification.payload.additionalData;
      let notifyData = additionalData.p2p_notification;      
    }

    onReceived(notification) {
      let additionalData = notification.payload.additionalData;
      let notifyData = additionalData.p2p_notification;
    }

    checkUpdateDiamondTime(){
      let isUpdate = false;      
      if(!!window.currentUser['lastDiamodUpdatedAt']){
        const now = moment(new Date()); //todays date
        const end = moment(window.currentUser['lastDiamodUpdatedAt']); // another date
        const duration = moment.duration(now.diff(end));
        const hours = duration.asHours();
        
        if(hours > 5){
          const diamondCounts = parseInt(window.currentUser['diamondCounts']) + 1;
          window.currentUser['diamondCounts'] = diamondCounts;
          dbRef.ref('UsersList/'+window.currentUser['userID']).update({lastDiamodUpdatedAt: new Date().getTime(), diamondCounts: diamondCounts});
          this.forceUpdate();
        }
      }else{
        dbRef.ref('UsersList/'+window.currentUser['userID']).update({lastDiamodUpdatedAt: new Date().getTime()});
      }
    }

    componentDidMount(){
      OneSignal.addEventListener('received', this.onReceived);
      OneSignal.addEventListener('opened', this.onOpened);
      OneSignal.clearOneSignalNotifications();
      if (!!window.Token)
      {
        dbRef.ref('UsersList/'+window.currentUser['userID']).update({deviceToken: window.Token});
        window.currentUser['deviceToken'] = window.Token;
      }
      this.checkUpdateDiamondTime();
    }

    componentWillMount() {
      OneSignal.removeEventListener('received', this.onReceived);
      OneSignal.removeEventListener('opened', this.onOpened);

      this.setState({isHideLocation: window.currentUser['isHideLocation']});

      navigator.geolocation.getCurrentPosition(
         ({coords}) => {
           const {latitude, longitude} = coords;
           if(!!latitude){
             mapRegion = {
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: DEFAULT_ZOOM,
                    longitudeDelta: DEFAULT_ZOOM,
              }
             this.setState({
               position: {
                 latitude: latitude,
                 longitude: longitude,
               }
             })
           }
         },
         (error) => {
            alert('Error: Are location services on?');
            console.log('error====', error);
          },
         {enableHighAccuracy: true}
       );

       this.watchID = navigator.geolocation.watchPosition(

         ({coords}) => {
           const {latitude, longitude} = coords
           const locationData = {
            latitude: latitude,
            longitude: longitude
           }

           this.setState({
             position: locationData
           })

           dbRef.ref('UsersList/'+window.currentUser['userID']).update({position: locationData});

       });

      this.getAllUserInfo();
      this.getPhotoFluxImgList();
    }

    async getAllUserInfo(){
      dbRef.ref('UsersList').on('value', (userSnapshot)=> {
        let userList = [];
        userSnapshot.forEach((childSnapshot)=> {

          let userData = childSnapshot.val();
          userData['userID'] = childSnapshot.key;

          if(!!userData.position && childSnapshot.key !== window.currentUser.userID){
            if(userData['isHideLocation'] === false || userData['isHideLocation'] === undefined)
              userList.push(userData);
          }
        });
        this.setState({userList});
      });
    }

    _findMe(){
       navigator.geolocation.getCurrentPosition(
         ({coords}) => {
           const {latitude, longitude} = coords
            if(!!latitude)
            {
               mapRegion = {
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: DEFAULT_ZOOM,
                    longitudeDelta: DEFAULT_ZOOM,
              }
               this.setState({
                 position: {
                   latitude: latitude,
                   longitude: longitude,
                 }
               })
            }
         },
         (error) => alert(JSON.stringify(error)),
         {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
       )
     }

    _showImagePicker() {
      const options = {
        title: I18n.t('titlePhotoFlux'),
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
      };

      ImagePicker.showImagePicker(options, (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {

          this.setState({isloadingBar: true});
          ImageResizer.createResizedImage(response.uri, 700, 1000, 'JPEG', 80)
            .then(({uri}) => {
              this.uploadPhotoFluxImag(uri);
          })
          .catch( err => {
            this.setState({isloadingBar: false});
          });
        }
      });
    }

    uploadPhotoFluxImag(uri){
      userActions.uploadImage(uri)
      .then(url => {
        const uploadData = {
          latitude: this.state.position.latitude,
          longitude: this.state.position.longitude,
          owner: window.currentUser.userID,
          personType: window.currentUser.personType,
          uri: url,
        }
        this.setState({isloadingBar: false});
        dbRef.ref('PhotoFluxImg').push(uploadData);
      })
      .catch(error => {
        console.warn(error);
        this.setState({isloadingBar: false});
      })
    }

    getPhotoFluxImgList(){
      dbRef.ref('PhotoFluxImg').on('value', (snapShot)=>{
        let urls = [];
        snapShot.forEach((photoObj)=>{
          var objData = photoObj.val();
          objData['key'] = photoObj.key;
          urls.push(objData);
        });

        urls = urls.reverse();
        this.setState({fluxImageList: urls});
      })
    }

    fluxImgClicked(item, index){
      this.setState({photoFluxVisible: true, selectedFluxIndex: index});
    }

    showFluxDialog(flag){
      this.setState({photoFluxVisible: flag});
    }

    markerClicked(marker, index){
      this.setState({vipProfile:false, selectedUserIndex: index});
      this.onProfileShow(true);
    }

    onProfileShow(flag){
      this.setState({profileVisible: flag})
    }

    onRegionChange(region){
      mapRegion = region
    }

    hideMyLocation(flag){
      this.setState({isHideLocation: flag});
      dbRef.ref('UsersList/'+window.currentUser['userID']).update({isHideLocation: flag});
    }

    render() {

    const interpolations = this.state.markers.map((marker, index) => {
        const inputRange = [
            (index - 1) * CARD_WIDTH,
            index * CARD_WIDTH,
            ((index + 1) * CARD_WIDTH),
        ];
        const scale = this.animation.interpolate({
            inputRange,
            outputRange: [1, 2.5, 1],
            extrapolate: "clamp",
        });
        const opacity = this.animation.interpolate({
            inputRange,
            outputRange: [0.35, 1, 0.35],
            extrapolate: "clamp",
        });
        return { scale, opacity };
    });

    const {
      isloadingBar,
      photoFluxVisible,
      userList,
      vipProfile,
      profileVisible,
      fluxImageList,
      selectedFluxIndex,
      selectedUserIndex,
      isHideLocation} = this.state;

    let age = moment( window.currentUser['birth'], 'DD / MM / YYYY').fromNow();
    const currentAvatar = window.currentUser['avatar'];
    const currentAge = age.replace("years ago", "");
    const currentName = window.currentUser['firstname'];
    const diamondCounts = window.currentUser['diamondCounts'];

    return (
        <View style={styles.container}>
            <Modal
                  animationType={'none'}
                  transparent={true}
                  visible={isloadingBar}
                >
                <BallIndicator color={'#FF00FF'} />
            </Modal>
            <StatusBar
               backgroundColor="blue"
               barStyle="light-content"
            />
            <MapView
              ref={map => this.map = map}
              region={mapRegion}
              style={styles.backgroundImage}
              onRegionChange={this.onRegionChange}
              provider={PROVIDER_GOOGLE}
              customMapStyle={mapStyle}
              clustering = {true}
              showsUserLocation
            >
              {
                userList.map((marker, index) => {
                  if(!!marker.position){
                    return(
                      <Marker
                        coordinate={{latitude: marker.position.latitude, longitude: marker.position.longitude}}
                        key={index}
                        cluster={true}
                        onPress={(e) => this.markerClicked(marker, index)}
                      >
                        {
                          marker.personType === 'man' ? (
                            <View>
                              <Image
                                source={require('../../assets/markers/ellipse_nostar_blue.png')}
                                style={styles.smallicon} />
                            </View>
                          ) : (
                            <View>
                              <Image
                                source={require('../../assets/markers/ellipse_nostar_red.png')}
                                style={styles.smallicon} />
                            </View>
                          )
                        }
                      </Marker>
                    )
                  }
                })
              }

              {!this.state.isHideLocation &&
                    <Circle
                      zIndex={300}
                      center={{"latitude": this.state.position.latitude, "longitude": this.state.position.longitude}}
                      radius={1000}
                      strokeWidth={0}
                      fillColor='rgba(215, 79, 110, 0.2)'
                    />
              }
            </MapView>

            <LinearGradient colors={['#1a1a1a', 'transparent']} style={{position:'absolute', right:0, left:0, top: 0, height: 150}}>
            </LinearGradient>

            <SafeAreaView>

                <View style={styles.logoContainer}>
                    <Image source={require('../../assets/main/logo.png')} style={styles.logoImage}/>
                </View>

                <TouchableOpacity
                  style={styles.headerProfileContainer} onPress={() => { this.setState({profileSetting: true}); }}
                  hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                >
                  <FastImage
                    source={currentAvatar === '' ? require('../../assets/img/profile_icon.png') : {uri: currentAvatar}}
                    style={{
                              borderWidth: 2,
                              borderColor: window.currentUser.personType == 'man' ? '#004eff' : '#f65890', // add here the correct color based on if he's a man or a woman
                              borderRadius: 17,
                              width: 34,
                              height: 34
                          }}
                  />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => Actions.Shop()} style={{position: 'absolute', top: responsiveHeight(5), right: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#3e3d3f', width: responsiveWidth(25), padding: 5, paddingLeft: 20, borderRadius: 100}}>

                			<Text style={{color: '#f9f9f9', fontFamily: 'Lato-Regular', fontSize: 18}}>{diamondCounts}</Text>

                			<AnimatedCircularProgress
                        size={30}
                        width={2.5}
                        fill={90}
                        tintColor="#f9f9f9"
                        onAnimationComplete={() => console.log('onAnimationComplete')}
                        backgroundColor="#8a898a"
                			>
                				{
                					(fill) => (
                					  <Image source={require('../../assets/main/mainYellowDiamond.png')} style={{width: 13, height: 13}}/>
                					)
                				}
                			</AnimatedCircularProgress>

                </TouchableOpacity>

              { /* <View style={styles.topRightPart}>

                    <TouchableOpacity
                      onPress={()=>Actions.ChatRoom()}
                      hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                    >
                        <Image source={require('../../assets/UI/message_icon1.png')} style={styles.notification}/>
                        <View style={styles.notificationDot} />
                    </TouchableOpacity>

                    <Transition appear='scale'>
                      <TouchableOpacity
                        style={styles.sortingContainer}
                        onPress={() => Actions.Filters()}
                      >
                          <Image source={require('../../assets/UI/icons8-sorting_options_filled.png')} style={styles.sortingIcon}/>
                      </TouchableOpacity>
                    </Transition>

                    <Transition appear='scale'>
                      <TouchableOpacity
                        style={styles.rubyContainer}
                        onPress={() => Actions.Shop()}
                      >
                          <LinearGradient colors={ ["#FDDA39", "#FEEE00"]} style={styles.gradientBg}>
                              <Image source={require('../../assets/main/ruby.png')} style={styles.rubyIcon}/>
                              <View style={{position:'absolute', bottom: 5, right: 5, width: 20, height: 20, borderColor: '#fde256', borderWidth: 2, backgroundColor: '#2e2e2e', borderRadius: 500}}>
                                <Text style={{color: '#fde256', fontWeight: 'bold', fontSize: 10, marginTop:2, textAlign: 'center'}}>{diamondCounts}</Text>
                              </View>
                          </LinearGradient>
                      </TouchableOpacity>
                    </Transition>

                </View> */}

            </SafeAreaView>

            <TouchableOpacity style={styles.goToChat} onPress={() => Actions.ChatRoom()}>
                <Image source={require('../../assets/UI/message_icon1.png')} style={styles.chatIcon}/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.takePictureFlux} onPress={() => this._showImagePicker()}>
                <Image source={require('../../assets/UI/icons8-camera.png')} style={styles.cameraIcon}/>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.centerPosition}
              onPress={ () => this._findMe()}
              hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
            >
                <Image source={require('../../assets/UI/centerPosition.png')} style={styles.myPosition}/>
            </TouchableOpacity>

          <LinearGradient colors={['transparent', '#1a1a1a']} style={{position:'absolute', right:0, left:0, bottom: 0, height: 150}}>
          </LinearGradient>

          <View style= {styles.thumbnailContainer}>
              <ScrollView horizontal
                  showsHorizontalScrollIndicator={false}
                  >
                  {fluxImageList.map((value, key) =>
                    <TouchableOpacity
                      onPress = {() => this.fluxImgClicked(value, key)}
                    >

                    <View
                      style={[styles.thumbnail, key === 0 ? styles.firstImage: null, key !== fluxImageList.length ? styles.notlast : style.lastImage]}
                    >
                        <FastImage
                          key={key}
                          source={{uri: value.uri}}
                          style={{height: '100%', width: '100%'}}
                        />

                        <View
                          style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            opacity: 0.7,
                            width: '100%',
                            height: 5,
                            backgroundColor: value.personType == 'man' ? '#004eff' : '#f65890'
                          }}
                        />

                      </View>
                    </TouchableOpacity>
                  )}
              </ScrollView>
          </View>

          <Dialog
                dialogStyle = {styles.dialogContainer}
                visible={this.state.profileSetting}
                width = {1}
                height = {318.5}
                dialogAnimation={new SlideAnimation({
                  slideFrom: 'bottom',
                })}
                onTouchOutside={() => {
                this.setState({ profileSetting: false });
            }}>

                <DialogContent>
                    <View style={{alignItems: 'center'}}>

                        <View style={{top: -52, zIndex: 999, justifyContent: 'center', alignItems: 'center'}}>
                            <FastImage source={{uri: currentAvatar}} style={{width: 103, height: 103, borderRadius: 5}}/>
                            <Text style={{fontFamily: "Lato-Regular", textAlign: 'center', fontSize: 18, color: "#3c3c3c", marginTop: 16}}>{currentName + ', ' + currentAge + I18n.t('userAge')}</Text>
                        </View>

                        <TouchableOpacity style={{top: -18}} onPress={() => Actions.EditMyProfile()}>
                            <LinearGradient colors={ ["#fdc810", "#fde256"]} style={styles.dialogButton} >
                                <Text style={styles.dialogButtonText}>{I18n.t('editProfile')}</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.dialogButton, {marginTop: -4, borderRadius: 5, borderColor: "#3c3c3c", borderWidth: 1}]} onPress={() => Actions.Settings()}>
                            <Text style={styles.dialogButtonText}>{I18n.t('settings')}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{flexDirection: 'row', alignItems: "center", marginTop: 20, marginBottom: 34}} onPress={()=>this.hideMyLocation(!isHideLocation)}>
                            <Image source={ isHideLocation ? require('../../assets/UI/locationOn.png') : require('../../assets/UI/locationOff.png')} style={{width: 11, height: 16}}/>
                            <Text style={{fontFamily: "Lato-Regular", fontSize: 12, color: isHideLocation ? "#32c67b" : '#e75c5c', letterSpacing: 0, textAlign: "center", marginLeft: 10}}>{isHideLocation ? I18n.t('showMyLocation') : I18n.t('hideMyLocation')}</Text>
                        </TouchableOpacity>

                    </View>
                </DialogContent>

            </Dialog>

            <PopupDialog
                dialogStyle = {styles.fluxPhotoDialog}
                visible={photoFluxVisible}
                overlayOpacity = {0.8}
                dialogAnimation={new SlideAnimation({
                  slideFrom: 'bottom',
                })}
                onTouchOutside={() => this.showFluxDialog(false)}
                onDismiss={() => this.showFluxDialog(false)}>

                <PopupSwipePhotoFlux
                   fluxImgList = {fluxImageList}
                   selectedFluxIndex = {selectedFluxIndex}
                   latitude={this.state.position.latitude}
                   longitude={this.state.position.longitude}
                   showFluxDialog = {this.showFluxDialog}
                />

        </PopupDialog>

        <PopupDialog
            dialogStyle = {styles.profileDialog}
            visible={profileVisible}
            overlayOpacity = {0.8}
            dialogAnimation={new SlideAnimation({
              slideFrom: 'bottom',
            })}
            onDismiss={() => {
                this.setState({ profileVisible: false });
            }}
            width = {1} >
              <PopupSwipeUserList
                userList = {userList}
                vipProfile = {vipProfile}
                selectedUserIndex = {selectedUserIndex}
                onProfileShow = {this.onProfileShow}
                latitude={this.state.position.latitude}
                longitude={this.state.position.longitude}
              />

        </PopupDialog>

            <PopupDialog
                dialogStyle = {styles.reportProfile}
                visible = {this.state.reportDialog}
                width = {1}
                overlayOpacity = {0.8}
                dialogAnimation={new ScaleAnimation()}
                onTouchOutside={() => {
                    this.setState({ reportDialog: false });
                }} >
                <View style={styles.reportProfileContent}>
                    <View style={styles.profileBox}>
                        <TouchableOpacity onPress={() => {}} style = {styles.bordered}>
                            <Text style={[styles.profileText, styles.reportColor]}>{I18n.t('reportProfile')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {}}>
                            <Text style={[styles.profileText, styles.reportColor]}>{I18n.t('shareProfile')}</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.profileBox} onPress={() => {this.setState({ reportDialog: false});}}>
                        <Text style={[styles.profileText, styles.submitColor]}>{I18n.t('cancel')}</Text>
                    </TouchableOpacity>
                </View>
        </PopupDialog>

    </View>
    );
  }
}

Dashboard.propTypes = {
    storeUserLocation: PropTypes.func.isRequired,
}

function mapStateToProps(state){
    return {
        fluxImages: state.session.fluxImages,
        user: state.session.user
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllPostPictures: () => {
      dispatch(sessionGetAllPostPictures())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
