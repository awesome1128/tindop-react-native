import React, {Component} from 'react';
import {Platform, StyleSheet, Image, Text, View, TextInput, TouchableOpacity } from 'react-native';

import { Actions } from 'react-native-router-flux';
import { SocialIcon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../style/smsSubscriptionStyle';


export default class SMSSubscription2 extends Component {
  render() {

    return (

        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={require('../../assets/main/logo.png')} style={styles.logoImage}/>
            </View>
            <View style={styles.rubyContainer}>
                <Image source={require('../../assets/main/ruby-sms.png')} style={styles.rubyImage}/>
                <Text style={styles.smsText}>Confirm your subscription{"\n"} with the code sent via SMS.</Text>
            </View>
            <View style={styles.smsContainer}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TextInput style={[styles.formElement, styles.textInput]} placeholder="Code" placeholderTextColor="#898989"/>
                    <Image source={require('../../assets/UI/checkmark.png')} style={styles.reddotImage}/>
                </View>
                <View style={[styles.midContainer, {display: 'none'}]}>
                    <Text style={styles.codeText}>
                        I didn't get the code
                    </Text>
                    <Image source={require('../../assets/UI/checkmark.png')} style={styles.okImage}/>  
                </View>
                <Text style={styles.confirmText}>
                        When you click on "CONFIRM", you accept the{"\n"} terms and conditions, the use of Facebook cookies, the{"\n"} privacy policy and the terms of service  of{"\n"} the Tindop app.
                </Text>
            </View>

            <View style={styles.bottomContainer}>
                <TouchableOpacity style={styles.btnItem} onPress={() => Actions.SignupAfterSMS()}>
                    <LinearGradient colors={ ["#FDC810", "#FDE256"]} style={styles.btnLayout}>
                        <Text style={styles.btnText}>NEXT</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    );
  }
}
