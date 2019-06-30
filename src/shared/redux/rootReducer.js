import { combineReducers } from 'redux';
import authReducer from './authRdx';
import userReducer from './userRdx';
import postsReducer from './postsRdx';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  posts: postsReducer,
});

export default rootReducer;
