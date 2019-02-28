// #region actions names
const REGISTER_USER = 'REGISTER_USER';
const LOGIN_USER = 'LOGIN_USER';

// #endregion actions names

// #region reducer
const INIT_STATE = {
  authenticated: false,
};

export default function authReducer(state = INIT_STATE, action) {
  switch (action.type) {
    case REGISTER_USER:
    case LOGIN_USER:
      return state;
    default:
      return state;
  }
}

// #endregion reducer

// #region actions createors
export function registerUser({ email, password }) {}

export function loginUser({ email, password }) {}
// #endregion actions createors
