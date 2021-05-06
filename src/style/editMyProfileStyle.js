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
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    contactContainer: {
        marginTop: responsiveHeight(3.9),
        marginBottom: 24.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contactText: {
        color: '#fff',
        fontSize: responsiveFontSize(2.2),
        fontFamily: 'Lato-Bold',
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
        borderRadius: 5,
        width: responsiveWidth(58.7),
        height: responsiveWidth(58.7)
    },
    pictureItem1Image: {
        width: "100%",
        height: "100%",
        borderRadius: 5,
    },
    pictureItemCrossBtn: {
        position: "absolute",
        backgroundColor: "#303030",
        borderRadius: 5,
        bottom: 7,
        right: 7
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
        backgroundColor: "#1D1D1D",
    },
    pictureItem2Image: {
        width: responsiveWidth(28.1),
        height: responsiveWidth(28.1),
        borderRadius: 5,
    },
    blankItem: {
        position: 'relative',
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
        width: responsiveWidth(28),
        height: responsiveWidth(28),
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
    },

    gridContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: responsiveWidth(2.5),
        left: responsiveWidth(8)
    },
    gridItem: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#303030',
        width: responsiveWidth(25.7),
        height: responsiveWidth(25.7),
        borderRadius: 5,
        marginLeft: responsiveWidth(2.5),
        borderColor: "#303030"
    },
    formElement: {
        width: responsiveWidth(80.3),
        height: responsiveHeight(7.5),
        borderRadius: 5,
        marginLeft: responsiveWidth(9.9),
        marginRight: responsiveWidth(9.9),
    },
    gridItem1Image: {
        width: responsiveWidth(8.4),
        height: responsiveWidth(8.4),
        backgroundColor: "#303030"
    },
    gridItem1Text: {
        fontFamily: 'Lato-Regular',
        fontSize: 13.8,
        color: "#f9f9f9",
        textAlign: "center",
        marginTop: responsiveHeight(1.4),
    },
    gridItem2Touchable: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderRadius: 5
    },
    gridItem2Image: {
        width: 34.5,
        height: 27,
        backgroundColor: 'transparent'
    },
    gridItem2Text: {
        fontFamily: 'Lato-Regular',
        fontSize: 13.8,
        color: "#f9f9f9",
        textAlign: "center",
        marginTop: responsiveHeight(1.7),
    },
    gridItem3Image: {
        width: 29.5,
        height: 27,
        backgroundColor: 'transparent'
    },
    gridItem3Text: {
        fontFamily: 'Lato-Regular',
        fontSize: 13.8,
        color: "#f9f9f9",
        textAlign: "center",
        marginTop: responsiveHeight(1.7),
    },
    gridItem5Image: {
        width: 31.5,
        height: 31.5,
        backgroundColor: "#303030"
    },
    gridItem5Text: {
        fontFamily: 'Lato-Regular',
        fontSize: 13.8,
        color: "#f9f9f9",
        textAlign: "center",
        marginTop: responsiveHeight(1.7)
    },
    gridItem6Image: {
        width: 31.5,
        height: 37.5,
        backgroundColor: "#303030"
    },
    gridItem6Text: {
        fontFamily: 'Lato-Regular',
        fontSize: 13.8,
        color: "#f9f9f9",
        textAlign: "center",
        marginTop: responsiveHeight(0.85)
    },
    gridItem7Image: {
        width: 34.5,
        height: 34,
        backgroundColor: 'transparent'
    },
    gridItem9Image: {
        width: 31,
        height: 34.5,
        backgroundColor: "transparent"
    },
    gridItem10Image: {
        width: 21.5,
        height: 38
    },
    gridItem10Text: {
        fontFamily: 'Lato-Regular',
        fontSize: 13.8,
        color: "#f9f9f9",
        textAlign: "center",
        marginTop: responsiveHeight(0.85)
    },
    gridItem11Image: {
        width: 31.5,
        height: 32,
    },
    gridItem11Text: {
        fontFamily: 'Lato-Regular',
        fontSize: 13.8,
        color: "#f9f9f9",
        textAlign: "center",
        marginTop: 18.5
    },
    interestedinContainer: {
        marginTop: 45,
        marginBottom: 18.5,
        justifyContent: "center",
        alignItems: "center"
    },

    cateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: responsiveHeight(3.2),
        marginLeft: 20,
        marginRight: 20
    },
    cateItem1: {
        width: responsiveWidth(28),
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#303030',
        borderRadius: 5,
    },
    cateItem2: {
        width: responsiveWidth(28),
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#303030',
        borderRadius: 5,
        marginLeft: responsiveWidth(2.8)
    },
    cateItem3: {
        width: responsiveWidth(28),
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#5048eb',
        borderRadius: 5,
        marginLeft: responsiveWidth(2.9)
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
    normalcatText: {
        color: "#898989",
    },
    selectedcatText: {
        color: "#fff",
    },

    cateText: {
        fontFamily: 'Lato-Regular',
        fontSize: 15,
        color: "#898989",
        textAlign: "center"
    },
    cateTextWhite: {
        fontFamily: 'Lato-Regular',
        fontSize: 15,
        color: "#fff",
        textAlign: "center"
    },
    aboutTextContainer: {
        marginLeft: 19.5,
        marginTop: 30.5,
        marginBottom: 14.5
    },
    textItem: {
        fontFamily: 'Lato-Regular',
        fontSize: 15,
        color: "#fff",
        textAlign: "left",

    },
    dummyContainer: {
        height: 70,
        backgroundColor: "#303030",
        justifyContent: "center",
        paddingLeft: 19.5
    },
    dummyText: {
        fontFamily: 'Lato-Regular',
        fontSize: 15,
        color: "#898989",
        textAlign: "left"
    },
    phoneTextContainer: {
        height: 50,
        backgroundColor: "#303030",
        justifyContent: "center",
        paddingLeft: 19.5
    },
    emailTextContainer: {
        height: 50,
        backgroundColor: "#303030",
        justifyContent: "center",
        paddingLeft: 19.5,
        marginBottom: 35.5
    },
    phoneText: {
        marginTop: 20.5,
        marginLeft: 20.5,
        marginBottom: 14.5
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
    dialogButton: {
        marginTop: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    dialogButtonText: {
        color: "#3c3c3c"
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

});

module.exports = styles;
