import { StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({

    mainContainer:{
      backgroundColor: "#1A1A1A",
      alignItems: 'center',
      minHeight: '100%',
    },

    container: {
        backgroundColor: "#1A1A1A",
        alignItems: 'center',
        minHeight: '100%',
        paddingBottom: 80,
    },

    sliderImage: {
        width: 302.5,
        height: 297,
    },

    profileContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: responsiveHeight(2.9),
        width: responsiveWidth(91),
        alignSelf: 'center'
    },

    profileName: {
        fontFamily: "Lato-Bold",
        fontSize: 18,
        color: "#fff"
    },

    carouselImage: {
        width: '100%',
        height: 364.5
    },

    newProfileBack: {
        width: 35,
        height: 16,
        borderRadius: 5,
        backgroundColor: "#e5204f",
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10.5
    },

    newProfileText: {
        fontFamily: "Lato-Regular",
        fontSize: 12.3,
        color: "#ffffff"
    },

    vipPart: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'baseline'
    },

    vipText: {
        fontFamily: "Lato-Regular",
        fontSize: 15.3,
        color: "#fdda39",
        marginRight: 9
    },

    vipIcon: {
        width: 19,
        height: 18
    },

    likeCount: {
        fontFamily: "Lato-Regular",
        fontSize: 15,
        color: "#fff",
        marginRight: 6
    },

    interestContainer: {
        alignSelf: 'center',
        flexDirection: 'row',
        width: responsiveWidth(91),
        justifyContent: 'space-between',
        alignItems: 'center',
    },

      interest: {
          fontFamily: "Lato",
          fontSize: 15,
          color: "#fff",
          marginTop: responsiveHeight(0.3),
          marginBottom: responsiveHeight(0.8)
      },

    interestPart: {
        flexDirection: 'row',
    },

    interestItems: {
        alignSelf: 'center',
        marginBottom: 14
    },

    interestItem: {
        width: 34,
        height: 33.5,
        borderRadius: 5,
        zIndex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 4.5
    },

      interestItemIcon: {
          width: 19,
          height: 19
      },

    hobbyContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: responsiveWidth(91),
        alignSelf: 'center',
    },

    hobbyPart: {
        flexDirection: 'row',
    },

    hobbyItem: {
        padding: 9,
        borderWidth: 1,
        borderColor: '#565656',
        borderRadius: 5,
        marginRight: 4
    },

    hobbyText: {
        fontFamily: "Lato-Bold",
        fontSize: 15,
        color: "#898989"
    },

    morebutton: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    morebuttonText: {
        fontFamily: "Lato-Regular",
        fontSize: 15,
        color: "#c6c6c6"
    },

    bottompart: {
        justifyContent: 'center',
        alignSelf: "center",
        flexDirection: 'row',
        position: 'absolute',
        bottom: 38,
        elevation: 8
    },

    iconBack: {
        width: 57,
        height: 58.5,
        borderRadius: 28.5,
        backgroundColor: 'rgba(255,255,255,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 30,
        marginLeft: 30
    },

    bottomTextContainer: {
        width: responsiveWidth(91),
        alignSelf: 'center'
    },

    userDistance: {
        fontFamily: "Lato-Regular",
        fontSize: 15,
        letterSpacing: 0.43,
        color: "#fde256",
        marginTop: responsiveHeight(1.5),
        marginBottom: responsiveHeight(1.5)
    },

    bottomDescription: {
        fontFamily: "Lato-Bold",
        fontSize: 15,
        lineHeight: 20,
        color: "#e9e9e9",
        marginBottom: responsiveHeight(3.5)
    },

    messageBack: {
        width: 115.5,
        height: 58.5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 29.3,
        shadowColor: "rgba(0, 0, 0, 0.24)",
        shadowOffset: { width: 9.5, height: 13.5 },
        shadowRadius: 28.5,
        shadowOpacity: 1
    },

    messageImage: {
        width: 26,
        height: 25,
        shadowColor: "rgba(0, 0, 0, 0.24)",
        shadowOffset: {
            width: 1.1,
            height: 1.6
        },
        shadowRadius: 4.5,
        shadowOpacity: 1
    },

    photosContainer: {
        width: responsiveWidth(91),
    },

    photoItems: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    photoItem: {
        width: responsiveWidth(29.5),
        height: responsiveWidth(29.5),
    },

    abuseButton: {
        fontFamily: "Lato",
        fontSize: 12,
        color: "#e5204f",
        marginTop: responsiveHeight(6.6),
        marginBottom: responsiveHeight(6.3),
        textDecorationLine: 'underline'
    },

    prevImage: {
        width: 23.5,
        height: 21
    },

    likeImage: {
        width: 120,
        height: 120
    },

    likeFilledImage: {
        width: 23.5,
        height: 20
    },
    personChatRoomHeaderStyle:  {
        backgroundColor: "#161616",
        borderBottomColor: "transparent",
        height: 125,
    },

    dialogContainer: {
        position: 'absolute',
        bottom: 0,
        borderRadius: 1,
        backgroundColor: "#1e1e1e"
    },

});

module.exports = styles;
