import { combineReducers } from 'redux';
import authReducer from '../../modules/auth/authRdx';
import userReducer from '../../modules/user/userRdx';
import postsReducer from '../../modules/posts/postsRdx';
import friendsReducer from '../../modules/friends/friendsRdx';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  posts: postsReducer,
  friends: friendsReducer,
});

export default rootReducer;
