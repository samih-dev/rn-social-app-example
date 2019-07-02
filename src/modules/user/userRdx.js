import { UserModel } from './models';

// #region actions names
const USER_SET_DETAILS = 'USER_SET_DETAILS';
// #endregion actions names

// #region reducer
const INIT_STATE = new UserModel({ username: '' });

export default (state = INIT_STATE, { type, payload }) => {
  switch (type) {
    case USER_SET_DETAILS:
      return new UserModel(payload.user);
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
