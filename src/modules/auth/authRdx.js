import { cloneDeep } from 'lodash';

// #region actions names
const AUTH_USER = 'AUTH_USER';
const AUTH_USER_SUCCESS = 'AUTH_USER_SUCCESS';
const AUTH_USER_FAIL = 'AUTH_USER_FAIL';

const AUTH_FORM_UPDATE = 'AUTH_FORM_UPDATE';
const AUTH_FORM_SET_SUMITTED = 'AUTH_FORM_SET_SUMITTED';
const AUTH_SET_AUTH_TOKEN = 'AUTH_SET_AUTH_TOKEN';

// #endregion actions names

// #region reducer
const INIT_STATE = {
  authenticated: false,
  pending: false,
  authToken: '',
  doRedirectToMainScreen: false,
  form: {
    username: '',
    password: '',
    valid: false,
    submitted: false,
  },
};

export default function authReducer(state = INIT_STATE, { type, payload }) {
  switch (type) {
    case AUTH_USER:
      return onLogin(state);
    case AUTH_USER_SUCCESS:
      return onLoginSuccess(state, payload);
    case AUTH_USER_FAIL:
      return onLoginFail(state, payload);

    case AUTH_FORM_UPDATE:
      return onFormUpdate(state, payload);
    case AUTH_FORM_SET_SUMITTED:
      return onSetFormSubmitted(state, payload);
    case AUTH_SET_AUTH_TOKEN:
      return onSetAuthToken(payload);
    default:
      return state;
  }
}

function onLogin(prevState) {
  // const state = cloneDeep(prevState);
  const state = { ...prevState, pending: true };
  return state;
}

function onLoginSuccess(prevState, { data: { token } }) {
  const state = {
    ...prevState,
    authToken: token,
    pending: false,
    doRedirectToMainScreen: true,
  };
  return state;
}

function onLoginFail(prevState) {
  const state = { ...prevState, pending: false, doRedirectToMainScreen: false };
  return state;
}

function onFormUpdate(state, payload) {
  const { fieldName, value } = payload;
  const newState = cloneDeep(state);

  const { form } = newState;
  form[fieldName] = value;
  form.valid = !!(form.username && form.password); // converting string assignment to boolean as valid prop is boolean typed on propTypes

  return newState;
}

function onSetFormSubmitted(prevState, { value }) {
  const state = cloneDeep(prevState);
  state.form.submitted = value;
  return state;
}

function onSetAuthToken(prevState, { token }) {
  const state = { ...prevState, authToken: token };
  return state;
}
// #endregion reducer

// #region actions createors
export function fieldValueChange(fieldName, value) {
  return {
    type: AUTH_FORM_UPDATE,
    payload: {
      fieldName,
      value,
    },
  };
}

export function loginUser({ username, password }) {
  return {
    type: AUTH_USER,
    payload: {
      request: {
        url: '/auth/loginOrRegister',
        method: 'post',
        data: {
          username,
          password,
        },
      },
    },
  };
}

export function setFormSubmitted(value) {
  return {
    type: AUTH_FORM_SET_SUMITTED,
    payload: {
      value,
    },
  };
}

export function setAuthToken(value) {
  return {
    type: AUTH_SET_AUTH_TOKEN,
    payload: {
      token: value,
    },
  };
}
// #endregion actions createors
