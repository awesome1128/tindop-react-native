import React, {Component} from 'react';
import {Platform, StyleSheet, Image, Text, View, SafeAreaView, ScrollView, TextInput, TouchableOpacity} from 'react-native';

import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import { Transition } from 'react-navigation-fluid-transitions';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import FastImage from 'react-native-fast-image';
import moment from 'moment';

import firebaseService from '../services/firebase';
import I18n from '../i18n/index';
import styles from '../style/chatRoomStyle';
import YellowButton from '../components/yellowButton';
import LogoHeader from '../components/logoHeader';

const dbRef = firebaseService.database();

export default class ChatRoom extends Component {

  constructor(props){
    super(props);
    this.state = {
      contactList: [],
      chatList: []
    }
    this.getChatLists = this.getChatLists.bind(this);
    this.datediff = this.datediff.bind(this);
  }

  datediff(first, second) {
    return Math.round((second - first) / (1000 * 60 * 60 * 24) - 1);
  }

  getNearbyContacts(){
    dbRef.ref('UsersList').once('value', (snapshot)=>{
      let list = [];
      snapshot.forEach((data)=>{
        let user = data.val();
        if(data.key !== window.currentUser['userID']){
          user['userID'] = data.key;
          list.push(user);
        }
      })
      this.setState({contactList: list});
    })
  }

  async getChatLists(){
    const currentKey = window.currentUser['userID'];
    const THIS = this;

    dbRef.ref('ChatRooms').on('value', (snapshot)=>{
      let keylist = [];
      let chatlist = [];

      snapshot.forEach((data)=>{
        const chatID = data.key;
        if( chatID.indexOf(currentKey) >= 0){
          keylist.push(chatID);
        }
      })
      if(keylist.length>0){
        keylist.map((chatid)=>{

          const chatRef = dbRef.ref('ChatRooms').child(chatid);
          chatRef.limitToLast(1).once('value', async function(snapshot)  {
            if(snapshot.val() !== null){
                let childData = '';
                snapshot.forEach((childSnapshot) => {
                  childData = childSnapshot.val();
                });

                if (childData != null) {
                  if(childData.location != null){
                    childData.text = "Position partagée"
                  }
                  else if(childData.image != null){
                    childData.text = "Pièce jointe partagée"
                  }
                } else {
                  childData = {
                    createdAt: "0",
                    text: "Lancez une discussion!"
                  }
                }

                var options = { month: 'long', day: 'numeric' };
                var date = new Date(childData.createdAt);
                var lastTime_msg = '';
                if (THIS.datediff(date, new Date()) < 1) {
                  lastTime_msg = moment(date).format("HH:mm");
                } else if (THIS.datediff(date, new Date()) === 1) {
                  lastTime_msg = "Hier"
                } else if (THIS.datediff(date, new Date()) < 365) {
                  lastTime_msg = date.toLocaleDateString('fr-FR', options);
                }

                const userIDArr = chatid.split('*_*');
                let chatUserID = currentKey === userIDArr[0] ? userIDArr[1] : userIDArr[0];

                let userData = '';
                await dbRef.ref('UsersList/').child(chatUserID).once('value', (snapshot)=>{
                  if(snapshot.val() !== null){
                    let user = snapshot.val();
                    user['userID'] = snapshot.key;
                    userData = user;
                  }
                });

                if(userData !== ''){
                  const age = moment(userData.birth, 'DD / MM / YYYY').fromNow();
                  userData['age'] = age.replace("years ago", "");
                  let object = {
                    chatID: chatid,
                    lastmessage: childData.text,
                    lastTime: lastTime_msg,
                    createdAt: childData.createdAt,
                    user: userData
                  }

                  if(chatlist.length > 0)
                  {
                    let replace_index = -1
                    chatlist.map((item, index)=>{
                      if(item.chatID == object.chatID){
                        replace_index = index;
                      }
                    })
                    if (replace_index > -1)
                    {
                      chatlist[replace_index] = object;
                    }else{
                      chatlist.push(object);
                    }
                  }else{
                    chatlist.push(object);
                  }
                  console.log('chatObj====', chatlist);
                  THIS.setState({ chatList: chatlist });
                }
              }
          })
        })
      }else{
        THIS.setState({ chatList: chatlist });
      }

    })
  }

