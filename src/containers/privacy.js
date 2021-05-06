import React, {Component} from 'react';
import {Platform, StyleSheet, Image, Text, ScrollView, View, SafeAreaView, TextInput, TouchableOpacity} from 'react-native';

import { Actions } from 'react-native-router-flux';
import I18n from '../i18n/index';
import LogoHeader from '../components/logoHeader';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

export default class Privacy extends Component {

    constructor(props){
        super(props);
        this.state = {
        }
    }

    render() {
        const {navigate} = this.props.navigation;
        return (

          <View style={{flex:1, backgroundColor: '#1a1a1a'}}>

          <LogoHeader
            onPress={()=> Actions.pop()}
            position='absolute'
          />

          <ScrollView style={{flex:1, backgroundColor: "#1a1a1a", padding: 20}}>

            <View style={{height:120}}/>

            <Text style={styles.title}>1. Responsible Company</Text>

            <Text style={styles.paragraph}>Tindop attaches great importance to the protection of
personal data, respect for privacy and the
security of its users.

We invite you to read this document carefully
to understand the processing of your personal data and
know your rights.

The privacy policy of Tindop SA applies to all
the services offered by Tindop SA (excluding services
provided and operated by third parties, in this case it is the policy
confidentiality of those third parties that applies and not the
present document).

The Tindop platform consists of Android and iOS applications
and a website. They share the same features and are similar in every way. The only notable difference is the adaptation of ergonomics to
internet browsers and the impossibility of adding photos
from the web application.</Text>

            <Text style={styles.title}>2. Necessary information collected</Text>

            <Text style={styles.paragraph}>Hereby, you agree that some of these data are visible
by the other members of the application and are thus rendered
on the application (public data).

By creating your profile on Tindop yourself, you agree
be solely responsible for the data transmitted to our
services.

We collect the following data for your registration
on Tindop SA:
Physical and moral person through our form
registration form or via Facebook Connect (see
Facebook). Tindop is a social meeting network
available all over the world. Your data is therefore
visible all over the world and you can change them at any
moment from your profile.

You agree that your data is stored and transmitted
to providers outside the European Union with the
respect imposed by the legislation. Those informations are:

1. Email address
2. Phone number
3. Gender / sex
4. Age / Date of birth
5. Photos / Images
6. Your interests (see list proposed on Tindop). Note
that Tindop reserves the right to change this list to any
moment according to the trends and needs for the good
functioning of our economic model.
7. Web address / URL
8. Activity / Business / Physical Address
9. Geolocation for individuals is approximate to ensure your safety at all times.

Nobody can know your exact location (including Tindop). You can deactivate your location from your profile whenever you want (and also reactivate it) but you are always visible to people near you with the "Tindop Chat". So you can accept or refuse the geolocation on Tindop safely. Tindop can not be held responsible if you transmit your
exact position to another user.

10. For geolocation of legal persons, your
position is indicated on the Tindop Map precisely because the
purpose is to allow you the acquisition of new customers by
through our services. So you agree to be geolocated
to indicate your exact position to Tindop users

We only ask for the information necessary to
creating your Tindop profile. If you refuse the transmission of these, your registration is impossible. In addition Tindop does
can be held responsible for identity theft through our
services but you can tell us the profile the case
applicable. Tindop can not be held responsible if another
user publishes partially or totally your
information shared with another member. You must and
you are responsible for your actions.

We use the information collected for the following purposes:
1. Contact
2. Information
3. Statistics
4. Application Management
5. Display to other users on the "Tindop card"
6. Correspondence / Notifications / Offer of Services
7. Advertising
8. Contests / Promotions
9. Any other need to improve the supply and
experience on the Tindop platform and never at the expense of
confidentiality and respect of users</Text>

            <Text style={styles.title}>2.1 Data from the chat room messaging service</Text>

            <Text style={styles.paragraph}>Messages, photos, videos, are stored on the servers
of Tindop SA only to guarantee the proper functioning
of our services and guarantee you a smooth exchange and very
high confidentiality. These are totally private.
Tindop SA, reserves the right to have a complete look at what is
shared across its platform to ensure everyone
compliance with the obligations of users of Tindop SA (see
general conditions of use). You agree that only the
staff of Tindop SA may have a say in your
exchanges to guarantee you the best experience
possible. Tindop's staff is kept secret and silent.
In the case of legal proceedings, Tindop SA reserves the right to
right to study the proper session of a transmission
information to the court if it so requests with the agreement of
the user concerned.</Text>

              <Text style={styles.title}>2.2 Data on Tindop search filters</Text>

              <Text style={styles.paragraph}>Tindop offers filters to refine your search you can turn them on or off at any time, they
are held in the same confidentiality as the rest of our
devices.</Text>

              <Text style={styles.title}>2.3 Data relating to payments via our service</Text>

              <Text style={styles.paragraph}>Tindop does not collect any banking data via our
payment services. The processing of these data is
stored via the Apple Store, Google PlayStore and Stripe.</Text>

              <Text style={styles.title}>3.1 Right of the user RGPD</Text>

              <Text style={styles.paragraph}>According to the new European directives on the protection
data, Tindop SA attaches great importance to
the data protection of its users in the union and in
outside. However to be completely transparent with our
users, zero risk does not exist. Tindop is committed to
everything possible to guard against an attack.

To ensure the security of your personal data, we
use the following measures:

1. SSL protocol, SET, authorized person access management and
concerned.
2. Network monitoring software.
3. Computer backup
4. Using SSL Certificates
5. Username / password
6. Firewall
7. Etc.

Tindop can not be held responsible if an attack
had to happen. If it happens, Tindop is committed to inform the user as fast as possible.</Text>

              <Text style={styles.title}>3.2 You can delete your Tindop account at any time</Text>

              <Text style={styles.paragraph}>From then on all your data will be deleted from our database
of data. If you have opted for a Tindop subscription
your rights on this one will be void and not recoverable.</Text>

              <Text style={styles.title}>3.3 Data changes via the Tindop application</Text>

              <Text style={styles.paragraph}>The user can also proceed on his own to
rectification of the data concerning him on the application via his
profile.</Text>

              <Text style={styles.title}>3.4 Right of access to data</Text>

              <Text style={styles.paragraph}>The user can at any time ask for the data collected on the app. Tindop reserves the right to charge users an amount to be defined according to his request addressed to info@tindop.com. Tindop will answer in the most promptly upon request after confirmation from the identity of the user.</Text>

              <Text style={styles.title}>3.5 Data retention</Text>

              <Text style={styles.paragraph}>Tindop keeps the data as long as the account is valid and active. If the account is not active for one year, Tindop will delete all the data it has on the user.</Text>

              <Text style={styles.title}>3.6 Log files and cookies</Text>

              <Text style={styles.paragraph}>We collect certain information through file log files and cookie cookies. It's about mainly the following information:

1. IP address.
2. Visited pages and queries.
3. Time and day of connection.
4. Approximate location (a random position close to
more or less one kilometer from your actual position).
The use of such files allows us:

1. Improved service and personalized welcome.
2. Personalized consumption profile.
3. Statistics / targeted advertising.
4. Getting in touch with other users.
4. Right entrusted to Tindop SA</Text>

            <Text style={styles.title}>4.1 You authorize Tindop to use your data to improve its services at all times</Text>

            <Text style={styles.paragraph}>You declare that you are at least 18 years old. If you use Tindop
and you are not 18, you confirm that you have received
the agreement of your legal representatives. You acknowledge being
totally sane and under no chemical influence.</Text>

            <Text style={styles.title}>4.2 Tindop can change its conditions at any time</Text>

            <Text style={styles.title}>5.1 You can contact Tindop at the following address: info@tindop.com
Tindop is a Swiss company and is headquartered in Geneva.</Text>

          </ScrollView>

          </View>

        );
    }
}

const styles = StyleSheet.create({

  title:{
    fontFamily: 'Lato-Regular',
    fontSize: responsiveFontSize(2.4),
    color: '#fff',
    marginBottom: 15
  },

    paragraph:{
      fontFamily: 'Lato-Regular',
      fontSize: responsiveFontSize(2.2),
      color: '#c6c6c6',
      marginBottom: 30
    }

});
