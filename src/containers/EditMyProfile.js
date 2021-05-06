import React, {Component} from 'react';
import {Alert, Platform, StyleSheet, Image, Text, View, SafeAreaView, TouchableOpacity, ScrollView, TextInput} from 'react-native';

import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import ActionSheet from 'react-native-actionsheet';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import RNFetchBlob from 'react-native-fetch-blob';
import { Transition } from 'react-navigation-fluid-transitions';
import Dialog, { DialogContent, SlideAnimation } from 'react-native-popup-dialog';
import FastImage from 'react-native-fast-image';

import ContactItem from '../components/ContactItem';
import ContactSubCategoryItem from '../components/ContactSubCategoryItem';
import I18n from '../i18n/index';
import styles from '../style/editMyProfileStyle';
import * as userActions from '../store/actions/userActions';
import LogoHeader from '../components/logoHeader';
import firebaseService from '../services/firebase';
import YellowButton from '../components/yellowButton';

const dbRef = firebaseService.database();
const options = [I18n.t('cancel'), I18n.t('openCamera'), I18n.t('importGallery')]
const addimage = require('../../assets/UI/add-btn.png');
const deleteimage = require('../../assets/UI/close-btn.png');
const defaultIcon = require("../../assets/UI/camera-icon.png");
// var imagesList = [];

