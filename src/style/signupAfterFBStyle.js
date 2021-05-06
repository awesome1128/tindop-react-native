import { StyleSheet, Dimensions } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a1a',
    },
    cateBtnContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
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

    textItemNotActive: {
        fontFamily: 'Lato-Regular',
        fontSize: 15,
        letterSpacing: 0,
        textAlign: 'center',
        color: '#898989'
    },

    formElementContainer: {
        marginTop: responsiveHeight(3.7),
        marginLeft: responsiveWidth(9.9),
        width: responsiveWidth(80.3),
        marginBottom: responsiveHeight(1.4)
    },

    titleItem: {
        fontFamily: 'Lato-Regular',
        fontSize: 18,
        color: "#fff",
        alignSelf: 'flex-start'
    },

    formElement: {
        width: responsiveWidth(80.3),
        height: responsiveHeight(7.5),
        marginLeft: responsiveWidth(9.9),
        borderRadius: 5,
    },

    textMidItem: {
        fontFamily: 'Lato-Regular',
        fontSize: 15,
        color: "#fff",
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

    inputboxContainer: {
        marginLeft: responsiveWidth(9.9),
        justifyContent: 'space-around',
        alignItems: 'flex-start',
    },

    confirmText: {
        fontFamily: 'Lato-Regular',
        fontSize: 12,
        textAlign: 'center',
        letterSpacing: 0,
        color: '#898989',
        marginTop: 28.5,
        width: responsiveWidth(80),
        marginRight: responsiveWidth(10),
        marginLeft: responsiveWidth(10),
    },
});

module.exports = styles;
