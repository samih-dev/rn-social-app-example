import { UserModel } from '../../modules/user/models';

// #region actions names
const USER_SET_DETAILS = 'USER_SET_DETAILS';
// #endregion actions names

// #region reducer
const INIT_STATE = new UserModel({ username: '' });

export default (state = INIT_STATE, { type, payload }) => {
  switch (type) {
    case USER_SET_DETAILS:
      return new UserModel({ username: payload.username });
    default:
      return state;
  }
};

// #endregion reducer

// #region actions createors
// #endregion actions createors
