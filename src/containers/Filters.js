import React, {Component} from 'react';
import {Alert, Platform, StyleSheet, Image, Text, View, ScrollView, TouchableOpacity} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { Transition } from 'react-navigation-fluid-transitions';
import Switch from 'react-native-switch-pro';
import LinearGradient from 'react-native-linear-gradient';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import I18n from '../i18n/index';
import LogoHeader from '../components/logoHeader';
import YellowButton from '../components/yellowButton';

export default class Filters extends Component {

	constructor(props) {
		super(props);

    this.state = {
      switch: false
    };

	}

  render() {

    const {navigate} = this.props.navigation;
    const filters = [
          {
            name : "Amoureuse",
            begin : "#EE80A3",
            end : "#F43B5E",
            subcategory : {
              name1 : "Manger",
              name2 : "Boire",
              name3 : "Restaurant",
              name4 : "Pêche",
              name5 : "Chasse"
            },
          },
          {
            name : "Artistique",
            begin : "#e5204f",
            end : "#ff8539",
            subcategory : {
              name1 : "Courrir",
              name2 : "Sapin",
              name3 : "Sub3",
              name4 : "Sub4",
              name5 : "Noël"
            },
          },
          {
            name : "Jeux",
            begin : "#7c12ff",
            end : "#3dd1c5",
            subcategory : {
              name1 : "Sub1",
              name2 : "Sub2",
              name3 : "Sub3",
              name4 : "Sub4",
              name5 : "Sub5"
            },
          },
          {
            name : "Job",
            begin : "#EE80A3",
            end : "#F43B5E",
            subcategory : {
              name1 : "Sub1",
              name2 : "Sub2",
              name3 : "Sub3",
              name4 : "Sub4",
              name5 : "Sub5"
            },
          },
          {
            name : "amoureuse",
            begin : "#EE80A3",
            end : "#F43B5E",
            subcategory : {
              name1 : "Sub1",
              name2 : "Sub2",
              name3 : "Sub3",
              name4 : "Sub4",
              name5 : "Sub5"
            },
          },
          {
            name : "amoureuse",
            begin : "#EE80A3",
            end : "#F43B5E",
            subcategory : {
              name1 : "Sub1",
              name2 : "Sub2",
              name3 : "Sub3",
              name4 : "Sub4",
              name5 : "Sub5"
            },
          },
    ]

    return (
      <View style={{flex: 1, backgroundColor: '#161616'}}>

				<LogoHeader
					onPress={()=> Actions.pop()}
					text='Filter'
					displayLogo={false}
					position='absolute'
          rightContent={
            <View style={{alignItems: 'center'}}>
              <Switch
                circleColorActive='#32c67b'
                circleColorInactive='#e5204f'
                backgroundActive='#272727'
                backgroundInactive='#272727'
                onSyncPress={value => {this.setState({switch:value})}}
                style={{marginBottom: 4}}
              />
              <Text style={{color: this.state.switch ? '#32c67b' : '#e5204f'}}>{this.state.switch ? 'On' : 'Off'}</Text>
            </View>
          }
				/>

				<ScrollView style={{padding: 20, paddingTop: 100}}>

          {
            filters.map((filter, index) => (

              <View style={{marginBottom: 25}}>

                <Text style={{fontFamily: 'Lato-Regular', color: '#fff', fontSize: 22 , marginBottom: 15}}>{filter.name}</Text>

                <View style={{flexDirection: 'row',
                              alignItems: 'flex-start',
                              justifyContent: 'flex-start',
                              flexWrap: 'wrap',
                            }}>

                  <View style={{backgroundColor: '#303030', borderRadius: 2, padding: 10, paddingRight: 20, paddingLeft: 20, marginRight: 10, marginBottom: 10}}>

                    <Text style={{fontFamily: 'Lato-Light', fontSize: 16, color: '#898989'}}>{filter.subcategory.name1}</Text>

                  </View>

                  <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={[filter.begin, filter.end]} style={{backgroundColor: '#303030', borderRadius: 2, padding: 10, paddingRight: 20, paddingLeft: 20, marginRight: 10, marginBottom: 10}}>

                    <Text style={{fontFamily: 'Lato-Light', fontSize: 16, color: '#fff'}}>{filter.subcategory.name2}</Text>

                  </LinearGradient>

                  <View style={{backgroundColor: '#303030', borderRadius: 2, padding: 10, paddingRight: 20, paddingLeft: 20, marginRight: 10, marginBottom: 10}}>

                    <Text style={{fontFamily: 'Lato-Light', fontSize: 16, color: '#898989'}}>{filter.subcategory.name3}</Text>

                  </View>

                  <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={[filter.begin, filter.end]} style={{backgroundColor: '#303030', borderRadius: 2, padding: 10, paddingRight: 20, paddingLeft: 20, marginRight: 10, marginBottom: 10}}>

                    <Text style={{fontFamily: 'Lato-Light', fontSize: 16, color: '#fff'}}>{filter.subcategory.name4}</Text>

                  </LinearGradient>

                  <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={[filter.begin, filter.end]} style={{backgroundColor: '#303030', borderRadius: 2, padding: 10, paddingRight: 20, paddingLeft: 20, marginRight: 10, marginBottom: 10}}>

                    <Text style={{fontFamily: 'Lato-Light', fontSize: 16, color: '#fff'}}>{filter.subcategory.name5}</Text>

                  </LinearGradient>

                </View>

              </View>

            ))
          }

          <View style={{height: 200}}/>

				</ScrollView>

        <LinearGradient
          colors={['#111111', '#111111', 'transparent']}
          locations={[0,0.2,1]}
          start={{x: 1, y: 1}} end={{x: 1, y: 0}}
          style={{position:'absolute', right:0, left:0, bottom: 0, height: 150}}>
        </LinearGradient>

        <View style={{position: 'absolute', bottom: responsiveHeight(17), right: responsiveWidth(9.9), width: 50, height: 50, borderRadius: 500, backgroundColor: '#272727'}}>
          <Transition appear='scale'>
            <Image style={{height: 30, width: 30, marginTop: 10, marginLeft: 10}} source = {require('../../assets/UI/refresh.png')}/>
          </Transition>
        </View>

        <YellowButton
          text='validate'
          onPress={()=> this.props.navigation.goBack()}
        />

      </View>
    )
  }


}
