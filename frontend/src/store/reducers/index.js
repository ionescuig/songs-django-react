import { combineReducers } from "redux";
import authReducer from './auth';
import songsReducer from './songs';

const rootReducer = combineReducers({
  auth: authReducer,
  songs: songsReducer
})

export default rootReducer;