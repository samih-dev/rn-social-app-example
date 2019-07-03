import { UserModel } from './models';
import {
  FRIENDS_REQUEST_SUCCESS,
  FRIENDS_ACCEPT_REQUEST_SUCCESS,
  FRIENDS_DENY_REQUEST_SUCCESS,
} from '../friends';

// #region actions names
const USER_SET_DETAILS = 'USER_SET_DETAILS';
// #endregion actions names

// #region reducer
const INIT_STATE = new UserModel({ username: '' });

export default (state = INIT_STATE, { type, payload }) => {
  switch (type) {
    case USER_SET_DETAILS:
      return new UserModel(payload.user);
    case FRIENDS_REQUEST_SUCCESS:
      return new UserModel({
        ...state,
        usersIdsWithRequest: [payload.data, ...state.usersIdsWithRequest],
      });
    case FRIENDS_ACCEPT_REQUEST_SUCCESS:
    case FRIENDS_DENY_REQUEST_SUCCESS:
      return new UserModel({
        ...state,
        usersIdsWithRequest: state.usersIdsWithRequest.filter(id => id !== payload.data),
      });
    default:
      return state;
  }
};

// #endregion reducer

// #region actions createors
export function setUserDetails(user) {
  return {
    type: USER_SET_DETAILS,
    payload: {
      user,
    },
  };
}
// #endregion actions createors
