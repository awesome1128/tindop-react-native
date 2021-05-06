import * as firebase from 'firebase'
import * as types from './actionTypes'
import { put, take, call, select } from 'redux-saga/effects'
import RNFetchBlob from 'react-native-fetch-blob'
import { AsyncStorage , Platform} from "react-native"
import moment from 'moment'
import { FBLoginManager } from 'react-native-facebook-login'


import firebaseService from '../../services/firebase'
import * as userActions from '../actions/userActions'

const Facebook = {
  login: (permissions) => {
    return new Promise((resolve, reject) => {
      FBLoginManager.loginWithPermissions(permissions || ['email'], (error, data) => {
        if (!error) {
          resolve(data.credentials.token);
        } else {
          reject(error);
        }
      });
    });
  },
  logout: () => {
    return new Promise((resolve, reject) => {
      FBLoginManager.logout((error, data) => {
        if (!error) {
          resolve(true);
        } else {
          reject(error);
        }
      });
    });
  }
}

const fbLoginPermissions = ['email', 'user_friends'];


function uploadImage(uri, mime = 'application/octet-stream') {
  const Blob = RNFetchBlob.polyfill.Blob
  const fs = RNFetchBlob.fs
  window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
  window.Blob = Blob
  console.log('fs:', fs);
  console.log('window.Blob', window.Blob);
  const currentTimeStamp = moment().toISOString();

  return new Promise((resolve, reject) => {
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    let uploadBlob = null

    const imageRef = firebaseService.storage().ref('images').child(currentTimeStamp)

    fs.readFile(uploadUri, 'base64')
      .then((data) => {
        console.log(data);
        return Blob.build(data, { type: `${mime};BASE64` })
      })
      .then((blob) => {
        uploadBlob = blob
        return imageRef.put(blob, { contentType: mime })
      })
      .then(() => {
        uploadBlob.close()
        return imageRef.getDownloadURL()
      })
      .then((url) => {
        resolve(url)
      })
      .catch((error) => {
        reject(error)
    })
  })
}

export function* sessionLoginUser() {
  while(true){
    yield take(types.SESSION_LOGINUSER);
    yield call(loginUser);
  }
}

export function* sessionFacebookLogin() {
  while(true){
    yield take(types.SESSION_FACEBOOKLOGIN);
    yield call(facebookLogin);
  }
}


export function* sessionContacts() {
  while(true){
    yield take(types.SESSION_CONTACTS);
    yield call(loadContacts);
  }
}

export function* sessionSignUpNewUser() {
  while(true){
    yield take(types.SESSION_SIGNUPNEWUSER);
    yield call(createNewUser);
  }
}

export function* sessionUpdateUserContact() {
  while(true){
    yield take(types.SESSION_UPDATEUSERCONTACT);
    yield call(updateUserInfo);
  }
}

export function* sessionUpdateInterestInfo() {
  while(true){
    yield take(types.SESSION_UPDATEINTERESTINFO);
    yield call(updateUserInfo);
  }
}

export function* sessionUpdatePostPictures() {
  while(true){
    yield take(types.SESSION_POSTPICTURES);
    yield call(updateUserInfo);
  }
}

export function* sessionUploadPhotoFluxImag() {
  while(true){
    yield take(types.SESSION_UPLOADPHOTOFLUXIMAG);
    yield call(uploadPhotoFlux);
  }
}

export function* sessionStoreUserLocation() {
  while(true){
    yield take(types.SESSION_STOREUSERLOCATION);
    yield call(updateUserInfo);
  }
}

export function* sessionGetAllFluxImages() {
  while(true){
    yield take(types.SESSION_GETALLFLUXIMGES);
    yield call(getAllFluxImages);
  }
}

export function* sessionGetAllUserInfo() {
  while(true){
    yield take(types.SESSION_GETALLUSERINFO);
    yield call(getAllUserInfo);
  }
}


function* createNewUser() {
  try{
    const state = yield select();

    yield firebaseService.auth().createUserWithEmailAndPassword(state.session.user.email, state.session.user.password);
    var user = firebaseService.auth().currentUser;

    const userInfo = {
      username: state.session.user.email,
      password: state.session.user.password,
      userID: ''
    }
    const newUser = {
      firstname: state.session.user.firstname,
      birth: state.session.user.birth,
      email: state.session.user.email,
      phoneNo: state.session.user.phoneNo,
      personType: state.session.user.personType,
      createdAt: new Date().getTime()
    }


    const dbRef = firebaseService.database().ref('UsersList');
    const resData = yield call([dbRef, dbRef.push], newUser);
    userInfo.userID = resData.key;

    userActions._storeData('logged', true); 
    userActions._storeData('userInfo', userInfo);

    yield put({type: 'SESSION_SUCCESS', user});
    // yield put({type: 'SESSION_SUCCESS', newUser});

  }catch(error){
    yield put({type: 'SESSION_ERROR', error});
  }
}


