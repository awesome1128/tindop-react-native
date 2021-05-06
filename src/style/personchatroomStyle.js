import { StyleSheet, Dimensions } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import FastImage from 'react-native-fast-image';

const { height, width } = Dimensions.get('window');


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1a1a1a",
    },
    titleContainer: {
        marginTop: 12,
        justifyContent: "center",
        alignItems: "center",
    },
    chatInputBar: {
        marginHorizontal: 20,
        backgroundColor: '#303030',
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#e1e1e1',
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    textInputItem: {
        color: 'white',
        position: "absolute",
        fontSize: 17,
        width: responsiveWidth(68),
        height: 25,
        left: 45,
        top: 8,
        textAlign: "left"
    },
    cameraIcon: {
        position: "absolute",
        width: 30,
        height: 30,
        left: 4,
        top: 4
    },
    cameraBtn: {
        width: 50,
        height: 50
    },
    sendIcon: {
        position: "absolute",
        width: 20.5,
        height: 20.5,
        right: 19.5,
        top: 9
    },
    sendBtn: {
        width: 50,
        height: 50
    },
    personChatRoomUserText: {
        fontFamily: 'Lato-Regular',
        fontSize: 18,
        color: "#e1e1e1",
        textAlign: "center"
      },
    personChatRoomText: {
        fontFamily: 'Lato-Bold',
        fontSize: 12,
        color: "#898989",
        textAlign: "center",
    },
    personChatRoomMoreImage: {
        width: responsiveWidth(4.3),
        height: 4,
        marginRight: responsiveWidth(5.7),
        marginBottom: 5,
        marginTop: 15
    },
    personChatRoomTitleStyle: {
        color: '#1a1a1a'
    },
    personChatRoomHeaderStyle:  {
        backgroundColor: "#161616",
        borderBottomColor: "transparent",
        height: 125,
    },
    personChatRoomImage: {
        width: 66,
        height: 66,
        borderRadius: 50,
        borderColor: '#161616',
        borderWidth: 2
    },
    reportProfile: {
        backgroundColor: 'transparent',
        position: 'absolute',
        bottom: 0
    },

    reportProfileContent: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    profileBox: {
        width: responsiveWidth(94.7),
        opacity: 0.98,
        borderRadius: 13.5,
        backgroundColor: "#f9f9f9",
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 9.5
    },

    profileText: {
        fontFamily: "Helvetica",
        fontSize: 20,
        letterSpacing: 0.5,
        marginTop: 19,
        marginBottom: 19,
    },

    bordered: {
        borderBottomWidth: 1,
        borderBottomColor: '#DAD9DE',
        width: '100%',
        alignItems: 'center'
    },

    reportColor: {
        color: '#007aff'
    },

    submitColor: {
        color: '#898989'
    },


});

module.exports = styles;
