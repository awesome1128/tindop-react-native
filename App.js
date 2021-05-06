import React from 'react'
import { AppRegistry } from "react-native"
import { Router, Scene, ActionConst, Actions } from 'react-native-router-flux';
import { connect, Provider } from 'react-redux';
import OneSignal from 'react-native-onesignal';
import { createRootStore } from './src/store'
import SplashScreen from 'react-native-splash-screen';

import ImageSlider from './src/containers/ImageSlider';
import Login from './src/containers/Login';
import ForgotPassword from './src/containers/ForgotPassword';
import SMSSubscription from './src/containers/SMSSubscription';
import SMSSubscription2 from './src/containers/SMSSubscription2';
import SignupAfterSMS from './src/containers/SignupAfterSMS';
import SignupAfterFB from './src/containers/SignupAfterFB';
import Contact from './src/containers/Contact';
import Interestedin from './src/containers/Interestedin';
import PostPictures from './src/containers/PostPictures';
import Dashboard from './src/containers/Dashboard';
import ChatRoom from './src/containers/ChatRoom';
import Settings from './src/containers/Settings';
import Splash from './src/containers/Splash';
import EditMyProfile from './src/containers/EditMyProfile';
import Profile from './src/containers/Profile';
import ChatPersonList from './src/containers/ChatPersonList';
import PersonChatRoom from './src/containers/PersonChatRoom';
import PersonDashboard from './src/containers/PersonDashboard';
import Privacy from './src/containers/privacy';
import Filters from './src/containers/Filters';
import Shop from './src/containers/Shop';
import DiamondPayment from './src/containers/DiamondPayment';

// Hide warnings
console.disableYellowBox = true;

const store = createRootStore()
const RouterWithRedux = connect()(Router);

class App extends React.Component{

  componentWillMount() {
    OneSignal.init("58ec7dc1-141a-48ee-86b8-2f59ef62509f", {kOSSettingsKeyAutoPrompt : true});
    OneSignal.configure();

    OneSignal.addEventListener('ids', this.onIds);
    OneSignal.inFocusDisplaying(2);

    SplashScreen.hide();
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onIds(device) {
    window.Token = device.userId;
  }

  render(){
    return(
      <Provider store={store}>
        <RouterWithRedux>
          <Scene key="root" >

            <Scene key="ImageSlider" component={ImageSlider} title="ImageSlider" initial={false} hideNavBar={true} />
            <Scene key="Login" component={Login} title="Login" initial={false} hideNavBar={true} />
            <Scene key="ForgotPassword" component={ForgotPassword} title="ForgotPassword" initial={false} hideNavBar={true} />
            <Scene key="Splash" component={Splash} title="Splash" initial={true} hideNavBar={true} />

            <Scene key="Contact" component={Contact} title="Contact" initial={false} hideNavBar={true} />
            <Scene key="SMSSubscription" component={SMSSubscription}  title="SMSSubscription"  initial={false} hideNavBar={true}/>
            <Scene key="SMSSubscription2" component={SMSSubscription2}  title="SMSSubscription2"  initial={false} hideNavBar={true}/>
            <Scene key="SignupAfterSMS" component={SignupAfterSMS} title="SignupAfterSMS" initial={false} hideNavBar={true}/>
            <Scene key="SignupAfterFB" component={SignupAfterFB} title="SignupAfterFB" initial={false} hideNavBar={true}/>
            <Scene key="Interestedin" component={Interestedin} title="Interestedin" initial={false} hideNavBar={true}/>
            <Scene key="PostPictures" component={PostPictures} title="PostPictures" initial={false} hideNavBar={true} />

            <Scene key="home" component={Dashboard} title="Dashboard" initial={false} hideNavBar={true} />
            <Scene key="EditMyProfile" component={EditMyProfile} title="EditMyProfile" initial={false} hideNavBar={true} />
            <Scene key="Settings" component={Settings} title="Settings" initial={false} hideNavBar={true} />

            <Scene key="ChatRoom" component={ChatRoom} title="ChatRoom" initial={false} hideNavBar={true} />
            <Scene key="PersonChatRoom" component={PersonChatRoom} title="PersonChatRoom" initial={false} hideNavBar={true} />
            <Scene key="Profile" component={Profile} title="Profile" initial={false} hideNavBar={true} />

            <Scene key="Privacy" component={Privacy} title="Privacy" initial={false} hideNavBar={true} />

            <Scene key="Filters" component={Filters} title="Filters" initial={false} hideNavBar={true} />
            <Scene key="Shop" component={Shop} title="Shop" initial={false} hideNavBar={true} />

            <Scene key="DiamondPayment" component={DiamondPayment} title="DiamondPayment" initial={false} hideNavBar={true} />
          </Scene>
        </RouterWithRedux>
      </Provider>
    )
  }
}

export default App
