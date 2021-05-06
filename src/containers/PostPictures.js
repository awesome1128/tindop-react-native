import React, {Component} from 'react';
import {Platform, StyleSheet, Image, Text, View, TouchableOpacity, Modal} from 'react-native';

import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../style/postPicturesStyle';
import ActionSheet from 'react-native-actionsheet';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import { connect } from 'react-redux';
import { BallIndicator } from 'react-native-indicators';
import { sessionUpdatePostPictures, sessionGetAllFluxImages } from '../store/session/actions'
import RNFetchBlob from 'react-native-fetch-blob';
import FastImage from 'react-native-fast-image';

import * as userActions from '../store/actions/userActions';
import firebaseService from '../services/firebase';
import PropTypes from 'prop-types';
import moment from 'moment'
import I18n from '../i18n/index';
import YellowButton from '../components/yellowButton';
import LogoHeader from '../components/logoHeader';

const CANCEL_INDEX = 0

function uploadImage(uri, mime = 'application/octet-stream') {
  const Blob = RNFetchBlob.polyfill.Blob
  const fs = RNFetchBlob.fs
  window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
  window.Blob = Blob
  const currentTimeStamp = new Date().getTime() + '.png';

  return new Promise((resolve, reject) => {
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    let uploadBlob = null
    const imageRef = firebaseService.storage().ref('images').child(`${currentTimeStamp}`)

    fs.readFile(uploadUri, 'base64')
      .then((data) => {
        console.log(data);
        return Blob.build(data, { type: `${mime};BASE64` })
      })
      .then((blob) => {
        uploadBlob = blob
        return imageRef.put(blob, { contentType: mime })
      })
      .then(() => {
        uploadBlob.close()
        return imageRef.getDownloadURL()
      })
      .then((url) => {
        resolve(url)
      })
      .catch((error) => {
        reject(error)
    })
  })
}

const options = [I18n.t('cancel'), I18n.t('openCamera'), I18n.t('importGallery')]
var photodata = [null,null,null,null,null, null];
var imagesList = ['', '', '', '', '',  ''];
const addimage = require('../../assets/UI/add-btn.png');
const deleteimage = require('../../assets/UI/close-btn.png');

class PostPictures extends Component {

    constructor(props){
        super(props);
        this.state = {
            avatarSource: imagesList,
            defaultIcon: require("../../assets/UI/camera-icon.png"),
            selectedIndex: 0,
            isImageupload: false,
            imagebutton : addimage,
            userID: this.props.userID,
        }

        this.showActionSheet           = this.showActionSheet.bind(this);
        this.handlePress               = this.handlePress.bind(this);
        this.uploadImageAsync          = this.uploadImageAsync.bind(this);
        this._pickImagefromGallery     = this._pickImagefromGallery.bind(this);
        this._pickImagefromCamera      = this._pickImagefromCamera.bind(this);
    }

    showActionSheet(index) {
      this.setState({selectedIndex: index});
      this.ActionSheet.show();
    }

    handlePress(i) {
      if (i == 2)
        this._pickImagefromGallery();
      if (i == 1)
        this._pickImagefromCamera();
    }

    _pickImagefromCamera = async () => {
        let options = {
                mediaType: 'photo',
                quality: 1,
                allowsEditing: true,
                aspect: [4, 3],
            }
        ImagePicker.launchCamera(options, (response) => {
            if (!response.didCancel) {

                ImageResizer.createResizedImage(response.uri, 500, 500, 'JPEG', 80)
                  .then(({uri}) => {
                    this.uploadImageAsync(uri);
                })
                  .catch( err => {
                      console.log('error=', err);
                });
            }
        });
    };

    _pickImagefromGallery = async () => {
        let options = {
                mediaType: 'photo',
                quality: 1,
                allowsEditing: true,
                aspect: [4, 3],
            }
        ImagePicker.launchImageLibrary(options, (response) => {
            if (!response.didCancel) {
              ImageResizer.createResizedImage(response.uri, 500, 500, 'JPEG', 80)
                    .then(({uri}) => {
                      this.uploadImageAsync(uri);
                  })
                    .catch( err => {
                        console.log('error=', err);
                  });
            }
        });
    }

