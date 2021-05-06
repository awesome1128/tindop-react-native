import React, {Component} from 'react';
import {Alert, Platform, StyleSheet, Image, Text, View, TextInput, TouchableOpacity } from 'react-native';

import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import { Transition } from 'react-navigation-fluid-transitions';
import * as firebase from 'firebase';
import { NetworkInfo } from 'react-native-network-info';

import firebaseService from '../services/firebase';
import I18n from '../i18n/index';
import styles from '../style/smsSubscriptionStyle'
import YellowButton from '../components/yellowButton';
import LogoHeader from '../components/logoHeader';

const sms_mode = 'testing';
const api_key = '36f72684';
const api_secret = 'ERsVgClEBMUWhEO2';

export default class SMSSubscription extends Component {

  constructor(props) {

    super(props);

    this.state = {
      requestId: null,
      verificationCode: null,
      validationStatus: null,
    }

  }

  componentDidMount(){

    this.setState({phoneAuth: this.phoneAuth()});

  }

  phoneAuth(){

    fetch('https://api.nexmo.com/verify/json', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: api_key,
        api_secret: api_secret,
        number: this.props.phoneNo,
        brand: 'Tindop',
      }),
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      this.setState({requestId: responseJson.request_id});
    })
    .catch((error) => {
      console.error(error);
    });

  }

  verifyNumber(code){

    fetch('https://api.nexmo.com/verify/check/json', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: api_key,
        api_secret: api_secret,
        request_id: this.state.requestId,
        code: code,
        ip_adress: NetworkInfo.getIPAddress(ip => {return ip;}),
      }),
    })
    .then((response) => response.json())
    .then((responseJson) => {

      console.log(responseJson);

      if (responseJson.status == 0){
        Actions.SignupAfterSMS({ personType: this.props.personType, phoneNo: this.props.phoneNo });
      }else{
        Alert.alert(I18n.t('alertWrongCode'));
      }

    })
    .catch((error) => {
      console.error(error);
    });

  }

  onValidate(){

    if (sms_mode == 'production') {
      this.verifyNumber(this.state.verificationCode);
    }else{
      Actions.SignupAfterSMS({ personType: this.props.personType, phoneNo: this.props.phoneNo });
    }

  }

  render() {

    const {phoneNo, personType} = this.props;

    return (

        <View style={styles.container}>

            <LogoHeader
              onPress={()=> Actions.pop()}
            />

            <View style={styles.rubyContainer}>

                <Transition appear='scale'>
                  <Image source={require('../../assets/main/ruby-sms.png')} style={styles.rubyImage}/>
                </Transition>

                <Transition appear='top'>
                  <Text style={styles.smsText}>
                    {I18n.t('confirmWithSMS')}
                  </Text>
                </Transition>

            </View>

            <View style={styles.smsContainer}>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>

                    <TextInput
                      keyboardType='numeric'
                      keyboardAppearance="dark"
                      returnKeyType='done'
                      style={[styles.formElement, styles.textInput]}
                      placeholder={I18n.t('codeSMS')}
                      placeholderTextColor="#898989"
                      onChangeText={(code) => {this.setState({verificationCode: code})}}
                      value={this.state.verificationCode}
                    />

                    <Image source={require('../../assets/UI/reddot.png')} style={styles.reddotImage}/>

                </View>

                <View style={styles.midContainer}>

                    <Text style={styles.codeText}>{I18n.t('noSMS')}</Text>
                    <Image source={require('../../assets/UI/ok.png')} style={styles.okImage}/>

                </View>

                <TouchableOpacity onPress={() => Actions.Privacy()}>
                  <Text style={styles.confirmText}>{I18n.t('acceptTerms')}</Text>
                </TouchableOpacity>

            </View>

            <YellowButton
              text='confirm'
              onPress={() => this.onValidate()}
            />

        </View>

    );
  }
}
