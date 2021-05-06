import { combineReducers } from 'redux'
 
import session from './session/reducer'
import chat from './chat/reducer'
 
export default combineReducers({
  session,
  chat
})