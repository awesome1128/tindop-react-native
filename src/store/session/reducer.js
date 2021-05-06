import * as types from './actionTypes'

const initialState = {
  restoring: false,
  loading: false,
  user: null,
  error: null,
  photoFluxImg: null,
  fluxImages: null,
  islogin: false,
  contacts: ''
}

export default function reducer(state = initialState, action) {
  console.log('action.user==', action.type);
  
  switch(action.type) {
    case types.SESSION_SIGNUPNEWUSER:
      return { ...state, loading: true, user: action.user, islogin: false}
    case types.SESSION_CONTACTS:
      return { ...state, loading: true, islogin: false}
    case types.SESSION_FACEBOOKLOGIN:
      return { ...state, loading: true, user: action.user, islogin: true, error: null}
    case types.SESSION_CONTACTS_SUCCESS:
      return { ...state, loading: false, contacts: action.contacts, islogin: false}
    case types.SESSION_LOGINUSER:
      return { ...state, loading: true, user: action.user, islogin: true, error: null}
    case types.SESSION_UPDATEUSERCONTACT:
      return { ...state, loading: true, user: action.user, islogin: false}
    case types.SESSION_UPDATEINTERESTINFO:
      return { ...state, loading: true, user: action.user, islogin: false}
    case types.SESSION_GETALLUSERINFO:
      return { ...state, loading: true, islogin: false}
    case types.SESSION_GETALLFLUXIMGES:
      return { ...state, loading: true}
    case types.SESSION_UPLOADPHOTOFLUXIMAG:
      return { ...state, loading: true, photoFluxImg: action.photoFluxImg, islogin: false}
    case types.SESSION_RESTORING:
      return { ...state, restoring: true, islogin: false }
    case types.SESSION_POSTPICTURES:
      return { ...state, loading: true, user: action.user, islogin: false}
    case types.SESSION_STOREUSERLOCATION:
      return { ...state, loading: true, user: action.user, islogin: false}
    case types.SESSION_LOADING:
      return { ...state, restoring: false, loading: true, error: null , islogin: false}
    case types.SESSION_SUCCESS:
      return { ...state, restoring: false, loading: false, user: action.user, photoFluxImg: action.photoFluxImg, fluxImages: action.fluxImages, error: null}
    case types.SESSION_ERROR:
      return { restoring: false, loading: false, user: null, photoFluxImg: null, error: action.error , islogin: false}
    case types.SESSION_LOGOUT:
      return initialState
    default:
      return state
  }
}

// export default session
