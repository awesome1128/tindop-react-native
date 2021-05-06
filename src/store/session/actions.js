
import * as types from './actionTypes'
import firebaseService from '../../services/firebase'

export function verficationChamps(nom, mail, pswd, confirmationpswd, dateNaissance) {
    if (nom != '' && mail != '' && pswd != '' && confirmationpswd != '' && dateNaissance != '') {
        return true;
    } else {
        return false;
    }
}
export function verficationEmail(mail) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(mail);
}
export function verficationPassword(passwd) {
  return passwd.length > 7 && passwd.length < 31;
}

export function verficationConfirmPass(passwd, confirmpass) {
  return passwd === confirmpass;
}

export function isDateValidFormat(date) {
    var re = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
    return re.test(date.replace(/\s/g, ''));
}
export function datehandler(text) {
    switch (text.length) {
        case 2:
            text += ' / ';
            break;
        case 3:
            var x = text.substring(0, 2);
            var y = text.substring(2, 3);
            text = x + ' / ' + y;
            break;
        case 5:
            text = text.substring(0, 2);
            break;
        case 7:
            text += ' / ';
            break;
        case 8:
            var x = text.substring(0, 7);
            var y = text.substring(7, 8);
            text = x + ' / ' + y;
            break;
        case 9:
            text = text.substring(0, 7);
            break;


    }
    return text;
}

export const restoreSession = () => {
  return (dispatch) => {
    dispatch(sessionRestoring())

    let unsubscribe = firebaseService.auth()
      .onAuthStateChanged(user => {
        if (user) {
          dispatch(sessionSuccess(user))
          unsubscribe()
        } else {
          dispatch(sessionLogout())
          unsubscribe()
        }
      })
  }
}

export const loginUser = (email, password) => {
  return (dispatch) => {
    dispatch(sessionLoading())

    firebaseService.auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => {
        dispatch(sessionError(error.message))
      })

    let unsubscribe = firebaseService.auth()
      .onAuthStateChanged(user => {
        if (user) {
          dispatch(sessionSuccess(user))
          unsubscribe()
        }
      })
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    dispatch(sessionLoading())

    firebaseService.auth()
      .signOut()
      .then(() => {
        dispatch(sessionLogout())
      })
      .catch(error => {
        dispatch(sessionError(error.message))
      })
  }
}

export const sessionSignUpNewUser = (personType, phoneNo, firstname, birth, email, password, confirmpass) => ({
  type: types.SESSION_SIGNUPNEWUSER,
  user: {
    personType, phoneNo, firstname, birth, email, password, confirmpass
  }
})


export const sessionFacebookLogin = () => ({
  type: types.SESSION_FACEBOOKLOGIN,
  user: null
})

export const sessionContacts = () => ({
  type: types.SESSION_CONTACTS
})

export const sessionLoginUser = (email, password) => ({
  type: types.SESSION_LOGINUSER,
  user: {
    email, password
  }
})

export const sessionUpdateUserContact = (contacts) => ({
  type: types.SESSION_UPDATEUSERCONTACT,
  user: {
    contacts
  }
})

export const sessionGetAllUserInfo = () => ({
  type: types.SESSION_GETALLUSERINFO,
})

export const sessionGetAllFluxImages = () => ({
  type: types.SESSION_GETALLFLUXIMGES,
})

export const sessionUpdateInterestInfo = (type, description) => ({
  type: types.SESSION_UPDATEINTERESTINFO,
  user: {
    type, description
  }
})

export const sessionUpdatePostPictures = (pictures) => ({
  type: types.SESSION_POSTPICTURES,
  user: {
    pictures
  }
})

export const sessionUploadPhotoFluxImag = (photoFluxImg) => ({
  type: types.SESSION_UPLOADPHOTOFLUXIMAG,
  photoFluxImg
})

export const sessionStoreUserLocation = (region) => ({
  type: types.SESSION_STOREUSERLOCATION,
  user: {
    region
  }
})


const sessionLoading = () => ({
  type: types.SESSION_LOADING
})

const sessionSuccess = (user, photoFluxImg, fluxImages ) => ({
  type: types.SESSION_SUCCESS,
  user,
  photoFluxImg,
  fluxImages
})

const sessionError = error => ({
  type: types.SESSION_ERROR,
  error
})

const sessionLogout = () => ({
  type: types.SESSION_LOGOUT
})
