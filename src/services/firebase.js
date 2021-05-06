import * as firebase from 'firebase'
import { firebaseConfig } from '../configs/firebase'
 
let instance = null
 
class FirebaseService {
  constructor() {
    if (!instance) {
      this.app = firebase.initializeApp(firebaseConfig);
      instance = this;
    }
    return instance
  }
}

// const myFirebaseApp = firebase.initializeApp(firebaseConfig);
// const reduxSagaFirebase = new ReduxSagaFirebase(myFirebaseApp);
const firebaseService = new FirebaseService().app
export default firebaseService;