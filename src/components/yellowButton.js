import React, {Component} from 'react';
import {Platform, StyleSheet, Image, Text, View, TextInput, TouchableOpacity} from 'react-native';

import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
import I18n from '../i18n/index';
import { Transition } from 'react-navigation-fluid-transitions';

export default class YellowButton extends Component {

  constructor(props){

    super(props);

  }

  render () {

    return (

      <Transition appear='horizontal'>

        <View
          style={{
                  position: "absolute",
                  alignItems: "center",
                  left: responsiveWidth(9.9),
                  bottom: responsiveHeight(5.6)
                }}
        >

            <TouchableOpacity
              style={{
                justifyContent: 'center',
                backgroundColor: '#262626',
                width: responsiveWidth(80.3),
                height: responsiveHeight(7.5),
                borderRadius: 5,
                borderColor: "#fce255"
              }}
              onPress={() => this.props.onPress()}
            >

                <LinearGradient
                  colors={ ["#FDC810", "#FDE256"]}
                  start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                  style={{flex: 1, borderRadius: 5, alignItems: 'center', justifyContent: 'center'}}
                >
                    <Text style={{fontFamily: 'Lato-Regular', fontSize: 15, color: "#3c3c3c", textAlign: "center"}}>{I18n.t(this.props.text).toUpperCase()}</Text>
                </LinearGradient>

            </TouchableOpacity>

            {this.props.alternative &&

              <TouchableOpacity
                onPress={()=> this.props.alternativeAction()}
              >

                <Text style={{color: '#898989', fontFamily:'Lato-Regular', fontSize: 15, marginTop: responsiveHeight(4), marginBottom: responsiveHeight(4)}}>{I18n.t(this.props.alternativeText)}</Text>

              </TouchableOpacity>

            }

        </View>

      </Transition>

    )

  }

}
