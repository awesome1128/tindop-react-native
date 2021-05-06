import { StyleSheet, Dimensions } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    logoContainer: {
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
    inputboxContainer: {
        marginTop: 67.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomContainer: {
        marginTop: 78,
        marginLeft: 37,
        marginRight: 37,
        marginBottom: 37.5
    },
    item1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginTop: 70
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginTop: 15
    },
    nameView: {
        flex: 1,
        paddingHorizontal: 8,
        justifyContent: 'center'
    },
    head: {
        fontSize: 16,
        color: 'white',
        textAlign: 'left'
    },
    sub: {
        width: 240,
        fontSize: 12,
        color: 'grey',
        paddingTop: 4
    },
    icon: {
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
});
 
module.exports = styles;