function* loadContacts(){
  try{
    const state = yield select();
    const dbRef = firebaseService.database().ref('Contacts/');
    const resData = yield call([dbRef, dbRef.once], 'value');
    let contacts_array = []
    resData.forEach((contactObj)=> {
      var objData = contactObj.val();
      objData['key'] = contactObj.key;
      contacts_array.push(objData);     
    });
    
    yield put({type: 'SESSION_CONTACTS_SUCCESS', contacts: contacts_array});
  }catch(error){
    yield put({type: 'SESSION_ERROR', error});
  }
}

function* facebookLogin () {

  try{
    const dbRef = firebaseService.database().ref('UsersList');
    var token = yield call([Facebook, Facebook.login], fbLoginPermissions);
    var user = yield firebaseService.auth().signInAndRetrieveDataWithCredential(firebase.auth.FacebookAuthProvider.credential(token)) 
    var fbUser = yield JSON.stringify(user);
    fbUser = JSON.parse(fbUser);
    user = fbUser['user'];   
    const photos = ['', user.photoURL, '', '', '', ''];

    const newUserData = {
      firstname: user.displayName,
      email: user.email,
      pictures: photos,
      contacts: [],
      avatar: user.photoURL,
      description: '',
      isHideLocation: false,
      diamondCounts: 4,
      createdAt: new Date().getTime()
    }

    let isexistEmail = false;
    let userData = '';

    yield call(function() {
      return new Promise(function(resolve, reject) {
        dbRef.orderByChild('email').equalTo(user.email).once('value', function (snapshot) {
          if (snapshot.val() == null)
            isexistEmail = false
          else{
            snapshot.forEach((child) => { 
              userData = child.val();
              userData['userID'] = child.key;
            });  
            isexistEmail = true
          }
          resolve(isexistEmail)
        })
      })
    })
    if(!isexistEmail)
    {
      yield call(function() {
        return new Promise(function(resolve, reject) {
          dbRef.push(newUserData).then((data) => {
            newUserData['userID'] = data.key
            resolve(newUserData)
          }).catch((err) => {       
              console.log('error===', err);
          });
        })
      })
    }
   
    yield put({type: 'SESSION_SUCCESS', user: isexistEmail ? userData : newUserData, islogin: true});

  }catch(error){
    yield put({type: 'SESSION_ERROR', error: 'login_fb_error'});
  }
}

function* loginUser() {
  try{
    const state = yield select();

    yield firebaseService.auth().signInWithEmailAndPassword(state.session.user.email, state.session.user.password);

    var user = firebaseService.auth().currentUser;
    var uid = user.uid;
    const dbRef = firebaseService.database().ref('UsersList/');

    var user_data = {};
    yield call(function() {
      return new Promise(function(resolve, reject) {
        dbRef.orderByChild('email').equalTo(state.session.user.email).once('child_added', function (snap) {
          user_data = snap.val();
          user_data['userID'] = snap.key;          
          resolve(user_data)
        })
      })
    })
    
    const userInfo = {
      username: state.session.user.email,
      password: state.session.user.password,
      userID: user_data['userID']
    }

    userActions._storeData('logged', true); 
    userActions._storeData('userInfo', userInfo);

    yield put({type: 'SESSION_SUCCESS', user: user_data});
  }catch(error){
    yield put({type: 'SESSION_ERROR', error: "login_error"});
  }
}

function* updateUserInfo() {
  try{
    const state = yield select();   
    userdata = {...state.session.user};
    userActions._retrieveData('userInfo').then((value) => {        
      const userInfo = JSON.parse(value);
      firebaseService.database().ref('UsersList/' + userInfo.userID).update(userdata);
    }).catch((error) => {
        console.log(error);        
    });
    
    yield put({type: 'SESSION_SUCCESS', user});
  }catch(error){
    yield put({type: 'SESSION_ERROR', error});
  }
}

