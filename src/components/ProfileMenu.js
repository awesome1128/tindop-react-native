import React, {Component} from 'react';
import {Platform, StyleSheet, Image, Text, View, SafeAreaView, TextInput, TouchableOpacity} from 'react-native';
import Lightbox from 'react-native-lightbox';

import LinearGradient from 'react-native-linear-gradient';
// import LottieView from 'lottie-react-native';

export default class ProfileMenu extends Component {

  likeProfile() {
    this.props.onPressLike();
  }

  render() {

    const position = this.props.position == 'stickyBottom' ? styles.stickyBottom : styles.polaroidMode;

    return (

      <View style={position}>

          <TouchableOpacity
            style = {{
              width: 57,
              height: 58.5,
              borderRadius: 28.5,
              backgroundColor: 'rgba(255,255,255,0.7)',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 30,
              marginLeft: 30
            }}
            onPress={() => this.props.onPressBack()}
          >
              <Image source={require('../../assets/UI/icon8-backimage.png')} style={{width: 23.5, height: 21}} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.onPressChat()}
          >
              <LinearGradient
                colors={ ["#FDC810", "#FDE256"]}
                style={{
                  width: 115.5,
                  height: 58.5,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 29.3,
                  shadowColor: "rgba(0, 0, 0, 0.24)",
                  shadowOffset: { width: 9.5, height: 13.5 },
                  shadowRadius: 28.5,
                  shadowOpacity: 1
                }}
              >
                  <Image
                    source={require('../../assets/UI/icons8-speech_bubble_with_dots_filled.png')}
                    style={{
                          width: 33,
                          height: 31,
                          shadowColor: "rgba(0, 0, 0, 0.24)",
                          shadowOffset: {
                              width: 1.1,
                              height: 1.6
                          },
                          shadowRadius: 4.5,
                          shadowOpacity: 0.4
                    }}
                  />
              </LinearGradient>
          </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.likeProfile()}
                style={{
                  width: 57,
                  height: 58.5,
                  borderRadius: 28.5,
                  backgroundColor: this.props.displayHeart !== false ? 'rgba(255,255,255,0.7)' : 'transparent',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 30,
                  marginLeft: 30
                }}
              >
              {
                this.props.displayHeart !== false &&
                  <Image source={require('../../assets/UI/icon8-heart.png')} style={{width: 22, height: 20}} />
              }
              </TouchableOpacity>

      </View>

    )

  }

}

const styles = StyleSheet.create({

  stickyBottom: {
    justifyContent: 'center',
    alignSelf: "center",
    flexDirection: 'row',
    position: 'absolute',
    bottom: 38,
    elevation: 8,
  },

  polaroidMode: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  }

});
