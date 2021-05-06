import React, {Component} from 'react';
import {Image, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-carousel-view';

import styles from '../style/profileStyle';

export default class PersonDashboard extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerStyle: styles.personChatRoomHeaderStyle,
        };
    };

  render() {
    const {navigate} = this.props.navigation;
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.mainPart}>
                    <Carousel height={364.5}
                        indicatorSize={7.5}
                        indicatorColor="#FDDA39"
                        indicatorSpace = "10"
                        animate={false}
                        indicatorOffset = {10.5}
                    >
                        <View>
                            <Image source={require('../../assets/img/PersonDashBoard_Image.png')} style={styles.carouselImage}/>
                        </View>
                        <View>
                            <Image source={require('../../assets/img/PersonDashBoard_Image.png')} style={styles.carouselImage}/>
                        </View>
                        <View>
                            <Image source={require('../../assets/img/PersonDashBoard_Image.png')} style={styles.carouselImage}/>
                        </View>
                    </Carousel>
                    <View style={styles.profileContainer}>
                        <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems:'center'}}>
                            <Text style={styles.profileName}>Caroline S, 23 years</Text>
                            <View style={styles.newProfileBack}>
                                <Text style={styles.newProfileText}>New</Text>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                            <Text style={styles.likeCount}>79</Text>
                            <Image source={require('../../assets/UI/icons8-heart_filled.png')} style={styles.likeFilledImage} />
                        </View>
                    </View>
                    <View style={styles.interestContainer}>
                        <View style={styles.interestItems}>
                            <Text style={styles.interest}>Interests</Text>
                            <View style={styles.interestPart}>
                                <LinearGradient colors={ ["#E5204F", "#FF8539"]} style={styles.interestItem}>
                                    <Image source={require('../../assets/contact/icons8-paint_palette.png')} style={styles.interestItemIcon1} />
                                </LinearGradient>
                                <LinearGradient colors={ ["#5A00FF", "#3DD1C5"]} style={styles.interestItem}>
                                    <Image source={require('../../assets/contact/icons8-controller.png')} style={styles.interestItemIcon2} />
                                </LinearGradient>
                                <LinearGradient colors={ ["#EE80A3", "#F43B5E"]} style={styles.interestItem}>
                                    <Image source={require('../../assets/contact/icons8-novel.png')} style={styles.interestItemIcon3} />
                                </LinearGradient>
                            </View>
                        </View>
                    </View>
                    <View style={styles.hobbyContainer}>
                        <View style={styles.hobbyPart}>
                            <TouchableOpacity style={styles.hobbyItem}>
                                <Text style={styles.hobbyText}>Arts plastiques</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.hobbyItem}>
                                <Text style={styles.hobbyText}>GTA</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.hobbyItem}>
                                <Text style={styles.hobbyText}>Week-end</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.morebutton}>
                            <Text style={styles.morebuttonText}>+ Plus</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.bottomTextContainer}>
                    <Text style={styles.bottomText1}>1.8 km away from you.</Text>
                </View>
                <View style={styles.bottomTextContainer}>
                    <Text style={styles.bottomDescription}>Do you have the same interests as me?{"\n"}LET'S TALK!</Text>
                    <Text style={styles.bottomDescription}>If you do not, why not?</Text>
                </View>
            </ScrollView>
            <View style={styles.bottompart}>
                <TouchableOpacity style = {styles.iconBack} onPress={() => navigate('PersonChatRoom')}>
                    <Image source={require('../../assets/UI/icon8-backimage.png')} style={styles.prevImage} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <LinearGradient colors={ ["#FDC810", "#FDE256"]} style={styles.messageBack}>
                        <Image source={require('../../assets/UI/icons8-speech_bubble_with_dots_filled.png')} style={styles.messageImage} />
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.iconBack}>
                    <Image source={require('../../assets/UI/icon8-heart.png')} style={styles.likeImage} />
                </TouchableOpacity>
            </View>
        </View>
    );
  }
}
