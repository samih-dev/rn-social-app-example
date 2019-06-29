import { combineReducers } from 'redux';
import authReducer from './authRdx';
import userReducer from './userRdx';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});

export default rootReducer;
