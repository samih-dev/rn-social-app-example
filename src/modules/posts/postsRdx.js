import { PostModel, PostFormModel } from './models';

// #region actions names
const POSTS_LOAD = 'POSTS_LOAD';
const POSTS_LOAD_SUCCESS = 'POSTS_LOAD_SUCCESS';
const POSTS_LOAD_FAIL = 'POSTS_LOAD_FAIL';

const POSTS_CREATE_NEW = 'POSTS_CREATE_NEW';
const POSTS_CREATE_NEW_SUCCESS = 'POSTS_CREATE_NEW_SUCCESS';
const POSTS_CREATE_NEW_FAIL = 'POSTS_CREATE_NEW_FAIL';

const POSTS_FORM_VALUE_CHANGE = 'POSTS_FORM_VALUE_CHANGE';
// #region actions names

// #region reducer
const INIT_STATE = {
  postsList: [],
  pending: false,
  form: new PostFormModel(),
};

export default function reducer(state = INIT_STATE, { type, payload }) {
  switch (type) {
    case POSTS_LOAD:
      return onPostLoad(state);
    case POSTS_LOAD_SUCCESS:
      return onPostLoadSuccess(state, payload);
    case POSTS_LOAD_FAIL:
      return onPostLoadFail(state, payload);
    case POSTS_CREATE_NEW:
      return onCreateNewPost(state);
    case POSTS_CREATE_NEW_SUCCESS:
      return onCreateNewPostSuccess(state, payload);
    case POSTS_CREATE_NEW_FAIL:
      return onCreateNewPostFail(state, payload);
    case POSTS_FORM_VALUE_CHANGE:
      return onFormValueChange(state, payload);
    default:
      return state;
  }
}

function onPostLoad(prevState) {
  return { ...prevState, pending: true };
}

function onPostLoadSuccess(prevState, { data }) {
  const mappedModels = data.map(PostModel.createFromBeModel);
  return { ...prevState, pending: false, postsList: mappedModels };
}

function onPostLoadFail(prevState) {
  return { ...prevState, pending: false };
}

function onCreateNewPost(prevState) {
  const state = {
    ...prevState,
    pending: true,
  };

  return state;
}

function onCreateNewPostSuccess(prevState, { data }) {
  const post = PostModel.createFromBeModel(data);
  return {
    ...prevState,
    postsList: [post, ...prevState.postsList],
    form: new PostFormModel(),
    pending: false,
  };
}

function onCreateNewPostFail(prevState) {
  return { ...prevState, pending: false };
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

export function createNewPost(userId, body) {
  return {
    type: POSTS_CREATE_NEW,
    payload: {
      request: {
        method: 'post',
        url: '/posts',
        data: {
          author: userId,
          body,
        },
      },
    },
  };
}

export function loadPosts(userId, friendsIds) {
  return {
    type: POSTS_LOAD,
    payload: {
      request: {
        method: 'post',
        url: '/posts/getPostsFeed',
        data: {
          userId,
          friendsIds,
        },
      },
    },
  };
}

// #endregion actions creators
