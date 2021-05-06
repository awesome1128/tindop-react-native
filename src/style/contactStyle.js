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
    },

    logoImage: {
        width: 90,
        height: 68
    },

    inputboxContainer: {
        marginTop: responsiveHeight(3.7),
        justifyContent: 'center',
        alignItems: 'center'
    },

    contactText: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 250,
        color: '#fff',
        fontSize: 18,
        textAlign: "center",
        letterSpacing: 0,
    },

    contactsContainer: {
      flex: 0.75,
    },

    gridContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: responsiveHeight(2)
    },
    gridItem: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#303030',
        width: responsiveWidth(26.5),
        height: responsiveWidth(26.5),
        borderRadius: 5,
        marginRight: 9,
        marginTop: 9,
        borderColor: "#303030"
    },
    bordered: {
        borderWidth: 1,
        borderColor: '#fff'
    },
    formElement: {
        width: responsiveWidth(80.3),
        height: responsiveHeight(7.5),
        borderRadius: 5,
        marginLeft: responsiveWidth(9.9),
        marginRight: responsiveWidth(9.9),
    },
    gridItemText: {
        fontFamily: 'Lato-Regular',
        fontSize: 13.8,
        color: "#f9f9f9",
        textAlign: "center",
        marginTop: responsiveHeight(1.4),
    },
    gridItemImage: {
        width: 35,
        height: 40,
        backgroundColor: 'transparent'
    },
    dialogContainer: {
        position: 'absolute',
        bottom: 0,
        borderRadius: 1,
        backgroundColor: "#1e1e1e"
    },
    dialogTitle: {
        marginTop: responsiveHeight(4.5),
        fontFamily: "Lato-Regular",
        fontSize: 18,
        letterSpacing: 0,
        textAlign: "center",
        color: "#f0f0f0",
    },
    dialogContent: {
        marginTop: -1,
    },
    btnGroup: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        width: responsiveWidth(90.15),
        left: responsiveWidth(9.85),
        marginLeft: -20,
        marginTop: responsiveHeight(4.2),
    },
    btnGroupItem: {
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 22,
        paddingRight: 22,
        paddingTop: 11,
        paddingBottom: 11,
        marginRight: 9.5,
        marginBottom: responsiveHeight(1.3),
        backgroundColor: "#303030",
        borderRadius: 5,
    },
    detailedItemText: {
        fontFamily: "Lato-Regular",
        fontSize: 15,
        letterSpacing: 0,
        textAlign: "center",
    },
    detailedItemTextNormal: {
        color: "#fff"
    },
    detailedItemTextSelected: {
        color: "#898989"
    },
    dialogButton: {
        marginTop: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    dialogButtonText: {
        color: "#3c3c3c"
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