export default class EditMyProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user_phone: '',
      user_email: '',
      contactLists: [],
      pictures: [],
      selectedContactCount: 0,
      selectedContactIndex: 0,
      selectedRow: 0,
      dialogVisible:false,
      interestedPersonType: 0,
      description: '',
      refresh: false
    }

    this.updateSelectedContacts = this.updateSelectedContacts.bind(this);
    this.showActionSheet        = this.showActionSheet.bind(this);
    this.handlePress               = this.handlePress.bind(this);
    this.uploadImageAsync          = this.uploadImageAsync.bind(this);
    this.showContactSubItemDialog = this.showContactSubItemDialog.bind(this);
  }

  updateSelectedContacts(isSelected, key, innerkey){
    if(isSelected){
      this.setState({
                        selectedContactCount: (this.state.selectedContactCount + 1),
                        dialogVisible: true,
                        selectedRow: key,
                        selectedContactIndex: innerkey
                    })
    }else{
      this.setState({selectedContactCount: (this.state.selectedContactCount -1)})
    }
  }

  showActionSheet(index) {
    const picturesList = this.state.pictures;
    if(picturesList[index] === ''){
      this.setState({selectedIndex: index});
      this.ActionSheet.show();
    }else{
      picturesList[index] = '';
      this.setState({pictures: picturesList});
    }
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
      userActions.uploadImage(uri)
      .then(url => {
        let imagesList = this.state.pictures;
        imagesList[this.state.selectedIndex] = url;
        this.setState({isImageupload: false, pictures: imagesList}) ;
      })
      .catch(error => console.warn(error))
  }

  componentDidMount(){
    const contactsList = window.currentUser['contacts'];
    const imagesList = window.currentUser['pictures'];
    // console.log('imagesList===', imagesList);
    this.setState({
        selectedContactCount: contactsList.length,
        pictures: imagesList,
        interestedPersonType: window.currentUser['type'],
        description: window.currentUser['description'],
        user_phone: window.currentUser['phoneNo'],
        user_email: window.currentUser['email']
    });

    this.loadContactLists();
  }

  loadContactLists(){
    const contactsList = window.currentUser['contacts'];

    dbRef.ref('Contacts').once('value', (resData)=>{
      let contacts_array = [];
      resData.forEach((contactObj)=> {
        let objData = contactObj.val();
        let selectedContact = '';
        contactsList.map((selectdContactObj)=>{
          if(selectdContactObj.key === contactObj.key){
            selectedContact = selectdContactObj;
            return;
          }
        })
        if(selectedContact !== ''){
          contacts_array.push(selectedContact);
        }else{
          objData['key'] = contactObj.key;
          objData['selected'] = false

          let subCategorylist = objData.subcategory
          let newsubList = []
          for (key in subCategorylist) {
            let newObj = {};
            newObj['selected'] = false
            newObj['key'] = key
            newObj['text'] = subCategorylist[key]
            newsubList.push(newObj)
          }
          objData.subcategory = newsubList;
          contacts_array.push(objData);
        }
      });
      this.updateContacts(contacts_array);
    })

  }

  updateContacts(contacts_list){

    let groupList = []
    let smallList = []
    contacts_list.map((listObj) =>{
      smallList.push(listObj)
      if(smallList.length === 3)
      {
        groupList.push(smallList)
        smallList = []
      }
    })
    if(smallList.length > 0)
    {
      groupList.push(smallList)
      smallList = []
    }

    this.setState({contactLists: groupList});
  }

  updateClicked(){

    const userID = window.currentUser['userID'];
    const {pictures, description, interestedPersonType, contactLists, user_phone, user_email} = this.state;

    let selectedLists = [];

    contactLists.map((groupItem)=>{
      groupItem.map((categoryObj)=>{
        if(categoryObj.selected)
          selectedLists.push(categoryObj);
      })
    });
    if(selectedLists.length === 0)
      return;

    if(pictures.length === 0)
      return;

    window.currentUser['type'] = interestedPersonType;
    window.currentUser['description'] = description;
    window.currentUser['pictures'] = pictures;
    window.currentUser['contacts'] = selectedLists;
    window.currentUser['phoneNo'] = user_phone;

    if (pictures[0] === '') {
      Alert.alert(I18n.t('alertSetProfilePicture'));
    }else{
      dbRef.ref("UsersList/"+userID).update(window.currentUser);
      Actions.pop();
    }

  }

  showContactSubItemDialog(flag){
    this.setState({ dialogVisible: flag });
  }

  render() {

    const {
      contactLists,
      dialogVisible,
      selectedContactCount,
      selectedRow,
      selectedContactIndex,
      refresh,
      pictures,
      interestedPersonType,
      description,
      user_phone,
      user_email } = this.state;
    const currentUser = window.currentUser;
    const {firstname, birth, phoneNo, email, contacts, personType} = currentUser;

    const subCategories = contactLists.length > 0 ? contactLists[selectedRow][selectedContactIndex].subcategory : [] ;
    const colorBegin = contactLists.length > 0 ? contactLists[selectedRow][selectedContactIndex].begin : '' ;
    const colorEnd = contactLists.length > 0 ? contactLists[selectedRow][selectedContactIndex].end : '' ;

    return (

      <View style={styles.container}>

        <LogoHeader
          onPress={()=> Actions.pop()}
          position='absolute'
        />

        <ScrollView contentContainerStyle={{paddingBottom: 150, paddingTop: 100}}>

          <View style={styles.inputboxContainer}>
              <View style={styles.titleContainer}>
                  <Text style={styles.contactText}>{I18n.t('postPicture')}</Text>
              </View>
              <View style={styles.pictureContainer}>
                  <View style={styles.blankItem}>
                      <TouchableOpacity style={styles.pictureItem1}>
                          <FastImage
                              source={pictures[0] === '' ? defaultIcon : {uri: pictures[0]}}
                              style={ pictures[0] === '' ? {width: 21.5, height: 16} : styles.pictureItem1Image }
                              resizeMode={'cover'}
                          />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.pictureItemCrossBtn} onPress = {() => this.showActionSheet(0)}>
                          <Image
                              source={pictures[0] == '' ? addimage : deleteimage}
                              style={styles.crossBtn}/>
                      </TouchableOpacity>
                      <Text style={{position: 'absolute', fontFamily: 'Lato-Bold', top: 5, left: 5, color: '#fff'}}>1</Text>
                  </View>
                  <View style={styles.pictureItem2Container}>

                      <View style={styles.blankItem}>
                          <TouchableOpacity
                            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                            style={styles.blankBox}>
                              <FastImage
                                  source={pictures[1] === '' ? defaultIcon : {uri: pictures[1]}}
                                  style={ pictures[1] ==='' ? {width: 21.5, height: 16} : styles.pictureItem2Image }
                                  resizeMode={'cover'}
                              />
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.pictureItemCrossBtn} onPress = {() => this.showActionSheet(1)}>
                              <Image
                                  source={pictures[1] == '' ? addimage : deleteimage}
                                  style={styles.crossBtn}/>
                          </TouchableOpacity>
                          <Text style={{position: 'absolute', fontFamily: 'Lato-Bold', top: 5, left: 5, color: '#fff'}}>2</Text>
                      </View>

                      <View style={[styles.blankItem, styles.blankItemTopDuration]}>
                          <TouchableOpacity
                            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                            style={styles.blankBox}>
                              <FastImage
                                  source={pictures[2] === '' ? defaultIcon : {uri: pictures[2]}}
                                  style={ pictures[2] ==='' ? {width: 21.5, height: 16} : styles.pictureItem2Image }
                                  resizeMode={'cover'}
                              />
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.pictureItemCrossBtn} onPress = {() => this.showActionSheet(2)}>
                              <Image
                                  source={pictures[2] == '' ? addimage : deleteimage}
                                  style={styles.crossBtn}/>
                          </TouchableOpacity>
                          <Text style={{position: 'absolute', fontFamily: 'Lato-Bold', top: 5, left: 5, color: '#fff'}}>3</Text>
                      </View>

                  </View>
              </View>

              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 8.5}}>

                  <View style={styles.blankItem}>
                      <TouchableOpacity
                        hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                        style={styles.blankBox}>
                          <FastImage
                              source={pictures[3] === '' ? defaultIcon : {uri: pictures[3]}}
                              style={ pictures[3] ==='' ? {width: 21.5, height: 16} : styles.pictureItem2Image }
                              resizeMode={'cover'}
                          />
                      </TouchableOpacity>
                      <TouchableOpacity style={{position: 'absolute', justifyContent: 'center', alignItems: 'center', backgroundColor: '#1D1D1D', borderRadius: 5, bottom: 7, right: 7}} onPress = {() => this.showActionSheet(3)}>
                          <Image
                              source={pictures[3] == '' ? addimage : deleteimage}
                              style={styles.crossBtn}/>
                      </TouchableOpacity>
                      <Text style={{position: 'absolute', fontFamily: 'Lato-Bold', top: 5, left: 5, color: '#fff'}}>6</Text>
                  </View>

                  <View style={[styles.blankItem, styles.blankItemDuration]}>
                      <TouchableOpacity
                        hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                        style={styles.blankBox}>
                          <FastImage
                              source={pictures[4] === '' ? defaultIcon : {uri: pictures[4]}}
                              style={ pictures[4] ==='' ? {width: 21.5, height: 16} : styles.pictureItem2Image }
                              resizeMode={'cover'}
                          />
                      </TouchableOpacity>
                      <TouchableOpacity style={{position: 'absolute', justifyContent: 'center', alignItems: 'center', backgroundColor: '#1D1D1D', borderRadius: 5, bottom: 7, right: 7}} onPress = {() => this.showActionSheet(4)}>
                          <Image
                              source={pictures[4] == '' ? addimage : deleteimage}
                              style={styles.crossBtn}/>
                      </TouchableOpacity>
                      <Text style={{position: 'absolute', fontFamily: 'Lato-Bold', top: 5, left: 5, color: '#fff'}}>5</Text>
                  </View>

                  <View style={[styles.blankItem, styles.blankItemDuration]}>
                      <TouchableOpacity
                        hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                        style={styles.blankBox}>
                          <FastImage
                              source={pictures[5] === '' ? defaultIcon : {uri: pictures[5]}}
                              style={ pictures[5] ==='' ? {width: 21.5, height: 16} : styles.pictureItem2Image }
                              resizeMode={'cover'}
                          />
                      </TouchableOpacity>
                      <TouchableOpacity style={{position: 'absolute', justifyContent: 'center', alignItems: 'center', backgroundColor: '#1D1D1D', borderRadius: 5, bottom: 7, right: 7}} onPress = {() => this.showActionSheet(5)}>
                          <Image
                              source={pictures[5] == '' ? addimage : deleteimage}
                              style={styles.crossBtn}/>
                      </TouchableOpacity>
                      <Text style={{position: 'absolute', fontFamily: 'Lato-Bold', top: 5, left: 5, color: '#fff'}}>4</Text>
                  </View>

              </View>

          </View>

          <View style={styles.contactContainer}>
              <Text style={styles.contactText}>{I18n.t('contactWishes')}</Text>
          </View>

          <ScrollView horizontal={true} contentContainerStyle={{paddingHorizontal: 20}}>
            {
              contactLists.map((item, index)=>{
                return (
                  <ContactItem
                    item={item}
                    index={index}
                    selectedContactCount={selectedContactCount}
                    updateSelectedContacts = {this.updateSelectedContacts}
                  />
                )
              })
            }
          </ScrollView>

          <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 10.5}}>
              <Text style={{fontFamily: 'Lato-Regular', fontSize: 12, textAlign: "center", color: "#898989"}}>{selectedContactCount + '/5 max'}</Text>
          </View>

          <View style={styles.interestedinContainer}>
              <Text style={styles.contactText}>{I18n.t('whoInterestedIn')}</Text>
          </View>

          <View style={styles.cateContainer}>

              <TouchableOpacity style={this.state.interestedPersonType === 0 ? styles.womanBtn : styles.unselectedBtn} onPress = {() => {this.setState({interestedPersonType: 0})}}>
                <Text style={[styles.cateText, this.state.interestedPersonType === 0 ? styles.selectedcatText : styles.normalcatText ]}>{I18n.t('woman')}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={this.state.interestedPersonType === 1 ? styles.manBtn : styles.unselectedBtn} onPress = {() => {this.setState({interestedPersonType: 1})}}>
                <Text style={[styles.cateText, this.state.interestedPersonType === 1 ? styles.selectedcatText : styles.normalcatText ]}>{I18n.t('man')}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={this.state.interestedPersonType === 2 ? styles.bothBtn : styles.unselectedBtn} onPress = {() => {this.setState({interestedPersonType: 2})}}>
                <Text style={[styles.cateText, this.state.interestedPersonType === 2 ? styles.selectedcatText : styles.normalcatText ]}>{I18n.t('both')}</Text>
              </TouchableOpacity>
          </View>

          <View style={styles.aboutTextContainer}>
              <Text style={styles.textItem}>{I18n.t('aboutMe')}</Text>
          </View>
          <View style={styles.dummyContainer}>
            <TextInput
                  keyboardAppearance="dark"
                  returnKeyType="done"
                  blurOnSubmit={true}
                  multiline={true}
                  numberOfLines={4}
                  onChangeText={(description) => this.setState({description})}
                  value={this.state.description}
                  style={styles.dummyText}
                  placeholderTextColor = '#c6c6c6'
                  placeholder = {I18n.t('placeholderUserDescription')}
              />
          </View>

          <View style={styles.phoneText}>
              <Text style={styles.textItem}>{I18n.t('phoneNumber')}</Text>
          </View>

          <View style={styles.phoneTextContainer}>
            <TextInput
              style={styles.textItem}
              onChangeText={(txt) => this.setState({user_phone: txt})}
              value={user_phone}/>
          </View>
          <View style={styles.phoneText}>
              <Text style={styles.textItem}>{I18n.t('email')}</Text>
          </View>
          <View style={styles.emailTextContainer}>
              <Text style={styles.dummyText}>
                  {user_email}
              </Text>
          </View>
        </ScrollView>

        <YellowButton
          text='save'
          onPress={()=> this.updateClicked()}
        />

        <Dialog
              dialogStyle = {styles.dialogContainer}
              visible={dialogVisible}
              width = {1}
              height = {0.45}
              dialogAnimation={new SlideAnimation({
                slideFrom: 'bottom',
              })}
              onTouchOutside={() => {
                this.setState({ dialogVisible: false });
              }} >
              <ContactSubCategoryItem
                title = {I18n.t('detailSearch')}
                subcategoryArray = {subCategories}
                colorBegin = {colorBegin}
                colorEnd = {colorEnd}
                isEditable = {true}
                closeTitle={I18n.t('validate').toUpperCase()}
                showContactSubItemDialog = {this.showContactSubItemDialog}
              />
          </Dialog>
          <ActionSheet
            ref={o => this.ActionSheet = o}
            options={options}
            cancelButtonIndex={0}
            onPress={this.handlePress}
          />
      </View>
    )
  }


}
