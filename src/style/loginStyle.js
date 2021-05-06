import { StyleSheet, Dimensions } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a1a',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        marginTop: responsiveHeight(5.4),
        justifyContent: 'center',
        alignItems: 'center'
    },
    selectLanguage: {
        position: 'absolute',
        top: responsiveHeight(6),
        right: responsiveWidth(5.2),
    },
    loginContainer:{
        marginTop: responsiveHeight(6),
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    loginSelect: {
        marginRight: responsiveWidth(11.6)
    },
    activeItem:{
        fontSize: 20,
        fontFamily: 'Lato-Regular',
        color: "#fdc810",
    },
    textItem: {
        fontFamily: 'Lato-Regular',
        fontSize: 15,
        color: "#898989"
    },
    formContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: responsiveHeight(8.8)
    },
    formElementContainer: {
        width: responsiveWidth(80.3),
        marginBottom: responsiveHeight(1.4)
    },
    // formElement: {
    //     width: responsiveWidth(80.3),
    //     height: responsiveHeight(7.5),
    //     borderRadius: 5,
    // },
    forgotPasswordContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginTop: responsiveHeight(1),
        marginBottom: responsiveHeight(4.5),
        width: responsiveWidth(80.3),
    },
    forgotPassword: {
        fontFamily: "Lato-Regular",
        fontSize: 12,
        color: "#898989",
        textDecorationLine: 'underline',
    },
    textInput: {
        backgroundColor: "#303030",
        color: '#fff',
        marginBottom: responsiveHeight(1.4),
        paddingLeft: responsiveWidth(9.9)
    },
    connectBut: {
        borderColor: '#898989',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    facebookBut: {
        marginTop: responsiveHeight(12.2),
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#474747'
    },
    buttonText: {
        fontFamily: "Lato-Regular",
        fontSize: 15,
        letterSpacing: 0,
        color: "#898989"
    },
    facebookIcon: {
        backgroundColor: 'transparent',
        marginRight: 0
    },
    facebookText: {
        marginLeft: 0,
        fontSize: 15,
        color: "#5b7fc9"
    },
    languageSelection: {
        position: 'absolute',
        bottom: 0,
        borderRadius: 1,
        backgroundColor: "#1e1e1e"
    },
    dialogContent: {
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      alignSelf: 'center',
      alignItems: 'center',
      paddingLeft: 0
    },
    crossIcon: {
        position: 'absolute',
        right: 0,
        top: 25
    },
    dialogTitle: {
        alignSelf: 'flex-start',
        fontFamily: "Lato-Regular",
        fontSize: 18,
        color: "#fff",
        marginTop: responsiveHeight(4),
        marginBottom: responsiveHeight(3)
    },
    languageItemContainer: {
        width: responsiveWidth(100),
        marginBottom: 13,
        paddingTop: 11,
        paddingBottom: 10.5,
        justifyContent: 'center'
    },
    languageItemSelected: {
        backgroundColor: "#303030",
    },
    languageItem: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        width: responsiveWidth(81)
    },
    languageText: {
        fontFamily: "Lato-Regular",
        fontSize: 15,
        color: "#c0c0c0",
        marginLeft: 16/720*height
    },
    dialogButtonBack: {
        width: responsiveWidth(81),
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5
    },
    dialogButtonText: {
        fontFamily: "Lato-Regular",
        fontSize: 15,
        color: "#3c3c3c"
    },
    dialogContainer: {
        marginTop: responsiveHeight(4),
        marginBottom: responsiveHeight(2)
    },

    cateBtnContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: responsiveHeight(6.5)
    },

    titleItem: {
        fontFamily: 'Lato-Regular',
        fontSize: 18,
        color: "#fff",
        alignSelf: 'flex-start'
    },

    textItemNotActive: {
        fontFamily: 'Lato-Regular',
        fontSize: 15,
        letterSpacing: 0,
        textAlign: 'center',
        color: '#898989'
    },

    textMidItem: {
        fontFamily: 'Lato-Regular',
        fontSize: 15,
        color: "#fff",
    },

    unselectedBtn: {
        width: 93,
        height: 44,
        borderRadius: 5,
        backgroundColor: "#303030",
        alignItems: 'center',
        justifyContent: 'center'
    },

    womanBtn: {
        width: 93,
        height: 44,
        borderRadius: 5,
        backgroundColor: "#f65890",
        alignItems: 'center',
        justifyContent: 'center'
    },

    manBtn: {
        width: 93,
        height: 44,
        borderRadius: 5,
        backgroundColor: "#2d72e4",
        alignItems: 'center',
        justifyContent: 'center'
    },

    companyBtn: {
        width: 93,
        height: 44,
        borderRadius: 5,
        backgroundColor: "#32c67b",
        alignItems: 'center',
        justifyContent: 'center'
    },

    formElement: {
        width: responsiveWidth(80.3),
        height: responsiveHeight(7.5),
        borderRadius: 5,
    },

    // textInput: {
    //     backgroundColor: "#303030",
    //     marginTop: height*1.7/100,
    //     paddingLeft: 19,
    //     textAlign: "left",
    //     color: "#c6c6c6"
    // },
    buttonText: {
        fontFamily: "Lato-Regular",
        fontSize: 15,
        lineHeight: 30,
        letterSpacing: 0,
        color: "#898989"
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
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    btnText: {
        fontFamily: 'Lato-Regular',
        fontSize: 15,
        color: "#3c3c3c",
        textAlign: "center"
    },
    signupButton: {
        position: 'absolute',
        bottom: responsiveHeight(5.6),
        alignSelf: 'center'
    }
});

module.exports = styles;
