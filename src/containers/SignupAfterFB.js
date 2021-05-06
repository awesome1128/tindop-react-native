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
import styles from '../style/signupAfterFBStyle';
import YellowButton from '../components/yellowButton';
import LogoHeader from '../components/logoHeader';
import * as userActions from '../store/actions/userActions';
import firebaseService from '../services/firebase';

class SignupAfterFB extends Component {

  constructor(props){
    super(props);
    this.state = {
      birth: '',
      personType: 'man'
    }
  }

  _signUpSubmit(){
    if(this.state.birth === ''){
        alert(I18n.t('alertBlankField'))
    }else if(!isDateValidFormat(this.state.birth)){
        alert(I18n.t('alertBirthday'))
    }else{
        this.updateNewUser();
    }
  }

  updateNewUser(){
    const {birth, personType} = this.state;
    const {userID} = this.props.user;

    firebaseService.database().ref('UsersList/'+userID).update({birth: birth, personType: personType}).then((data)=>{
      Actions.Contact({userID: userID, isFB: true});
    });

  }

  render() {
    const {isLoading, personType} = this.state;
    return (

        <View style={styles.container}>

            <LogoHeader
              onPress={()=> Actions.pop()}
            />

            <View style= {styles.formElementContainer}>
                <Text style={styles.titleItem}>{I18n.t('iAmA')}</Text>
            </View>

            <View style={[styles.formElement, styles.cateBtnContainer]}>

                <TouchableOpacity style={personType === 'woman' ? styles.womanBtn : styles.unselectedBtn} onPress = {() => {this.setState({personType: 'woman'})}}>
                    <Text style={personType === 'woman' ? styles.textMidItem : styles.textItemNotActive}>{I18n.t('woman')}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={personType === 'man' ? styles.manBtn : styles.unselectedBtn} onPress = {() => {this.setState({personType: 'man'})}}>
                    <Text style={personType === 'man' ? styles.textMidItem : styles.textItemNotActive}>{I18n.t('man')}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={personType === 'company' ? styles.companyBtn : styles.unselectedBtn} onPress = {() => {this.setState({personType: 'company'})}}>
                    <Text style={personType === 'company' ? styles.textMidItem : styles.textItemNotActive}>{I18n.t('company')}</Text>
                </TouchableOpacity>

            </View>

            <View style= {styles.formElementContainer}>
                <Text style={styles.titleItem}>{I18n.t('bornOn')}</Text>
            </View>

            <View style={styles.inputboxContainer}>

                <TextInput
                  autoCapitalize={'none'}
                  keyboardType='numeric'
                  returnKeyType='done'
                  keyboardAppearance="dark"
                  style={styles.textItem}
                  onChangeText = {(text) => {this.setState({birth: datehandler(text)})}}
                  value={this.state.birth} placeholder={I18n.t('dateBirth')}
                  placeholderTextColor="#c6c6c6"
                />

            </View>

            <TouchableOpacity onPress={() => Actions.Privacy()}>
              <Text style={styles.confirmText}>{I18n.t('acceptTerms')}</Text>
            </TouchableOpacity>

            <YellowButton
              text='confirm'
              onPress={() => {this._signUpSubmit()}}
            />

        </View>

    );

  }

}

export default SignupAfterFB
