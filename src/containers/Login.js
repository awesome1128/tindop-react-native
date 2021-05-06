import React, {Component} from 'react';
import {Platform, StyleSheet, Image, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, SafeAreaView, Modal} from 'react-native';

// Libraries
import { Actions } from 'react-native-router-flux';
import { BallIndicator } from 'react-native-indicators';
import LinearGradient from 'react-native-linear-gradient';
import { Dialog, DialogContent} from 'react-native-popup-dialog';
import PhoneInput from 'react-native-phone-input';
import { Transition } from 'react-navigation-fluid-transitions';
import * as Animatable from 'react-native-animatable';
import * as Progress from 'react-native-progress';
import { responsiveHeight,
         responsiveWidth,
         responsiveFontSize
} from 'react-native-responsive-dimensions';
import * as firebase from 'firebase';

import * as userActions from '../store/actions/userActions';
import firebaseService from '../services/firebase';
import styles from '../style/loginStyle';
import PropTypes from 'prop-types';
import { sessionLoginUser, sessionFacebookLogin } from '../store/session/actions';
import { connect } from 'react-redux';
import moment from 'moment';
import I18n from '../i18n/index';
import YellowButton from '../components/yellowButton';


const dbRef = firebaseService.database();

class Login extends Component {

  constructor(props){
    super(props);
    this.state = {
        dialogVisible: false,
        languageSelected: [false, false],
        LanguageIndex: -1,
        selectedLanguage: -1,
        selectedLogin: props.selectedLogin,
        personType: 'man',
        phoneNo: '',
        loginEmail: '',
        loginPass: '',
        isuserLogin: false,
        isfbLogin: false,
    }
  }

  selectLanguage = (key) => {
    this.setState(state => {
        const languageSelected = state.languageSelected.map((value, j) => {
            if(j === key) {
                return true;
            } else {
                return false;
            }
        });

        return {
            languageSelected,
            LanguageIndex: key
        };
    });
  }

  submitLanguage = () => {
    const selectedLanguage = this.state.LanguageIndex;
    if(selectedLanguage === 0)
    {
      I18n.locale = "en";
      userActions._storeData('language', true);
    }
    else
    {
      I18n.locale = "fr";
      userActions._storeData('language', false);
    }

    this.setState({selectedLanguage, dialogVisible: false});
  }

