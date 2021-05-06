import { StyleSheet, Dimensions } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a1a',
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
        marginTop: responsiveHeight(11.7),
        marginLeft: responsiveWidth(9.9),
        justifyContent: 'space-around',
        alignItems: 'flex-start',
    },
    textItem: {
        width: responsiveWidth(80.3), 
        height: responsiveHeight(7.5), 
        borderRadius: 5, 
        backgroundColor: "#303030",
        color: '#fff',
        paddingLeft: responsiveWidth(5.4),
        marginBottom: responsiveHeight(1.4),
    },
    lastTextItem: {
        width: responsiveWidth(80.3), 
        height: responsiveHeight(7.5), 
        borderRadius: 5, 
        backgroundColor: "#303030", 
        paddingLeft: responsiveWidth(5.4),
        marginBottom: 0
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