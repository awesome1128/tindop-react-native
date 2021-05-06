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
    rubyContainer: {
        marginTop: 68.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoImage: {
        width: 90,
        height: 68
    },
    rubyImage: {
        zIndex: 200,
        width: 136.5,
        height: 121.5
    },
    smsText: {
        zIndex: 300,
        position: 'absolute',
        top: responsiveHeight(3.5),
        width: 250,
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        fontSize: 18,
        textAlign: "center",
        letterSpacing: 0,
    },
    smsContainer: {
        marginTop: responsiveHeight(6.2),
        justifyContent: 'center',
        alignItems: 'center',
    },
    formElement: {
        width: 301,
        height: 50,
        borderRadius: 5,
        marginLeft: responsiveWidth(9.9),
        marginRight: responsiveWidth(9.9),
    },
    textInput: {
        backgroundColor: "#303030",
        marginBottom: 8.5,
        paddingLeft: 19,
        textAlign: "left",
        color: "#c6c6c6"
    },
    reddotImage: {
        position: 'absolute',
        top: responsiveHeight(2.9),
        right: responsiveWidth(13.5),
        justifyContent: 'center',
        alignItems: 'center',
        width: 11.5,
        height: 11.5
    },
    codeText: {
        fontSize: 12,
        fontFamily: 'Lato-Regular',
        marginLeft: responsiveWidth(35.5),
        marginRight: responsiveWidth(3.5),
        letterSpacing: 0,
        opacity: 0.53,
        color: "#ff6666",
    },
    midContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: responsiveHeight(2.3)
    },
    okImage: {
        width: 15,
        height: 15,
        marginRight: responsiveWidth(30.3)
    },
    confirmText: {
        fontFamily: 'Lato-Regular',
        fontSize: 12,
        textAlign: 'center',
        letterSpacing: 0,
        color: '#898989',
        marginTop: 28.5,
        width: responsiveWidth(80.3)
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
