import React, {Component} from 'react';
import {Platform, StyleSheet, Image, Text, View, SafeAreaView, TextInput, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default class LogoHeader extends Component {

  renderTitle(){

    if (typeof(this.props.text) === 'string') {

      return (
        <Text style={{
                fontFamily: 'Lato-Regular',
                fontSize: 18,
                color: "#898989",
                textAlign: "center",
                marginTop: this.props.displayLogo == false ? 0 : 3
              }}
        >
                {this.props.text}
        </Text>
      );

    } else {

      return (
        <View>
          {this.props.text}
        </View>
      );

    }

  }

  render () {

    const logoWidth = this.props.logoSize == 'big' ? 113 : 90;
    const logoHeight = this.props.logoSize == 'big' ? 85.5 : 68;
    const displayLogo = this.props.displayLogo == false ? <Image source={require('../../assets/main/logo.png')} style={{marginTop: 10, width: 0, height: 0}}/> : <Image source={require('../../assets/main/logo.png')} style={{marginTop: 10, width: logoWidth, height: logoHeight}}/>;

    const position = this.props.position || 'relative';
    const displayGradient = this.props.displayGradient == false ? false : true;

    return (

        <View style={{position: position, zIndex: 300, right:0, left:0, top: 0, height: 100, marginBottom: 20}}>

        {displayGradient &&

          <LinearGradient
            colors={['#111111', '#111111', 'transparent']}
            locations={[0,0.2,1]}
            style={{position:'absolute', right:0, left:0, top: 0, height: 150}}>
          </LinearGradient>

        }

          <SafeAreaView style={{position:'absolute', zIndex: 300, right:0, left:0, top: 0, paddingTop: 30, flexDirection: 'row', justifyContent: "center"}}>

              <View style={{justifyContent: "center", alignItems: "center"}}>

                {displayLogo}

                {this.renderTitle()}

              </View>

          </SafeAreaView>

          <SafeAreaView
            style={{zIndex: 301, position: 'absolute', left: 20, top: 30}}
          >
            <TouchableOpacity
              onPress={()=> this.props.onPress()}
              hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
            >
                <Image source={require('../../assets/UI/icons8-back-arrow.png')} style={{width: 10, height: 19, marginTop: 15}}/>
            </TouchableOpacity>
          </SafeAreaView>

          <SafeAreaView style={{zIndex: 301, position: 'absolute', right: 20, top: 30}}>
            {this.props.rightContent}
          </SafeAreaView>

        </View>

    )

  }

}
