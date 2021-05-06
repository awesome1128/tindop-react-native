import React, {Component} from 'react';
import {Alert, Platform, StyleSheet, Image, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity} from 'react-native';

import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from '../style/interestedinStyle';
import { sessionUpdateInterestInfo } from '../store/session/actions';
import I18n from '../i18n/index';
import YellowButton from '../components/yellowButton';
import LogoHeader from '../components/logoHeader';
import firebaseService from '../services/firebase';

const dbRef = firebaseService.database();

class Interestedin extends Component {

    constructor(props){
        super(props);
        this.state = {
            interestedPersonType: 0,
            description: '',
            userID: this.props.userID,
        }
    }

    onContinue(){

      if (this.state.description.length > 30) {

        const {interestedPersonType, description} = this.state;
        dbRef.ref('UsersList/' + this.state.userID).update({type: interestedPersonType, description: description});
        Actions.PostPictures({userID: this.state.userID, isFB: this.props.isFB});

      }else{

        Alert.alert(I18n.t('alertDescriptionTooShort'));

      }

    }

    render() {
        const interestPersonTypes = [{
            text: I18n.t('woman')
        }, {
            text: I18n.t('man')
        }, {
            text: I18n.t('both')
        }]

        return (
            <View style={styles.container}>

                <LogoHeader
                  onPress={()=> Actions.pop()}
                />

                <View style={styles.inputboxContainer}>
                    <Text style={styles.contactText}>{I18n.t('whoInterestedIn')}</Text>
                </View>

                <View style={styles.cateContainer}>

                  <TouchableOpacity style={this.state.interestedPersonType === 0 ? styles.womanBtn : styles.unselectedBtn} onPress = {() => {this.setState({interestedPersonType: 0})}}>
                    <Text style={[styles.cateText, this.state.interestedPersonType === 0 ? styles.selectedcatText : styles.normalcatText ]}>{I18n.t('woman')}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={this.state.interestedPersonType === 1 ? styles.manBtn : styles.unselectedBtn} onPress = {() => {this.setState({interestedPersonType: 1})}}>
                    <Text style={[styles.cateText, this.state.interestedPersonType === 1 ? styles.selectedcatText : styles.normalcatText ]}>{I18n.t('man')}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={this.state.interestedPersonType === 2 ? styles.bothBtn : styles.unselectedBtn} onPress = {() => {this.setState({interestedPersonType: 2})}}>
                    <Text style={[styles.cateText, this.state.interestedPersonType === 2 ? styles.selectedcatText : styles.normalcatText ]}>{I18n.t('both')}</Text>
                  </TouchableOpacity>

                </View>

                <View style={styles.optionContainer}>
                    <Text style={styles.optionText}>{I18n.t('editLater')}</Text>
                </View>

                <KeyboardAvoidingView behavior="padding" enabled style={styles.userDescriptionContainer}>

                    <TextInput
                        keyboardAppearance="dark"
                        returnKeyType="done"
                        blurOnSubmit={true}
                        multiline={true}
                        numberOfLines={4}
                        onChangeText={(description) => this.setState({description})}
                        value={this.state.description}
                        style={styles.userDescription}
                        placeholderTextColor = '#c6c6c6'
                        placeholder = {I18n.t('placeholderUserDescription')}
                    />

                </KeyboardAvoidingView>

                <View style={styles.textContainer}>
                    <Text style={styles.textItem}>{I18n.t('descriptionDetailsText')}</Text>
                </View>

                <YellowButton
                  text='next'
                  onPress={()=> this.onContinue()}
                />

            </View>
        );
    }
}

Interestedin.propTypes = {
    updateInterestInfo: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateInterestInfo: (type, description) => {
            dispatch(sessionUpdateInterestInfo(type, description));
        }
    }
}

export default connect(null, mapDispatchToProps)(Interestedin)
