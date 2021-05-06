import React, { Component } from 'react';
import {  View, Image, StatusBar} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as Progress from 'react-native-progress';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { Transition } from 'react-navigation-fluid-transitions';

import * as userActions from '../store/actions/userActions';
import styles from '../style/imageSliderStyle';
import { sessionLoginUser, sessionFacebookLogin } from '../store/session/actions';
import I18n from '../i18n/index';

class Splash extends Component{

  constructor(props){
    super(props);
    this.state = {
      isuserLogin: true,
      isPassed: false
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.error === "login_error"){
      Actions.ImageSlider();
      this.setState({isuserLogin: false});
    }else if(nextProps.error === "login_fb_error"){
      Actions.ImageSlider();
      this.setState({isuserLogin: false});
    }else if(nextProps.user !== null && nextProps.islogin === true && nextProps.loading === false) {
      this.setState({isuserLogin: false});
      if(!this.state.isPassed){
        window.currentUser = nextProps.user;
        Actions.reset('home');
      }      
    }
  }

  componentWillMount() {
    userActions._retrieveData('language').then((language) => {

      if(language=="true")
        I18n.locale = "en";
      else
        I18n.locale = "fr";
    })
    .catch((error) => console.log(error));

    setTimeout(() => {
      userActions._retrieveData('logged').then((value) => {        
          if(value=="true"){
              userActions._retrieveData('userInfo').then((userData) => {
                  const currentUser = JSON.parse(userData);                  
                  this.props.loginWithEmailandPass(currentUser.username, currentUser.password);
              })
              .catch((error) => console.log(error));
          }else{
            // this.props.navigation.navigate('Home');
            this.setState({isPassed: true});
            Actions.ImageSlider();       
          }
      }).catch((error) => {
          this.setState({isPassed: true});
          Actions.ImageSlider();            
      });
      
    }, 3000);
  }


  render(){
    const {isuserLogin} = this.state;
    return(
      <View  style={{
        flex: 1,
        backgroundColor: "#1a1a1a"
      }}>
        <StatusBar
           backgroundColor="blue"
           barStyle="light-content"
        />
        {
          isuserLogin &&
          <View style={{alignItems: 'center', position: 'absolute', bottom: responsiveHeight(25), width: '100%'}}>
            <Progress.Circle 
              size={45} 
              indeterminate={true} 
            />
          </View>
        }

          <View style={styles.imgContainer}>
              <Image style={styles.rubyImg} source={require('../../assets/sliders/logoRuby.png')}></Image>
          </View>

          <Transition appear='scale'>
            <Image style={{position: 'absolute', left: 30, top: responsiveHeight(40), height: 100, width: 100}} source={require('../../assets/sliders/greenDiamond.png')}></Image>
          </Transition>

          <Transition appear='scale'>
            <Image style={{position: 'absolute', right: 100, top: responsiveHeight(45), height: 120, width: 120}} source={require('../../assets/sliders/yellowDiamond.png')}></Image>
          </Transition>

          <Transition appear='scale'>
            <Image style={{position: 'absolute', right: 50, top: responsiveHeight(42), height: 50, width: 50}} source={require('../../assets/sliders/blueDiamond.png')}></Image>
          </Transition>
      </View>
    )
  }
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Splash)
