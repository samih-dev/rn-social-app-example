import { cloneDeep } from 'lodash';

// #region actions names
const LOGIN_USER = 'LOGIN_USER';
const LOGIN_FORM_UPDATE = 'LOGIN_FORM_UPDATE';
const LOGIN_FORM_SET_SUMITTED = 'LOGIN_FORM_SET_SUMITTED';

// #endregion actions names

// #region reducer
const INIT_STATE = {
  authenticated: false,
  pending: false,

  form: {
    username: '',
    password: '',
    valid: false,
    submitted: false,
  },
};

export default function authReducer(state = INIT_STATE, { type, payload }) {
  switch (type) {
    case LOGIN_USER:
      return onLogin(state);
    case LOGIN_FORM_UPDATE:
      return onFormUpdate(state, payload);
    case LOGIN_FORM_SET_SUMITTED:
      return onSetFormSubmitted(state, payload);
    default:
      return state;
  }
}

function onLogin(prevState) {
  const state = cloneDeep(prevState);
  state.pending = true;
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
// #endregion reducer

// #region actions createors
export function fieldValueChange(fieldName, value) {
  return {
    type: LOGIN_FORM_UPDATE,
    payload: {
      fieldName,
      value,
    },
  };
}

export function loginUser() {
  return {
    type: LOGIN_USER,
  };
}

export function setFormSubmitted(value) {
  return {
    type: LOGIN_FORM_SET_SUMITTED,
    payload: {
      value,
    },
  };
}
// #endregion actions createors
