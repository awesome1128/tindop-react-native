import { StyleSheet, Dimensions } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';


const styles = StyleSheet.create({    
  // PersonChatRoom_SendMessage
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  personSendMessageImage: {
    width: responsiveWidth(17.3),
    height: responsiveWidth(17.3),
  },
  personSendMessageBigText: {
    fontFamily: 'Lato-Regular', 
    fontSize: 15, 
    color: "#ffffff", 
    textAlign: "center"
  },
  personSendMessageSmallText: {
    fontFamily: 'Lato-Regular', 
    fontSize: 12, 
    color: "#898989", 
    textAlign: "center"
  },
  personSendMessageMoreImage: {
    width: responsiveWidth(4.3),
    height: 4,
    marginRight: responsiveWidth(5.7)
  },
  personcSendMessageHeaderStyle:  {
    backgroundColor: "#161616",
    borderBottomColor: "transparent",
    height: 125
  },
  personcSendMessageHeaderTitleStyle: {
    color: '#fff'
  },
  
});

module.exports = styles;
