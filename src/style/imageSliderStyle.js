import { StyleSheet, Dimensions } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    borderWidth: 2,
    borderColor: '#CCC',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselContainer: {
    backgroundColor: "#1a1a1a",
    width: "100%",
    height: "100%"
  },
  imgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(13.4)
  },
    rubyImg: {
      width: responsiveHeight(30),
      height: responsiveHeight(30),
    },
  bottomTextContainer: {
    position: "absolute",
    top: responsiveHeight(84.5),
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center'
  },

    bottomText: {
      fontFamily: 'Lato-Regular',
      color: '#fff',
      fontSize: responsiveFontSize(2.1),
      width: responsiveWidth(80),
      textAlign: 'center',
    },

  btnContainer: {
    position: "absolute",
    top: responsiveHeight(63),
    left: responsiveWidth(9.9)
  },

  connectionBtnContainer: {
    justifyContent: 'center',
    backgroundColor: '#fff',
    width: responsiveWidth(80.3),
    height: 50,
    borderRadius: 5,
    borderColor: "#fce255"
  },
  connectionBtnLinearLayout: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    width: "100%",
    height: 50
  },
  connectionText: {
    fontFamily: 'Lato-Regular',
    fontSize: 15,
    color: "#3c3c3c",
    textAlign: "center"
  },
  accountBtnContainer: {
    justifyContent: 'center',
    width: responsiveWidth(80.3),
    height: 50,
    backgroundColor: "#1B1B1B",
    opacity: 0.5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#898989",
    marginTop: responsiveHeight(3.1)
  },
  accountText: {
    fontFamily: 'Lato-Regular',
    fontSize: 15,
    color: "#c6c6c6",
    textAlign: "center"
  },
});

module.exports = styles;