function* uploadPhotoFlux() {
  try{
    const state = yield select();
    const fluxImgURL = state.session.photoFluxImg.uri;
    const imgUrl = yield call(uploadImage, fluxImgURL);

    const uploadData = {
      latitude: state.session.photoFluxImg.latitude,
      longitude: state.session.photoFluxImg.longitude,
      owner: state.session.photoFluxImg.owner,
      uri: imgUrl,
    }
    const dbRef = firebaseService.database().ref('PhotoFluxImg');
    yield call([dbRef, dbRef.push], uploadData);

    yield put({type: 'SESSION_SUCCESS', photoFluxImg: uploadData});
  }catch(error){
    yield put({type: 'SESSION_ERROR', error});
  }
}

function* getAllUserInfo() {
  try{
    const state = yield select();

    firebaseService.database().ref('UsersList').on('value', function (snapshot) {
      var userdata = snapshot.val();
      console.log(userdata);
      return true;
    });

    yield put({type: 'SESSION_SUCCESS', user: userdata});
  }catch(error){
    yield put({type: 'SESSION_ERROR', error});
  }
}

function* getAllFluxImages() {  

  try{
    const state = yield select();
    const dbRef = firebaseService.database().ref('PhotoFluxImg');
    // const snapshot = yield call([dbRef, dbRef.on], 'value');
    var urls = yield call(function() {
      return new Promise(function(resolve, reject) {
        dbRef.on('value', function (snapFluxImg) {
          var urls = [];
          snapFluxImg.forEach((snapshot)=> {
            var objData = snapshot.val();
            objData['key'] = snapshot.key;
            urls.push(objData);     
          });          
          resolve(urls)
        })
      })
    })
    console.log('fluxImgData=====:', urls);
    yield put({type: 'SESSION_SUCCESS', fluxImages: urls});
  }catch(error){
    console.log('error', error);
    yield put({type: 'SESSION_ERROR', error});
  }
}

function getUserData() {
  firebaseService.database().ref('UsersList/' + firebaseService.auth().currentUser.uid).on('value', function (snapshot) {
    window.user = snapshot.val();
    return true;
  });
}

function editUserData(user, uid, postKey) {
  firebaseService.database().ref('UsersList/' + uid + '/').update(user).then((data) => {
    console.log('data ', data)
  }).catch((error) => {
    console.log('error ', error)
  })
}

function editPhotoFluxImg() {
  firebaseService.database().ref('UsersList/PhotoFluxImg').push().then((data) => {
    console.log('data ', data)
  }).catch((error) => {
    console.log('error ', error)
  })
}

function getUser() {
  return firebaseService.auth().currentUser
}

function delUserData(uid) {
  firebaseService.database().ref('UsersList/').ref(uid).remove();
}

function handleFacebookLogin() {
  LoginManager.logInWithReadPermissions(['public_profile', 'email', 'user_friends']).then(
    function (result) {
      if (result.isCancelled) {
        console.log('Login cancelled')
      } else {
        //console.warn('Login success with permissions: ' + result.grantedPermissions.toString())
        AccessToken.getCurrentAccessToken().then((data) => {
          const cred = firebase.auth.FacebookAuthProvider.credential(data.accessToken.toString());
          firebase.auth().signInWithCredential(cred);
          const response = getfbdata(data.accessToken);
        }).then((user, data) => {
          //console.warn(data.accessToken);
        }).catch((error) => {
          const { code, message } = error;
        });
      }
    },
    function (error) {
      console.log('Login fail with error: ' + error)
    }
  )
}


function getfbdata(token) {
  fetch(`https://graph.facebook.com/v2.5/me?fields=email,first_name,last_name,name,gender,birthday,work,about,education&access_token=` + token).then(function(response){
    user = response.json();
  });
  //console.warn(user);
  const uiduser = firebase.auth().currentUser
  const uid = uiduser.uid;
  firebaseService.database().ref('UsersList/' + uid).once('value', function (snapshot) {
    if (snapshot.exists()) {
      snapshot.forEach(function (childSnapshot) {
          var childData = childSnapshot.val();
          window.user = childData;
          Actions.mainhomeScreen();
          return true;
      })
    } else {
      Actions.facebookSignUpScreen({ user: user });
    }
  });
}

function signOutUser() {
  try {
    firebaseService.auth().signOut();
    Actions.reset('authMainScreen')
  } catch (e) {
    console.log(e);
  }
}
