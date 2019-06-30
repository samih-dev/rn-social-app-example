import { PostModel, PostFormModel } from '../../modules/posts/models';

// #region actions names
const POSTS_CREATE_NEW = 'POSTS_CREATE_NEW';
const POSTS_FORM_VALUE_CHANGE = 'POSTS_FORM_VALUE_CHANGE';
// #region actions names

// #region reducer
const INIT_STATE = {
  postsList: [],
  form: new PostFormModel(),
};

export default function reducer(state = INIT_STATE, { type, payload }) {
  switch (type) {
    case POSTS_CREATE_NEW:
      return onCreateNewPost(state, payload);
    case POSTS_FORM_VALUE_CHANGE:
      return onFormValueChange(state, payload);
    default:
      return state;
  }
}

function onCreateNewPost(prevState, post) {
  const state = {
    ...prevState,
    postsList: [post, ...prevState.postsList],
    form: new PostFormModel(),
  };

  return state;
}

function onFormValueChange(prevState, { fieldName, value }) {
  const prevFormState = prevState.form;
  const state = { ...prevState, form: new PostFormModel() };

  state.form.submitted = prevFormState.submitted;
  state.form[fieldName] = value;
  state.form.valid = !!state.form.value;

  return state;
}
// #endregion reducer

// #region actions creators

export function formValueChange(fieldName, value) {
  return {
    type: POSTS_FORM_VALUE_CHANGE,
    payload: {
      fieldName,
      value,
    },
  };
}

export function createNewPost(username, body) {
  const post = new PostModel({ username, body });
  return {
    type: POSTS_CREATE_NEW,
    payload: post,
  };
}

// #endregion actions creators
