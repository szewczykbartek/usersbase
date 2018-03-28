import { combineReducers } from 'redux'
import reducer_users from './users'
import reducer_setting from './setting'

export default combineReducers({
  reducer_users,
  reducer_setting
})
