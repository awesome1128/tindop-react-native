import { StyleSheet, Dimensions } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;

const styles = StyleSheet.create({

    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
    },

    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },

      logoImage: {
          marginTop: 10,
          width: responsiveWidth(24),
          height: responsiveWidth(18),
      },

    headerProfileContainer: {
        position: 'absolute',
        top: responsiveHeight(5),
        left: 20
    },

      profileIcon: {
          borderWidth: 1,
          borderColor: '#004eff',
          borderRadius: 17,
          width: 40,
          height: 40
      },

    topRightPart: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 43,
        right: 20
    },

      notification: {
          width: 31,
          height: 30
      },

        notificationDot: {
            width:6.5,
            height:6.5,
            backgroundColor: '#FDE256',
            borderRadius: 4,
            position: 'absolute',
            right: -5
        },

      sortingContainer: {
          width: 50,
          height: 50,
          opacity: 0.6,
          borderRadius: 25,
          backgroundColor: "#ffffff",
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 19.5
      },

        sortingIcon: {
            width: 18,
            height: 23
        },

      rubyContainer: {
          width: 50,
          height: 50,
          shadowColor: "rgba(0, 0, 0, 0.45)",
          shadowOffset: {
              width: 0.6,
              height: 0.8
          },
          shadowRadius: 13.5,
          shadowOpacity: 1,
          borderRadius: 25,
          marginTop: 15
      },

        gradientBg: {
            flex: 1,
            borderRadius: 25,
            alignItems: 'center',
            justifyContent: 'center'
        },

        rubyIcon: {
            width: 39,
            height: 34.3,
            marginTop: 3
        },

    profileIconContainer: {
        position: 'absolute',
        bottom: 144.5,
        left: 80.5,
        width: 167,
        height: 167,
        backgroundColor: 'rgba(215, 79, 110, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 90
    },

    goToChat: {
        position: 'absolute',
        bottom: responsiveHeight(27),
        right: 20,
        width: responsiveHeight(7),
        height: responsiveHeight(7),
        minWidth: 50,
        minHeight: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
    },

      chatIcon: {
        height: 25,
        width: 26,
      },

    takePictureFlux: {
        position: 'absolute',
        bottom: responsiveHeight(18),
        right: 20,
        width: responsiveHeight(7),
        height: responsiveHeight(7),
        minWidth: 50,
        minHeight: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
    },

      cameraIcon: {
          width: 25.5,
          height: 23
      },

    iconContainer1: {
        justifyContent: 'center',
        position: 'absolute',
        bottom: 149.5,
        right: 104
    },

    icon1: {
        width: 27.5,
        height: 27.5
    },

    centerPosition: {
        justifyContent: 'center',
        position: 'absolute',
        bottom: responsiveHeight(16),
        left: 20,
        width: 50,
        height: 50,
    },

      myPosition: {
          width: 27.5,
          height: 27.5
      },

    iconContainer2: {
        justifyContent: 'center',
        position: 'absolute',
        top: 260.5,
        right: 41.5
    },

    icon2: {
        width: 26.5,
        height: 25
    },

    iconContainer3: {
        justifyContent: 'center',
        position: 'absolute',
        top: 234,
        left: 48
    },

    smallicon: {
        width: 24,
        height: 24
    },

    iconContainer4: {
        justifyContent: 'center',
        position: 'absolute',
        top: 292,
        left: 105.5
    },

    iconContainer5:{
        justifyContent: 'center',
        position: 'absolute',
        top: 320.5,
        left: 17
    },

    iconText5: {
        fontFamily: "Lato-Regular",
        fontSize: 9,
        color: "#e5204f",
        marginBottom: 3.5
    },

    iconContainer6: {
        justifyContent: 'center',
        position: 'absolute',
        bottom: 302.5,
        left: 188.5
    },

    iconText6: {
        fontFamily: "Lato-Regular",
        fontSize: 9,
        color: "#e5204f",
        marginTop: 6
    },

    iconContainer7: {
        justifyContent: 'center',
        position: 'absolute',
        top: 262,
        left: 84
    },

    iconContainer8: {
        justifyContent: 'center',
        position: 'absolute',
        bottom: 198.5,
        left: 103
    },

    iconContainer9: {
        justifyContent: 'center',
        position: 'absolute',
        bottom: 216,
        right: 99.5
    },

    iconBg9: {
        borderRadius: 11,
        width: 20.5,
        height: 20.5,
        zIndex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    icon9: {
        width:6.5,
        height:6.5,
        backgroundColor: '#fff',
        borderRadius: 4
    },

    thumbnailContainer: {
        position: 'absolute',
        bottom: 24,
        width: '100%',
    },

      thumbnail: {
          borderRadius: 5,
          width: responsiveHeight(10.26),
          height: responsiveHeight(11),
          overflow: 'hidden'
      },

        firstImage: {
            marginLeft: 20
        },

        lastImage: {
            marginRight: 20,
        },

        notlast: {
            marginRight: 15
        },

    shadowed: {
        shadowColor: "rgba(0, 0, 0, 0.4)",
        shadowOffset: {
            width: 9.5,
            height: 13.5
        },
        shadowRadius: 28.5,
        shadowOpacity: 1
    },

    popupMessage: {
        backgroundColor: '#fff',
        width: 76.5,
        height: 25,
        position: 'absolute',
        right: 61.5,
        bottom: 250.5,
        borderRadius: 9,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingTop: 2
    },

    messageCount: {
        fontFamily: "Lato-Regular",
        fontSize: 15,
        color: "#3c3c3c"
    },

    messageIconContainer1: {
        borderRadius: 11,
        width: 20.5,
        height: 20.5,
        zIndex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 5,
        zIndex:1000
    },

    messageIcon1: {
        width:11.5,
        height:11.5,
        backgroundColor: '#fff',
        borderRadius: 6
    },

    messageIcon2: {
        width: 20.5,
        height: 20.5,
        marginLeft: -8.5,
        zIndex: 999
    },

    messageIcon3: {
        width: 20.5,
        height: 20.5,
        marginLeft: -8.5,
        marginRight: 5,
        zIndex: 998
    },

    triangleDown: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 9,
        borderRightWidth: 9,
        borderBottomWidth: 15,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#fff',
        transform: [
            {rotate: '180deg'}
        ],
        position: 'absolute',
        bottom: -15,
        left: 20
    },
    profileDialog: {
        backgroundColor: 'transparent',
        marginHorizontal: 25,
    },

    fluxPhotoDialog: {
        backgroundColor: 'transparent',
        margin: 40,
    },

    dialogContent: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonCircle: {
        width: 40,
        height: 40,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sliderImage: {
        width: 302.5,
        height: 297
    },

    sliderImage: {
        width: 302.5,
        height: 297
    },

    vipPart: {
        justifyContent: 'center',
        alignItems: 'center',
        zIndex:99999,
        minHeight: 50
    },

    vipIcon: {
        width: 38.5,
        height: 36.5
    },

    vipText: {
        textAlign: 'center',
        fontFamily: "Lato",
        fontSize: 18,
        color: "#fdda39",
        marginTop: responsiveHeight(1)
    },

    detailsPart: {
        alignItems: 'flex-end',
        width: responsiveWidth(85.1),
        marginTop: -10
    },

    mainPartContaier: {
        flexDirection: 'row',
        justifyContent: 'center'
    },

    mainPart: {
        width: responsiveWidth(85.1),
        paddingTop: 8,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },

    leftpart: {
        right: responsiveWidth(2.8)
    },

    rightpart: {
        left: responsiveWidth(2.8)
    },

    profileContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        width: 302,
        alignSelf: 'center'
    },

    profileName: {
        fontFamily: "Lato-Bold",
        fontSize: 18,
        color: "#414141"
    },

    carouselImage: {
        width: 302.5,
        height: 297
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

    likeCount: {
        fontFamily: "Lato-Regular",
        fontSize: 15,
        color: "#3c3c3c",
        marginRight: 6
    },

    interestContainer: {
        width: 302,
        alignSelf: 'center'
    },

    interest: {
        fontFamily: "Lato",
        fontSize: 14,
        color: "#3c3c3c",
        marginBottom: responsiveHeight(0.7)
    },

    interestPart: {
        flexDirection: 'row',
    },

    interestItems: {
        width: 302,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
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

    morebutton: {
        width: 58,
        height: 33.5,
        borderRadius: 5,
        backgroundColor: 'rgba(244, 59, 94, 0.12)',
        justifyContent: 'center',
        alignItems: 'center'
    },

    morebuttonText: {
        fontFamily: "Lato-Regular",
        fontSize: 13,
        color: "#f43b5e"
    },

    bottompart: {
        justifyContent: 'center',
        flexDirection: 'row',
    },

    distanceText: {
        fontFamily: "Lato",
        fontSize: 17,
        letterSpacing: 0.43,
        color: "#fde256",
        alignSelf: 'center',
        marginTop: responsiveHeight(2.9),
        marginBottom: responsiveHeight(4.9)
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

    prevImage: {
        width: 23.5,
        height: 21
    },

    likeImage: {
        width: 120,
        height: 120
    },

    likeFilledImage: {
        width: 23,
        height: 20.5
    },

    iconthreedots: {
        width: 21,
        height: 5,
        marginBottom: responsiveHeight(1.9)
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

    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    popupMessage: {
        backgroundColor: '#fff',
        width: 76.5,
        height: 25,
        position: 'absolute',
        right: 61.5,
        bottom: 250.5,
        borderRadius: 9,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingTop: 2
    },

    triangleDown: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 9,
        borderRightWidth: 9,
        borderBottomWidth: 15,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#fff',
        transform: [
            {rotate: '180deg'}
        ],
        position: 'absolute',
        bottom: -15,
        left: 20
    },

    dialogContainer: {
        position: 'absolute',
        bottom: 0,
        borderRadius: 1,
        backgroundColor: "#fff",
        overflow: 'visible'
    },

    dialogButton: {
        height: 50,
        width: 269,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: "#3c3c3c",

    },
    dialogButtonText: {
        color: "#3c3c3c"
    },

    personDetailContent: {
        alignItems: 'center'
    },

    personImage: {
      alignSelf: 'center',
        width: 332.5,
        height: 416.5,
        borderRadius: 5,
    },

    personSmallImage: {
        width: 27,
        height: 27,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#f00'
    },

    namePart: {
        marginTop: responsiveHeight(3),
        marginBottom: responsiveHeight(2.1),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    personName: {
        fontFamily: "Lato-Regular",
        fontSize: 18,
        textAlign: "left",
        color: "#f9f9f9",
        marginLeft: responsiveWidth(4),
        textDecorationLine: 'underline'
    },

    distance: {
        fontFamily: "Lato-Regular",
        fontSize: 13,
        textAlign: "left",
        color: "#ffe27b",
        marginBottom: responsiveHeight(3.9)
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
        height: 25
    },

    slider: {
        marginTop: 15,
        overflow: 'visible' // for custom animations
    },
    sliderContentContainer: {
        paddingVertical: 10 // for custom animation
    },
    paginationContainer: {
        position: 'absolute',
        bottom: 110,
        alignSelf: 'center',
    },
    paginationDot: {
        width: 7,
        height: 7,
        marginLeft: -5,
        borderRadius: 4
    },

    slideInnerContainer: {
        backgroundColor: '#fff',
        width: responsiveWidth(85.1),
        height: 411.5,
        padding: 8,
        borderRadius: 5
    },
    shadow: {
        position: 'absolute',
        top: 0,
        left: responsiveWidth(2),
        right: responsiveWidth(2),
        bottom: 18,
        shadowColor: '#1a1917',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 10,
        borderRadius: 5
    },
    imageContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 5
    },
    slideimage: {
        resizeMode: 'cover',
        borderRadius: 5
    },
    // image's border radius is buggy on iOS; let's hack it!
    radiusMask: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 8,
        backgroundColor: 'white'
    },
    personChatRoomHeaderStyle:  {
        backgroundColor: "#161616",
        borderBottomColor: "transparent",
        height: 125,
    },
    container: {
        flex: 1,
      },
      scrollView: {
        position: "absolute",
        bottom: 30,
        left: 0,
        right: 0,
        paddingVertical: 10,
      },
      endPadding: {
        paddingRight: width - CARD_WIDTH,
      },
      card: {
        padding: 10,
        elevation: 2,
        backgroundColor: "#FFF",
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { x: 2, y: -2 },
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        overflow: "hidden",
      },
      cardImage: {
        flex: 3,
        width: "100%",
        height: "100%",
        alignSelf: "center",
      },
      textContent: {
        flex: 1,
      },
      cardtitle: {
        fontSize: 12,
        marginTop: 5,
        fontWeight: "bold",
      },
      cardDescription: {
        fontSize: 12,
        color: "#444",
      },
      markerWrap: {
        alignItems: "center",
        justifyContent: "center",
      },
      marker: {
        width: 16,
        height: 16,
        borderRadius: 4,
        backgroundColor: "rgba(130,4,150, 0.9)",
      },
      ring: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: "rgba(130,4,150, 0.3)",
        position: "absolute",
        borderWidth: 1,
        borderColor: "rgba(130,4,150, 0.5)",
      },
      myClusterStyle:{
        width: 30,
        height: 30,
        borderRadius: 15
      },
      myClusterTextStyle:{
        color: 'yellow'
      }
});

module.exports = styles;
