import React, {Component} from 'react';
import {Platform, StyleSheet, Image, Text, View, SafeAreaView, TextInput, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Transition } from 'react-navigation-fluid-transitions';

import styles from '../style/chatPersonListStyle';
import LogoHeader from '../components/logoHeader';

export default class ChatPersonList extends Component {
    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={{flex: 1, backgroundColor: '#1a1a1a'}}>

                <LogoHeader
                  onPress={()=> this.props.navigation.goBack()}
                  text='Chat Room'
                />

                <View style = {{ marginLeft: 23.5, flexDirection: 'row', position: 'relative', bottom: -40, width: '100%'}}>

                    <TouchableOpacity onPress={()=> navigate('PersonChatRoom')}>
                        <Image source={require('../../assets/img/person01.png')} style={{width: 49, height: 49, marginRight: 15}}/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=> navigate('PersonChatRoom')}>
                        <Image source={require('../../assets/img/person02.png')} style={{width: 49, height: 49, shadowColor: "rgba(0, 0, 0, 0.4)", shadowOffset: { width: 9.5, height: 13.5 }, shadowRadius: 28.5, shadowOpacity: 1, marginRight: 15}}/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=> navigate('PersonChatRoom')}>
                        <Image source={require('../../assets/img/person03.png')} style={{width: 49, height: 49, shadowColor: "rgba(0, 0, 0, 0.4)", shadowOffset: { width: 9.5, height: 13.5 }, shadowRadius: 28.5, shadowOpacity: 1, marginRight: 15}}/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=> navigate('PersonChatRoom')}>
                        <Image source={require('../../assets/img/person04.png')} style={{width: 49, height: 49, marginRight: 15}}/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=> navigate('PersonChatRoom')}>
                        <Image source={require('../../assets/img/person05.png')} style={{width: 49, height: 49, shadowColor: "rgba(0, 0, 0, 0.4)", shadowOffset: { width: 9.5, height: 13.5 }, shadowRadius: 28.5, shadowOpacity: 1}}/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=> navigate('PersonChatRoom')}>
                        <Image source={require('../../assets/img/person06.png')} style={{width: 49, height: 49, shadowColor: "rgba(0, 0, 0, 0.4)", marginLeft: 20, shadowOffset: { width: 9.5, height: 13.5 }, shadowRadius: 28.5, shadowOpacity: 1}}/>
                    </TouchableOpacity>

                </View>

                <TouchableOpacity onPress={()=> navigate('PersonChatRoom')} rippleColor="yello">
                    <View style={styles.item1}>

                      <Transition shared="profilePicture">
                          <Image source={require('../../assets/img/listperson01.png')} style={{width: 49, height: 49, marginRight: 15}}/>
                      </Transition>

                        <View style={styles.nameView}>
                            <Text style={styles.head}>Leaia C, 20</Text>
                            <Text style={styles.sub}>
                                Lorem ipsum dolor sit amet conse
                                <Image source={require('../../assets/UI/icon_01.png')} style={{width: 14, height: 14}} name="icon"/>
                                <Image source={require('../../assets/UI/icon_02.png')} style={{width: 14, height: 14}} name="icon"/>
                            </Text>
                        </View>
                        <TouchableOpacity style={styles.icon} rippleColor="yello">
                            {/* <Image source={require('../../assets/images/person06.png')} style={{width: 24, height: 24}} name="icon"/> */}
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.icon} rippleColor="yello">
                            <Image source={require('../../assets/UI/2.png')} style={{width: 24, height: 24}} name="icon"/>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> navigate('PersonChatRoom')}>
                    <View style={styles.item}>
                        <Image source={require('../../assets/img/listperson02.png')} style={{width: 49, height: 49, marginRight: 15}}/>
                        <View style={styles.nameView}>
                            <Text style={styles.head}>Caroline M, 23</Text>
                            <Text style={styles.sub}>
                                Lorem ipsum dolor sit amet conse
                                <Image source={require('../../assets/UI/icon_03.png')} style={{width: 16, height: 7.5}} name="icon"/>
                            </Text>
                        </View>
                        <TouchableOpacity style={styles.icon} rippleColor="yello">
                            {/* <Image source={require('../../assets/images/9_00.png')} style={{width: 24, height: 24}} name="icon"/> */}
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.icon} rippleColor="yello">
                            <Image source={require('../../assets/UI/check.png')} style={{width: 12, height: 12}} name="icon"/>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> navigate('PersonChatRoom')}>
                    <View style={styles.item}>
                        <Image source={require('../../assets/img/listperson03.png')} style={{width: 49, height: 49, marginRight: 15}}/>
                        <View style={styles.nameView}>
                            <Text style={styles.head}>Julie P, 33</Text>
                            <Text style={styles.sub}>
                                Lorem ipsum dolor sit amet conse
                                <Image source={require('../../assets/UI/icon_04.png')} style={{width: 13, height: 11}} name="icon"/>
                            </Text>
                        </View>
                        <TouchableOpacity style={styles.icon} rippleColor="yello">
                            {/* <Image source={require('../../assets/images/9_00.png')} style={{width: 24, height: 24}} name="icon"/> */}
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.icon} rippleColor="yello">
                            <Image source={require('../../assets/UI/check.png')} style={{width: 12, height: 12}} name="icon"/>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> navigate('PersonChatRoom')}>
                    <View style={styles.item}>
                        <Image source={require('../../assets/img/listperson04.png')} style={{width: 49, height: 49, marginRight: 15}}/>
                        <View style={styles.nameView}>
                            <Text style={styles.head}>Barbara P, 34</Text>
                            <Text style={styles.sub}>Lorem ipsum dolor sit amet</Text>
                        </View>
                        <TouchableOpacity style={styles.icon} rippleColor="yello">
                            {/* <Image source={require('../../assets/images/9_00.png')} style={{width: 24, height: 24}} name="icon"/> */}
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.icon} rippleColor="yello">
                            <Image source={require('../../assets/UI/check.png')} style={{width: 12, height: 12}} name="icon"/>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>

            </View>
        );
    }
}
