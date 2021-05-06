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
        marginTop: responsiveHeight(9.3),
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleContainer: {
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
    pictureContainer: {
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        marginTop: responsiveHeight(3.9)
    },
    pictureItem1: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#303030",
        borderRadius: 5,
        width: responsiveWidth(52.7),
        height: responsiveWidth(52.7)
    },
    pictureItem1Image: {
        width: "100%",
        height: "100%"
    },
    pictureItemCrossBtn: {
        position: "absolute",
        backgroundColor: "#303030",
        borderRadius: 5,
        bottom: 8,
        right: 8
    },
    crossBtn: {
        width: responsiveWidth(5.5),
        height: responsiveWidth(5.5)
    },
    pictureItem2Container: {
        marginLeft: responsiveWidth(2.4)
    },
    pictureItem2: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1D1D1D"
    },
    pictureItem2Image: {
        width: responsiveWidth(25.3),
        height: responsiveWidth(25.3)
    },
    blankItem: {
        borderColor: "#3B3B3B",
        borderRadius: 5,
        borderWidth: 1,
    },
    blankItemDuration: {
        marginLeft: responsiveWidth(2.4)
    },
    blankItemTopDuration: {
        marginTop: responsiveHeight(1.3)
    },
    blankBox: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1D1D1D',
        width: responsiveWidth(25),
        height: responsiveWidth(25),
        borderRadius: 5
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
