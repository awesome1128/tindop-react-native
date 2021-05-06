import React, {Component} from 'react';
import {Platform, StyleSheet, Image, Text, View, SafeAreaView, TextInput, TouchableOpacity, Alert} from 'react-native';

import { Actions } from 'react-native-router-flux';
import ActionSheet from 'react-native-actionsheet';
import PopupDialog, { ScaleAnimation, Dialog, DialogContent } from 'react-native-popup-dialog';
import OneSignal from 'react-native-onesignal';
import { Transition } from 'react-navigation-fluid-transitions';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import { GiftedChat,
         Bubble,
         Time,
         Send,
         InputToolbar
} from 'react-native-gifted-chat';
import moment from 'moment';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';

import * as userActions from '../store/actions/userActions';
import firebaseService from '../services/firebase';
import I18n from '../i18n/index';
import styles from '../style/personchatroomStyle';

const dbRef = firebaseService.database().ref('ChatRooms');

const photoOptions = [I18n.t('cancel'), I18n.t('openCamera'), I18n.t('importGallery')];
const reportOptions = [I18n.t('cancel'), I18n.t('endAfinity'), I18n.t('reportProfile'), I18n.t('shareProfile')];

export default class PersonChatRoom extends Component {

    constructor(props){
        super(props);
        this.state = {
            reportDialog: false,
            messages: [],
            message: '',
            userID: window.currentUser['userID'],
            userName: window.currentUser['firstname'],
            userAvatar:window.currentUser['avatar'],
            chatUser: this.props.user,
            chatID: this.props.chatID,
            isShowDamondDialog: false,
            isShowActionSheet: false,
            isImageupload: false,
        }

        this.showActionSheet = this.showActionSheet.bind(this);
        this.uploadImageAsync = this.uploadImageAsync.bind(this);
        this.handlePress = this.handlePress.bind(this);
        this.showDamondDialog = this.showDamondDialog.bind(this);
        this.renderBubble = this.renderBubble.bind(this);
        this.renderInputToolbar = this.renderInputToolbar.bind(this);
        this.renderTime = this.renderTime.bind(this);
        this.onSend = this.onSend.bind(this);
    }

    getMessageList()
    {
      dbRef.child(this.state.chatID).on('value', (snapshot) => {
        this.snapshotToArray(snapshot);
      })
    }

    snapshotToArray = (snapshot) =>{
        let returnArr = [];
        const userAvatar = this.state.chatUser['avatar'];
        snapshot.forEach((childSnapshot) => {
            let item = childSnapshot.val();
            item.user['avatar'] = userAvatar;
            returnArr.push(item);
        });

        this.setState({messages: returnArr.reverse()});
    };

    galleryClick()
    {
      let options = {
                  mediaType: 'photo',
                  quality: 1,
                  allowsEditing: true,
                  aspect: [4, 3],
              }
          ImagePicker.launchImageLibrary(options, (response) => {
              if (!response.didCancel) {
                  ImageResizer.createResizedImage(response.uri, 700, 1100, 'JPEG', 80)
                    .then(({uri}) => {
                      this.uploadImageAsync(uri);
                 })
                    .catch( err => {
                        console.log('error=', err);
                });
              }
          });
    }

    cameraClick()
    {
      let options = {
                  mediaType: 'photo',
                  quality: 1,
                  allowsEditing: true,
                  aspect: [4, 3],
              }
          ImagePicker.launchCamera(options, (response) => {
              if (!response.didCancel) {
                  ImageResizer.createResizedImage(response.uri, 700, 1100, 'JPEG', 80)
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
      this.setState({isImageupload: true});
      const{chatUser, chatID} = this.state;

      userActions.uploadImage(uri)
      .then(url => {
        this.setState({isImageupload: false}) ;
        let message = { "_id":userActions.generatorMessageID(),
            "image": url,
            "createdAt": Date.now(),
            "user": { "_id": this.state.userID,
                      "name": this.state.userName,
                      "avatar": this.state.userAvatar},
          };

          let contents = {
            'en': I18n.t('notificationNewImage')
          }
          let otherParameters = {"notifyType": 'message'};
          const tokenList = [chatUser['deviceToken']]

          dbRef.child(chatID).push(message)
          .then((data) => {
            console.log('success');
            for ( i = 0; i < tokenList.length; i++)
            {
              OneSignal.postNotification(contents, otherParameters, tokenList[i]);
            }
          }).
            catch((err) => {
              console.log('error===', err);
          });
      })
      .catch(error => console.warn(error))
    }

    componentWillUnmount(){
      OneSignal.inFocusDisplaying(2);
    }

    componentWillMount() {
        this.getMessageList();
        OneSignal.inFocusDisplaying(0);
    }

    showActionSheet(isReport) {

      this.setState({reportDialog: isReport}, ()=>{
        this.ActionSheet.show();
      });

    }

    moreClicked(){
      this.showActionSheet(true);
    }

    showDamondDialog(flag){
      // Actions.DiamondPayment({user:this.state.chatUser, showActionSheet: this.showActionSheet })
    }

    handlePress(i) {
      if(this.state.reportDialog){
        if (i == 1)
          this.endAfinity();
        else if(i ==2)
          this.reportProfile();
        else if(i ==3)
          this.shareProfile();
      }else{
        if (i == 1)
          this.cameraClick();
        else if(i ==2)
          this.galleryClick();
      }
    }

    shareProfile(){
      console.log('shared');
    }

    reportProfile(){
      console.log('reported');
      const reportorID = window.currentUser['userID'];
      const userID = this.state.chatUser['userID'];

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
        }
      })
    }

