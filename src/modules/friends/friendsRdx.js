import { FriendModel } from './models';

// #region actions names
const FRIENDS_FETCH_LIST = 'FRIENDS_FETCH_LIST';
// const FRIENDS_ACCEPT_REQUEST = 'FRIENDS_ACCEPT_REQUEST';
// const FRIENDS_DENY_REQUEST = 'FRIENDS_DENY_REQUEST';
// #endregion actions names

// #region reducer
const INIT_STATE = {
  friendsList: [
    new FriendModel({ username: 'bayan', askedDate: new Date(), acceptDate: new Date() }),
    new FriendModel({ username: 'rawad', askedDate: new Date(), acceptDate: new Date() }),
  ],
  friendsRequests: [
    new FriendModel({ username: 'alaa', askedDate: new Date() }),
    new FriendModel({ username: 'joe', askedDate: new Date() }),
  ],
  pending: false,
};

export default (state = INIT_STATE, { type, payload }) => {
  switch (type) {
    case FRIENDS_FETCH_LIST:
      return state;
    default:
      return state;
  }
};

// #endregion reducer

// #region actions createors
export function getFriendsList(username) {
  return {
    type: FRIENDS_FETCH_LIST,
  };
}

export function acceptRequest(userId) {
  // todo after connecting to API
}

export function denyRequest(userId) {}
// #endregion actions createors
