import { StyleSheet, Dimensions } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a1a'
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: responsiveHeight(4.5)
    },
    logoImage: {
        width: 90,
        height: 68
    },
    inputboxContainer: {
        marginTop: responsiveHeight(10.1),
        justifyContent: 'center',
        alignItems: 'center'
    },
    contactText: {
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        fontSize: 18,
        textAlign: "center",
        letterSpacing: 0,
    },
    cateContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: responsiveHeight(3.2),
    },

          unselectedBtn: {
              width: 93,
              height: 44,
              borderRadius: 5,
              marginRight: 6,
              marginLeft: 6,
              backgroundColor: "#303030",
              alignItems: 'center',
              justifyContent: 'center'
          },

          womanBtn: {
              width: 93,
              height: 44,
              borderRadius: 5,
              marginRight: 6,
              marginLeft: 6,
              backgroundColor: "#f65890",
              alignItems: 'center',
              justifyContent: 'center'
          },

          manBtn: {
              width: 93,
              height: 44,
              borderRadius: 5,
              marginRight: 6,
              marginLeft: 6,
              backgroundColor: "#2d72e4",
              alignItems: 'center',
              justifyContent: 'center'
          },

          bothBtn: {
              width: 93,
              height: 44,
              borderRadius: 5,
              marginRight: 6,
              marginLeft: 6,
              backgroundColor: "#32c67b",
              alignItems: 'center',
              justifyContent: 'center'
          },

    cateText: {
        fontFamily: 'Lato-Regular',
        fontSize: 13.8,
        textAlign: "center"
    },
    normalcatText: {
        color: "#898989",
    },
    selectedcatText: {
        color: "#fff",
    },
    optionContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: responsiveHeight(2.7)
    },
    optionText: {
        fontFamily: 'Lato-Regular',
        fontSize: 15,
        color: '#898989',
        textAlign: "center"
    },
    userDescriptionContainer: {
        width: responsiveWidth(100),
        height: responsiveHeight(16.9),
        backgroundColor: '#303030',
        marginTop: responsiveHeight(4),
        borderRadius: 1
    },

      userDescription: {
          fontFamily: 'Lato-Regular',
          fontSize: 15,
          color: '#c6c6c6',
          textAlign: 'left',
          marginLeft: responsiveWidth(5),
          marginRight: responsiveWidth(5),
          marginTop: responsiveHeight(2)
      },

    textContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20.5,
    },

    textItem: {
        fontFamily: 'Lato-Regular',
        fontSize: 15,
        textAlign: "center",
        color: "#E75C5C",
        width: responsiveWidth(60),
    },

    bottomContainer: {
        position: "absolute",
        alignItems: "center",
        left: responsiveWidth(9.9),
        bottom: responsiveHeight(5.6)
    },
    btnItem: {
        justifyContent: 'center',
        backgroundColor: '#262626',
        width: responsiveWidth(80.3),
        height: responsiveHeight(7.5),
        borderRadius: 5,
        borderColor: "#fce255",
    },
    btnLayout: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    btnText: {
        fontFamily: 'Lato-Regular',
        fontSize: 15,
        color: "#3c3c3c",
        textAlign: "center"
    }
});

module.exports = styles;
