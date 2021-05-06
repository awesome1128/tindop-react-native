import { StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a1a',
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: height*5.4/100,
    },
    loginContainer:{
        marginTop: height*6/100,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    cateContainer:{
        marginTop: height*7.5/100,
        marginLeft: width*9.9/100,
        marginRight: width*9.9/100,
    },
    cateBtnContainer: {
        marginTop: height*1.4/100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    phonenumContainer: {
        marginTop: height*5.5/100,
        marginLeft: width*9.9/100,
        marginRight: width*9.9/100,
    },
    bottomContainer: {
        position: "absolute",
        alignItems: "center", 
        left: width*9.9/100, 
        bottom: height*5.6/100
    },
    activeItem:{
        fontSize: 15,
        fontFamily: 'Lato-Regular',
        color: "#898989",
        marginRight: 43.5,
        letterSpacing: 0,
        opacity: 0.9,
    },
    textItem: {
        fontFamily: 'Lato-Regular',
        fontSize: 18,
        color: "#fdc810",
        textAlign: "center",
        letterSpacing: 0,
        fontWeight: "normal",
        opacity: 0.9,
        letterSpacing: 0,
    },
    titleItem: {
        fontFamily: 'Lato-Regular',
        fontSize: 18,
        color: "#fff",
        textAlign: "left",
    },
    textMidItem: {
        fontFamily: 'Lato-Regular',
        fontSize: 15,
        color: "#fff",
    },
    cateLeftRightBtn: {
        width: 93,
        height: 44,
        borderRadius: 5,
        backgroundColor: "#303030",
        alignItems: 'center',
        justifyContent: 'center'
    },
    cateMidBtn: {
        width: 93,
        height: 44,
        borderRadius: 5,
        backgroundColor: "#2d72e4",
        alignItems: 'center',
        justifyContent: 'center'
    },
    formElement: {
        width: 301,
        height: 50,
        borderRadius: 5,
    },
    forgotPassword: {
        fontFamily: "Lato-Regular",
        fontSize: 12,
        color: "#898989",
        alignSelf: 'flex-end',
        marginTop: 1,
        marginBottom: 30,
        textDecorationColor: '#47315a',
        
    },
    textInput: {
        backgroundColor: "#303030",
        marginTop: height*1.7/100,
        paddingLeft: 19,
        textAlign: "left",
        color: "#c6c6c6"
    },
    buttonText: {
        fontFamily: "Lato-Regular",
        fontSize: 15,
        lineHeight: 30,
        letterSpacing: 0,
        color: "#898989" 
    },
    btnItem: {
        width: 301, 
        height: 50, 
        borderRadius: 5
    },
    btnLayout: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        borderRadius: 5
    },
    btnText: {
        fontFamily: 'Lato-Regular', 
        fontSize: 15, color: "#3c3c3c", 
        textAlign: "center"
    }
});


module.exports = style;