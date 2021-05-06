import { StyleSheet, Dimensions, Platform } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#161616',
    },
    headerContainer: {
      height: 80,
      width: '100%',
      justifyContent: 'center'
    },
      imageContainer: {
        zIndex: 300,
        position: 'absolute',
        left: 20,
        top: 30
      },
        backImage: {
          width: 10,
          height: 19
        },
      headerText: {
          color: '#898989',
          fontSize: responsiveFontSize(2.4),
          textAlign: 'center'
      },
    logoContainer: {
        marginTop: responsiveHeight(5.6),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: responsiveHeight(4.4),
    },
    itemContainer: {
      flexDirection: 'row',
      justifyContent: "space-between",
      alignItems: "center",
      width: responsiveWidth(100),
      height: responsiveHeight(7.5),
      backgroundColor: "#202020",
    },
    itemTextContainer: {
      flexDirection: 'row',
      justifyContent: "center",
      alignItems: "center",
      width: responsiveWidth(100),
      height: responsiveHeight(7.5),
      backgroundColor: "#202020",
    },
    navigateHeader: {
      height: responsiveHeight(13.6),
      marginTop: 20,
      flexDirection: 'row'
    },
    textItem: {
      fontFamily: 'Lato-Regular',
      fontSize: responsiveFontSize(2.2),
      textAlign: 'left',
      color: "#fff",
      letterSpacing: 0,
      marginLeft: responsiveWidth(5.6)
    },
    optionText: {
      fontFamily: 'Lato-Regular',
      fontSize: responsiveFontSize(2.2),
      color: "#e7b73b",
      textAlign: 'center'
    },
    imgItem: {
      width: responsiveWidth(2.3),
      height: responsiveHeight(2.3),
      marginRight: responsiveWidth(6.8)
    },
    logoutBtnContainer: {
      marginTop: responsiveHeight(11.2),
      justifyContent: "center",
      alignItems: "center"
    },
    deleteBtnContainer: {
      justifyContent: "center",
      alignItems: "center"
    },
    btnText: {
      fontFamily: "Lato-Regular",
      fontSize: 15,
      textAlign: "center",
      color: "#fff",
      letterSpacing: 0
    },
    logoImg: {
      width: 90,
      height: 68
    },

});

module.exports = styles;