    endAfinity(){
      console.log('endafinity');
      Alert.alert(
        '',
        I18n.t('removeContactMsg'),
        [
          {text: I18n.t('no'), onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: I18n.t('yes'), onPress: () => this.removeContact()},
        ],
        { cancelable: false }
      )
    }

    removeContact(){
      const{chatID} = this.state;
      dbRef.child(chatID).remove();
      Actions.pop();
    }

    goBack(){
      if(this.props.rootBack)
        Actions.reset('home')
      else
        Actions.pop();
    }

    onSend(messages = []) {
      var message = { "_id":userActions.generatorMessageID(),
                      "text":this.state.message,
                      "createdAt": Date.now(),
                      "user": { "_id": this.state.userID,
                                "name": this.state.userName,
                                "avatar": this.state.userAvatar},
      };
      if(this.state.message !== '')
      {
        const{chatUser, chatID} = this.state;
        let contents = {
          'en': I18n.t('notificationNewMessage')
        }
        let otherParameters = {"notifyType": 'message'};
        const tokenList = [chatUser['deviceToken']]

        dbRef.child(chatID).push(message)
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
      }
    }

    renderSend = (props) => {
        return (
              <Send
                  {...props}
              >
              </Send>
          );
    }

    renderTime = (props) => {
      return (
          <Time
              {...props}
              timeTextStyle={{
                  right: {
                      color: '#898989',
                  },
                  left: {
                      color: '#3c3c3c',
                  }
              }}
          />
      );
    }

    renderInputToolbar(props) {
        return (
          <View style={styles.chatInputBar}>
              <TouchableOpacity
                style={styles.cameraBtn}
                onPress={()=>this.showDamondDialog(true)}
                hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
              >
                  <Image source={require('../../assets/UI/cameraIcon.png')} style={styles.cameraIcon}/>
              </TouchableOpacity>
              <TextInput
                keyboardAppearance="dark"
                style={styles.textInputItem}
                value={this.state.message}
                onChangeText={message => this.setState({ message })}
              />
              <TouchableOpacity
                hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                style={styles.sendBtn}
                onPress={this.onSend}
              >
                  <Image source={require('../../assets/UI/sendIcon.png')} style={styles.sendIcon}/>
              </TouchableOpacity>
          </View>
        );
    }

    renderBubble = (props) => {
        return (
          <Bubble
            {...props}
            textStyle={{
              right: {
                color: '#898989',
              },
              left:{
                color: '#3c3c3c',
              },
            }}
            wrapperStyle={{
              left: {
                backgroundColor: '#c6c6c6',
              },
              right: {
                backgroundColor: '#474747',
              },
            }}
            timeTextStyle={{
              right: { color: '#fde256' }
            }}
          />
        );
    }

    render() {

        const {navigate} = this.props.navigation;
        const {chatUser, isShowDamondDialog, reportDialog} = this.state;
        const { firstname, birth, personType } = chatUser;
        const age = moment(birth, 'DD / MM / YYYY').fromNow();
        const title = I18n.t("userNameAge", {name: firstname, age: age.replace(/\D/g,'')});

        const actionOptions = reportDialog ? reportOptions : photoOptions;

        return (

            <View style={styles.container}>

                <GiftedChat
                  messages={this.state.messages}
                  locale='fr'
                  timeFormat="HH:mm"
                  dateFormat="DD MMM.YYYY"
                  onSend={messages => this.onSend(messages)}
                  user={{
                    _id: this.state.userID,
                  }}
                  renderBubble={this.renderBubble}
                  renderSend={this.renderSend}
                  renderTime={this.renderTime}
                  renderInputToolbar={this.renderInputToolbar}
                  minInputToolbarHeight={60}
                  parsePatterns={linkStyle => [{
                                    pattern: /#(\w+)/,
                                    style: { ...linkStyle, color: 'lightgreen' },
                                    onPress: props => alert(`press on ${props}`),
                                  },
                                ]}
                />

                <ActionSheet
                  ref={o => this.ActionSheet = o}
                  options={actionOptions}
                  cancelButtonIndex={0}
                  onPress={this.handlePress}
                />

                <LinearGradient
                  colors={['#111111', '#111111', 'transparent']}
                  locations={[0,0.2,1]}
                  style={{position:'absolute', right:0, left:0, top: 0, height: 300}}>
                </LinearGradient>

                <SafeAreaView style={{position:'absolute', right:0, left:0, top: 30, flexDirection: 'row', justifyContent: "space-between", paddingTop: 30}}>

                  <TouchableOpacity
                    hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                    onPress={()=> this.goBack()}
                  >
                    <Image source={require('../../assets/UI/icons8-back-arrow.png')} style={{marginLeft: 20, marginTop: 15, width: 10, height: 19}}/>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.titleContainer} onPress={()=> Actions.Profile({user: chatUser})}>

                      <View style={{justifyContent: 'center', alignItems: 'center', width: 69, height: 69, borderRadius: 100, backgroundColor: personType == 'man' ? '#004eff' : '#f65890'}}>
                        <FastImage source={{uri: chatUser['avatar']}} style={styles.personChatRoomImage}/>
                      </View>

                      <Text style={styles.personChatRoomUserText}>{title}</Text>
                      <Text style={styles.personChatRoomText}>Private room</Text>

                  </TouchableOpacity>

                  <TouchableOpacity
                    hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                    onPress={() => this.moreClicked()}
                  >
                      <Image source={require('../../assets/UI/more.png')} style={styles.personChatRoomMoreImage}/>
                  </TouchableOpacity>

                </SafeAreaView>

            </View>
        );
    }
}