  async contactClicked(userItem){
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

  chatClicked(chatItem){
    Actions.PersonChatRoom({user: chatItem.user, chatID: chatItem.chatID, rootBack: false});
  }

  componentDidMount(){
    this.getNearbyContacts();
    this.getChatLists();
  }

  render() {
    // const {navigate} = this.props.navigation;
    const {contactList, chatList} = this.state;
    const chatfilterList = chatList.sort((a, b) => (a.createdAt < b.createdAt) ? 1 : ((b.createdAt < a.createdAt) ? -1 : 0));

    return (
        <View style={{flex: 1, backgroundColor: '#1a1a1a'}}>

            <LogoHeader
              onPress={()=> Actions.pop()}
              text='Chat Room'
            />

            <View style = {{ marginTop: responsiveHeight(5), height: 88, alignItems: 'flex-start'}}>
              <Text style={{textAlign: 'left', color: '#f0f0f0', fontFamily: 'Lato-Regular', marginBottom: 6, marginLeft: 20}}>Near you</Text>
              <ScrollView
                horizontal={true}
                contentContainerStyle = {{ marginLeft: 20, paddingRight: 30}}>
                {
                  contactList.map((userItem, index)=>{
                    return(
                      <TouchableOpacity
                        key = {index}
                        style = {{alignItems: 'center', justifyContent: 'center', width: 60, height: 60, borderRadius: 100, backgroundColor: userItem.personType == 'man' ? '#004eff' : '#f65890', marginRight: 14}}
                        onPress = {()=>this.contactClicked(userItem)}>
                          <FastImage source={{uri: userItem.avatar}} style={{width: 56, height: 56, borderColor: '#161616', borderWidth: 2, borderRadius: 100}}/>
                      </TouchableOpacity>
                    )
                  })
                }
              </ScrollView>
            </View>
            {
              chatList.length === 0 ? (
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>

                  <Text style={{fontFamily: 'Lato-Regular', width: responsiveWidth(60), fontSize: 15, textAlign: "center", color: "white", lineHeight: 20, marginTop: -120}}>{I18n.t('noContacts')}</Text>
                  <Image source={require('../../assets/UI/messageIcon.png')} style={{width: responsiveWidth(30), height: responsiveWidth(29), marginTop: 20}}/>

                  <YellowButton
                    text='goToMap'
                    onPress={()=> Actions.pop()}
                  />

                </View>
              ) : (
                <ScrollView>
                {
                  chatfilterList.map((chatObj) => {
                    return(
                        <TouchableOpacity onPress={()=> this.chatClicked(chatObj)}>
                          <View style={styles.item}>
                              <FastImage source={{uri: chatObj.user['avatar']}} style={{width: 60, height: 60, marginRight: 15, borderRadius: 100, borderColor: '#222322', borderWidth: 5}}/>
                              <View style={styles.nameView}>
                                  <Text style={styles.head}>{chatObj.user['firstname'] + ', ' + chatObj.user['age']}</Text>
                                  <Text style={styles.sub}>{chatObj.lastmessage}</Text>
                              </View>
                              <TouchableOpacity style={styles.icon} rippleColor="yello">
                                  {/* <Image source={require('../../assets/images/9_00.png')} style={{width: 24, height: 24}} name="icon"/> */}
                              </TouchableOpacity>
                              <TouchableOpacity style={styles.icon} rippleColor="yello">
                                  <Image source={require('../../assets/UI/check.png')} style={{width: 12, height: 12}} name="icon"/>
                              </TouchableOpacity>
                          </View>
                      </TouchableOpacity>
                    )
                  })
                }
                </ScrollView>
              )
            }
        </View>
    );
  }
}
