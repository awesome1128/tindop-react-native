import { all, fork } from 'redux-saga/effects';
import {  sessionSignUpNewUser, 
          sessionGetAllUserInfo, 
          sessionUpdateUserContact, 
          sessionUpdateInterestInfo, 
          sessionLoginUser, 
          sessionUpdatePostPictures, 
          sessionStoreUserLocation, 
          sessionUploadPhotoFluxImag,
          sessionGetAllFluxImages,
          sessionFacebookLogin,
          sessionContacts } from './session/sagas';

export default function* rootSaga() {
  yield all([
    fork(sessionLoginUser),
    fork(sessionContacts),
    fork(sessionSignUpNewUser),
    fork(sessionUpdateUserContact),
    fork(sessionUpdatePostPictures),
    fork(sessionUpdateInterestInfo),
    fork(sessionStoreUserLocation),
    fork(sessionGetAllUserInfo),
    fork(sessionGetAllFluxImages),
    fork(sessionFacebookLogin),
    fork(sessionUploadPhotoFluxImag)
  ])
}