    async uploadImageAsync(uri){
      this.setState({isImageupload: true})
      uploadImage(uri)
      .then(url => {
        imagesList[this.state.selectedIndex] = url;
        this.setState({isImageupload: false, avatarSource: imagesList}) ;
      })
      .catch(error => console.warn(error))
    }

    _updatePostPictures() {

      this.setState({isImageupload: true})

      const dbRef = firebaseService.database();
      const {avatarSource} = this.state;

      let isContinue = false;
      let userAvatar = '';
      avatarSource.map((picture)=>{
        if(picture !== ''){
          userAvatar = picture;
          return;
        }
      })

      if(userAvatar !== ''){

        let userData = '';
        const {userID} = this.state;

        dbRef.ref('UsersList/' + userID).update({pictures: avatarSource, avatar: userAvatar}).then((data)=>{
          dbRef.ref('UsersList/').child(userID).once('value',(snapshot)=>{
            userData = snapshot.val();
            userData['userID'] = userID;
            if(!this.props.isFB)
              userActions._storeData('logged', true);
            window.currentUser = userData;
            Actions.reset('home');
            this.setState({isImageupload: false});
          })
        });

      }
      else{
        alert(I18n.t('postPicture'));
      }
    }

    render() {
        const {defaultIcon, avatarSource, isImageupload} = this.state;
        return (
            <View style={styles.container}>

                <Modal
                      animationType={'none'}
                      transparent={true}
                      visible={isImageupload}
                    >
                    <BallIndicator color={'#FF00FF'} />
                </Modal>

                <LogoHeader
                  onPress={()=> this.props.navigation.goBack()}
                />

                <View style={styles.inputboxContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.contactText}>{I18n.t('postPicture')}</Text>
                    </View>
                    <View style={styles.pictureContainer}>
                        <View style={{borderColor: "#303030"}}>
                            <TouchableOpacity style={styles.pictureItem1}>
                                <FastImage
                                    source={avatarSource[0] === '' ? defaultIcon : {uri: avatarSource[0]}}
                                    style={ avatarSource[0] !=='' ? styles.pictureItem1Image : {width: 21.5, height: 16}}
                                    resizeMode={'cover'}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity hitSlop={{top: 10, bottom: 10, left: 10, right: 10}} style={styles.pictureItemCrossBtn} onPress = {() => this.showActionSheet(0)}>
                                <Image
                                    source={avatarSource[0] == '' ? addimage : deleteimage}
                                    style={styles.crossBtn}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.pictureItem2Container}>
                            <View View style={styles.blankItem}>
                              <TouchableOpacity style={styles.blankBox}>
                                  <FastImage
                                      source={avatarSource[1] === '' ? defaultIcon : {uri: avatarSource[1]}}
                                      style={avatarSource[1] ==='' ? {width: 21.5, height: 16} : {width: "100%", height: "100%"}}
                                      resizeMode={'cover'}
                                  />
                              </TouchableOpacity>

                              <TouchableOpacity hitSlop={{top: 10, bottom: 10, left: 10, right: 10}} style={styles.pictureItemCrossBtn} onPress = {() => this.showActionSheet(1)}>
                                  <Image
                                      source={avatarSource[1] == '' ? addimage : deleteimage}
                                      style={styles.crossBtn}/>
                              </TouchableOpacity>
                            </View>

                            <View style={[styles.blankItem, styles.blankItemTopDuration]}>
                                <TouchableOpacity style={styles.blankBox}>
                                    <FastImage
                                        source={avatarSource[2] === '' ? defaultIcon : {uri: avatarSource[2]}}
                                        style={avatarSource[2] === '' ? {width: 21.5, height: 16} : {width: "100%", height: "100%"}}
                                        resizeMode={'cover'}
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity hitSlop={{top: 10, bottom: 10, left: 10, right: 10}} style={styles.pictureItemCrossBtn} onPress = {() => this.showActionSheet(2)}>
                                    <Image
                                      source={avatarSource[2] === '' ? addimage : deleteimage}
                                      style={styles.crossBtn}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 8.5}}>
                        <View style={styles.blankItem}>
                            <TouchableOpacity style={styles.blankBox}>
                                <FastImage
                                    source={avatarSource[3] === '' ? defaultIcon : {uri: avatarSource[3]}}
                                    style={avatarSource[3] === '' ? {width: 21.5, height: 16} : {width: "100%", height: "100%"}}
                                    resizeMode={'cover'}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity hitSlop={{top: 10, bottom: 10, left: 10, right: 10}} style={{position: 'absolute', justifyContent: 'center', alignItems: 'center', backgroundColor: '#1D1D1D', borderRadius: 5, bottom: 8, right: 8}}  onPress = {() => this.showActionSheet(3)}>
                                <Image
                                    source={avatarSource[3] === '' ? addimage : deleteimage}
                                    style={styles.crossBtn}/>
                            </TouchableOpacity>
                        </View>

                        <View style={[styles.blankItem, styles.blankItemDuration]}>
                            <TouchableOpacity style={styles.blankBox}>
                                <FastImage
                                    source={avatarSource[4] === '' ? defaultIcon : {uri: avatarSource[4]}}
                                    style={avatarSource[4] === '' ? {width: 21.5, height: 16} : {width: "100%", height: "100%"}}
                                    resizeMode={'cover'}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity hitSlop={{top: 10, bottom: 10, left: 10, right: 10}} style={{position: 'absolute', justifyContent: 'center', alignItems: 'center', backgroundColor: '#1D1D1D', borderRadius: 5, bottom: 8, right: 8}} onPress = {() => this.showActionSheet(4)}>
                                <Image
                                    source={avatarSource[4] === '' ? addimage : deleteimage}
                                    style={styles.crossBtn}/>
                            </TouchableOpacity>
                        </View>

                        <View style={[styles.blankItem, styles.blankItemDuration]}>
                            <TouchableOpacity style={styles.blankBox}>
                                <FastImage
                                    source={avatarSource[5] === '' ? defaultIcon : {uri: avatarSource[5]}}
                                    style={avatarSource[5] === '' ? {width: 21.5, height: 16} : {width: "100%", height: "100%"}}
                                    resizeMode={'cover'}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity hitSlop={{top: 10, bottom: 10, left: 10, right: 10}} style={{position: 'absolute', justifyContent: 'center', alignItems: 'center', backgroundColor: '#1D1D1D', borderRadius: 5, bottom: 8, right: 8}} onPress = {() => this.showActionSheet(5)}>
                                <Image
                                    source={avatarSource[5] === '' ? addimage : deleteimage}
                                    style={styles.crossBtn}/>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>

                <YellowButton
                  text='next'
                  onPress={() => this._updatePostPictures()}
                />

                <ActionSheet
                  ref={o => this.ActionSheet = o}
                  options={options}
                  cancelButtonIndex={CANCEL_INDEX}
                  onPress={this.handlePress}
                />

            </View>
        );
    }
}

PostPictures.propTypes = {
    updatePostPictures: PropTypes.func.isRequired,
    getAllFluxImages: PropTypes.func.isRequired,
}

function mapStateToProps(state){
    return {
        fluxImages: state.session.fluxImages,
        loading: state.session.loading,
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updatePostPictures: (avatarSource) => {
      dispatch(sessionUpdatePostPictures(avatarSource))
    },
    getAllFluxImages: () => {
      dispatch(sessionGetAllFluxImages())
    },
  }
}

export default connect(null, mapDispatchToProps)(PostPictures)