  componentWillMount(){
    const index = I18n.currentLocale() === 'en' ? 0 : 1;
    this.setState({selectedLanguage: index});
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.error === "login_error"){
      alert("Wrong email or password, try again please.");
      this.setState({isuserLogin: false});
    }else if(nextProps.error === "login_fb_error"){
      this.setState({isuserLogin: false});
    }else if(nextProps.user !== null && nextProps.islogin === true && nextProps.loading === false) {
      this.setState({isuserLogin: false});

      if(this.state.isfbLogin){
        if(nextProps.user['birth'] === undefined || nextProps.user['birth'] === null || nextProps.user['birth'] === ''){
          Actions.SignupAfterFB({user: nextProps.user});
        }else{
          window.currentUser = nextProps.user;
          Actions.reset('home');
        }
      }else{
        window.currentUser = nextProps.user;
        Actions.reset('home');
      }
    }
  }

  async registerNewUser(){
    const{personType, phoneNo} = this.state;
    let isExistPhoneNo = false

    await dbRef.ref('UsersList')
    .orderByChild('phoneNo').equalTo(phoneNo)
    .once('value', (snapshot)=>{
      if(snapshot.val() !== null)
        isExistPhoneNo = true;
    })

    if(isExistPhoneNo){
        alert(I18n.t('alertExistPhoneNumber'));
    }else{
      if(phoneNo !== ''){
        Actions.SMSSubscription({ personType: personType, phoneNo: phoneNo });
      }
      else
        alert(I18n.t('alertPhoneNumber'));
    }

  }

  _onPressLogin = () => {
    this.setState({isuserLogin: true, isfbLogin: false});
    this.props.loginWithEmailandPass(this.state.loginEmail, this.state.loginPass);
  }

  _onPressFaceBookLogin = () => {
    this.setState({isuserLogin: true, isfbLogin: true});
    this.props.facebookLogin();
  }

  render() {

    const languages = [
        {
            image: require('../../assets/flags/flag_eng.png'),
            text: 'Anglais'
        },
        {
            image: require('../../assets/flags/flag.png'),
            text: 'Français'
        }
    ];
    const {isuserLogin, personType, phoneNo} = this.state;
    return (
      <View style={styles.container}>
        {
          isuserLogin &&
          <Progress.Circle
            style={{position: 'absolute', top: responsiveHeight(50), zIndex: 10}}
            size={40}
            indeterminate={true}
          />
        }
        <TouchableOpacity onPress={() => { this.setState({ dialogVisible: true }); }} style={styles.selectLanguage}>
          <Image source={ this.state.selectedLanguage !== -1 ? languages[this.state.selectedLanguage].image : require('../../assets/flags/flag.png')} style={{ width: 28.5, height: 28.5}} />
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <Image source={require('../../assets/main/logo.png')} style={{width: 113, height: 85.5}}/>
        </View>

        <View style={styles.loginContainer}>

            <TouchableOpacity hitSlop={{top: 10, bottom: 10, left: 10, right: 10}} onPress={() => {this.setState({selectedLogin: true})}} style={styles.loginSelect}>
                <Animatable.Text transition="fontSize" style={this.state.selectedLogin? styles.activeItem: styles.textItem}>{I18n.t('connection')}</Animatable.Text>
            </TouchableOpacity>

            <TouchableOpacity hitSlop={{top: 10, bottom: 10, left: 10, right: 10}} onPress={() => {this.setState({selectedLogin: false})}}>
                <Animatable.Text style={this.state.selectedLogin? styles.textItem: styles.activeItem}>{I18n.t('createAccount')}</Animatable.Text>
            </TouchableOpacity>

        </View>

        {this.state.selectedLogin &&

            <View style={styles.formContainer}>

                <KeyboardAvoidingView behavior="position" enabled>

                  <TextInput autoCapitalize='none' keyboardAppearance="dark" style={[styles.formElement, styles.textInput]} placeholderTextColor="#c6c6c6" placeholder={I18n.t('email')} onChangeText={(text) => {this.setState({loginEmail: text})}} value={this.state.loginEmail} />
                  <TextInput keyboardAppearance="dark" style={[styles.formElement, styles.textInput]} placeholderTextColor="#c6c6c6" secureTextEntry={true} placeholder={I18n.t('password')} onChangeText={(text) => {this.setState({loginPass: text})}} value={this.state.loginPass} />

                </KeyboardAvoidingView>

                <TouchableOpacity onPress={() => {Actions.ForgotPassword()}} style={styles.forgotPasswordContainer}>
                    <Text style={styles.forgotPassword}>{I18n.t('forgotPassword')}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.formElement, styles.connectBut]} onPress={() => {
                    this._onPressLogin();
                }}>
                    <Text style={styles.buttonText}>{I18n.t('connect').toUpperCase()}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {this._onPressFaceBookLogin()}}>
                    <LinearGradient colors={ ["#474747", "#3b3b3b"]} style={[styles.formElement, styles.facebookBut]}>
                        {/* <SocialIcon type='facebook' raised = {false} style={styles.facebookIcon} iconSize ={18} iconColor="#5b7fc9" /> */}
                        <Text style={[styles.buttonText, styles.facebookText]}>{I18n.t('connectFacebook')}</Text>
                    </LinearGradient>
                </TouchableOpacity>

            </View>

        }

        <Dialog
            dialogStyle = {styles.languageSelection}
            visible={this.state.dialogVisible}
            width = {1}
            onTouchOutside={() => {
            this.setState({ dialogVisible: false });
            }} >

            <DialogContent>

                <View style={styles.dialogContent}>

                    <View style={styles.languageItem}>
                        {/* <Icon name="close" size={30} iconStyle={styles.crossIcon} color="#868686" onPress={() => { this.setState({ dialogVisible: false }); }} /> */}
                        <Text style={styles.dialogTitle}>{I18n.t('chooseLanguage')}</Text>
                    </View>

                    {languages.map((value, key) =>
                        <View key = {key} style={[styles.languageItemContainer, this.state.languageSelected[key] ? styles.languageItemSelected: null]}>
                            <TouchableOpacity style={styles.languageItem} onPress={() => { this.selectLanguage(key) }}>
                                <Image source={value.image} style={{ width: 28.5, height: 28.5}} />
                                <Text style={styles.languageText}>{value.text}</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    <TouchableOpacity style={styles.dialogContainer} onPress={() => this.submitLanguage() }>
                        <LinearGradient colors={ ["#fdc810", "#fde256"]} style={styles.dialogButtonBack}>
                            <Text style={styles.dialogButtonText}>{I18n.t('validate').toUpperCase()}</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                </View>

            </DialogContent>

        </Dialog>

        {!this.state.selectedLogin &&
            <View style={styles.formContainer}>

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

                <View style={styles.formElementContainer}>
                    <Text style={styles.titleItem}>{I18n.t('phoneNumber')}</Text>
                </View>

                <KeyboardAvoidingView behavior="position" enabled>

                  <PhoneInput
                    ref='phone'
                    style={[styles.formElement, styles.textInput]}
                    placeholder="+33"
                    textStyle={{color: '#fff'}}
                    onChangePhoneNumber={(text) => {this.setState({phoneNo: text})}}
                    value={this.state.phoneNo}
                    cancelText={I18n.t('cancel')}
                    confirmText={I18n.t('confirm')}
                    textProps={{
                        returnKeyType: "done",
                        keyboardType: "phone-pad",
                        keyboardAppearance: "dark",
                        onSubmitEditing: () => {console.log("May be focus done field.")}
                    }}
                  />

                </KeyboardAvoidingView>

                <TouchableOpacity style={[styles.dialogContainer, styles.signupButton]} onPress={() => this.registerNewUser()}>

                    <LinearGradient colors={ ["#fdc810", "#fde256"]} style={styles.dialogButtonBack}>
                        <Text style={styles.dialogButtonText}>{I18n.t('next').toUpperCase()}</Text>
                    </LinearGradient>

                </TouchableOpacity>

            </View>
        }
      </View>
    );
  }
}

Login.propTypes = {
    loginWithEmailandPass: PropTypes.func.isRequired,
    facebookLogin: PropTypes.func.isRequired
}

function mapStateToProps(state){
    return {
        // sessionState: state.session,
        user: state.session.user,
        loading: state.session.loading,
        error: state.session.error,
        islogin: state.session.islogin
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginWithEmailandPass: (email, pass) => {
            dispatch(sessionLoginUser(email, pass));
        },
        facebookLogin: () => {
            dispatch(sessionFacebookLogin());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
