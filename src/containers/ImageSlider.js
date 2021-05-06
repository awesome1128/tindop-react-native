import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Dimensions, Image, StatusBar} from 'react-native';

import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-carousel-view';
import { Transition } from 'react-navigation-fluid-transitions';
import * as Animatable from 'react-native-animatable';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import OneSignal from 'react-native-onesignal';


import styles from '../style/imageSliderStyle';
import I18n from '../i18n/index';

const { width, height } = Dimensions.get('window');

const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

export default class ImageSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width
    };
  }

  render() {
    return (
      <View  style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <View style={{flex: 1}}>
          <MyStatusBar backgroundColor="#fff" barStyle="light-content" />
          <Carousel
            width={this.state.width}
            height={this.state.height}
            indicatorSize={10}
            indicatorColor="#fff"
            inactiveIndicatorColor="#484848"
            indicatorSpace="20"
            delay={10000}
            loop={true}
            indicatorOffset={36}
          >
            <View style={{backgroundColor: "#1a1a1a"}}>

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

              <View style={styles.bottomTextContainer}>
                  <Text style={styles.bottomText}>{I18n.t('firstText')}</Text>
              </View>

            </View>

            <View>

                <Image source={require('../../assets/sliders/1.png')} style={styles.carouselContainer}/>

                <View style={styles.bottomTextContainer}>
                  <Text style={styles.bottomText}>{I18n.t('secondText')}</Text>
                </View>

            </View>

            <View>

                <Image source={require('../../assets/sliders/2.png')} style={styles.carouselContainer}/>

                <View style={styles.bottomTextContainer}>
                  <Text style={styles.bottomText}>{I18n.t('thirdText')}</Text>
                </View>

            </View>

            <View>

                <Image source={require('../../assets/sliders/3.png')} style={styles.carouselContainer}/>

                <View style={styles.bottomTextContainer}>
                  <Text style={styles.bottomText}>{I18n.t('fourthText')}</Text>
                </View>

            </View>

          </Carousel>

          <View style={styles.btnContainer}>

            <Transition appear='vertical' disappear='bottom'>
              <TouchableOpacity style={styles.connectionBtnContainer} onPress={() => Actions.Login({ selectedLogin: true })}>
                  <LinearGradient colors={ ["#FDC810", "#FDE256"]} style={styles.connectionBtnLinearLayout}>
                      <Text style={styles.connectionText}>{I18n.t('connection').toUpperCase()}</Text>
                  </LinearGradient>
              </TouchableOpacity>
            </Transition>

            <Transition appear='vertical' disappear='bottom'>
              <TouchableOpacity style={styles.accountBtnContainer} onPress={() =>  Actions.Login({ selectedLogin: false })}>
                  <Text style={styles.accountText}>{I18n.t('createAccount').toUpperCase()}</Text>
              </TouchableOpacity>
            </Transition>

         </View>

        </View>
      </View>
    );
  }
}
