import React, {Component} from 'react';
import {Platform, StyleSheet, Image, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, Modal } from 'react-native';

import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import * as Progress from 'react-native-progress';

import { responsiveHeight,
         responsiveWidth,
         responsiveFontSize
} from 'react-native-responsive-dimensions';
import I18n from '../i18n/index';
import { datehandler, isDateValidFormat, verficationEmail, verficationChamps, verficationPassword, verficationConfirmPass, sessionContacts } from '../store/session/actions';
import styles from '../style/signupAfterSMSStyle';
import YellowButton from '../components/yellowButton';
import LogoHeader from '../components/logoHeader';
import * as userActions from '../store/actions/userActions';
import firebaseService from '../services/firebase'


class SignupAfterSMS extends Component {

  constructor(props){
    super(props);
    this.state = {
      firstname: '',
      birth: '',
      email: '',
      password: '',
      confirmpass: '',
      isLoading: false
    }

  }

  _signUpSubmit(){
    const {personType, phoneNo} = this.props;
    if(!verficationChamps(this.state.firstname, this.state.email, this.state.password, this.state.confirmpass, this.state.birth)){
        alert(I18n.t('alertBlankField'))
    }else if(!isDateValidFormat(this.state.birth)){
        alert(I18n.t('alertBirthday'))
    }else if(!verficationEmail(this.state.email)){
        alert(I18n.t('alertMail'));
    }else if(!verficationPassword(this.state.password)){
        alert(I18n.t('alertPassword'))
    }else if(!verficationConfirmPass(this.state.password, this.state.confirmpass)){
        alert(I18n.t('alertSamePassword'));
    }else{
        this.setState({isLoading: true});
        this.createNewUser(personType, phoneNo);
    }
  }

  async createNewUser(personType, phoneNo){
    const {firstname, birth, email, password} = this.state;
    let isExistEmail = false;
    await firebaseService.auth().createUserWithEmailAndPassword(email, password).then(()=>{
      isExistEmail = false
    }).catch((error)=>{
      isExistEmail = true;
    });
    if(isExistEmail){
      alert(I18n.t('alertExistEmail'));
      this.setState({isLoading: false});
    }else{
      const userInfo = {
        username: email,
        password: password,
        userID: ''
      }

      const newUser = {
        firstname: firstname,
        birth: birth,
        email: email,
        phoneNo: phoneNo,
        personType: personType,
        isHideLocation: false,
        diamondCounts: 4,
        createdAt: new Date().getTime()
      }

      firebaseService.database().ref('UsersList').push(newUser).then((data)=>{
        userInfo['userID'] = data.key;
        userActions._storeData('userInfo', userInfo);
        Actions.Contact({userID: data.key, isFB: false});
        this.setState({isLoading: false});
      });
    }

  }

  render() {
    const {isLoading} = this.state;
    return (

        <View style={styles.container}>

            <LogoHeader
              onPress={()=> Actions.pop()}
            />
            {
              isLoading &&
              <Progress.Circle
                style={{position: 'absolute', top: responsiveHeight(50), zIndex: 10, left: responsiveWidth(48)}}
                size={40}
                indeterminate={true}
              />
            }
            <KeyboardAvoidingView behavior="position" enabled style={styles.inputboxContainer}>

                <TextInput
                  keyboardAppearance="dark"
                  style={styles.textItem}
                  returnKeyType='done'
                  onChangeText = {(text) => {this.setState({firstname: text})}}
                  value = {this.state.firstname}
                  placeholder={I18n.t('firstName')}
                  placeholderTextColor="#c6c6c6"
                />
                <TextInput
                  autoCapitalize={'none'}
                  keyboardType='numeric'
                  returnKeyType='done'
                  keyboardAppearance="dark"
                  style={styles.textItem}
                  onChangeText = {(text) => {this.setState({birth: datehandler(text)})}}
                  value = {this.state.birth} placeholder={I18n.t('dateBirth')}
                  placeholderTextColor="#c6c6c6"
                />
                <TextInput
                  autoCapitalize='none'
                  keyboardAppearance="dark"
                  returnKeyType='done'
                  style={styles.textItem}
                  onChangeText = {(text) => {this.setState({email: text})}}
                  value = {this.state.email} placeholder={I18n.t('email')}
                  placeholderTextColor="#c6c6c6"
                />
                <TextInput
                  keyboardAppearance="dark"
                  style={styles.textItem}
                  returnKeyType='done'
                  secureTextEntry = {true}
                  onChangeText = {(text) => {this.setState({password: text})}}
                  value = {this.state.password} placeholder={I18n.t('password')}
                  placeholderTextColor="#c6c6c6"
                />
                <TextInput
                  keyboardAppearance="dark"
                  returnKeyType='done'
                  style={styles.textItem}
                  secureTextEntry = {true}
                  onChangeText = {(text) => {this.setState({confirmpass: text})}}
                  value = {this.state.confirmpass}
                  placeholder={I18n.t('confirmPassword')}
                  placeholderTextColor="#c6c6c6"
                />

            </KeyboardAvoidingView>

            <YellowButton
              text='confirm'
              onPress={() => {this._signUpSubmit()}}
            />

        </View>

    );

  }

}

export default SignupAfterSMS
