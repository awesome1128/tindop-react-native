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

class ForgotPassword extends Component {

  constructor(props){
    super(props);
    this.state = {
      forgotMail: ''
    }
  }

  sendNewPassword() {

    firebaseService.auth().sendPasswordResetEmail(this.state.forgotMail).then(function(){
      alert("Done!");
    }).catch(function(e){
      alert(e);
    })

  }

  render() {
    const {isLoading, personType} = this.state;
    return (

        <View style={styles.container}>

            <LogoHeader
              onPress={()=> Actions.pop()}
            />

            <View style= {styles.formElementContainer}>
                <Text style={styles.titleItem}>{I18n.t('forgotTitle')}</Text>
            </View>

            <View style={styles.inputboxContainer}>

                <TextInput
                  autoCapitalize={'none'}
                  returnKeyType='done'
                  keyboardAppearance="dark"
                  style={styles.textItem}
                  value={this.state.forgotMail}
                  onChangeText={(text) => {this.setState({forgotMail: text})}}
                  placeholder={I18n.t('email')}
                  placeholderTextColor="#c6c6c6"
                />

            </View>

            <YellowButton
              text='confirm'
              onPress={() => {this.sendNewPassword()}}
            />

        </View>

    );

  }

}

export default ForgotPassword
