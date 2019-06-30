// #region actions names
const FRIENDS_FETCH_LIST = 'FRIENDS_FETCH_LIST';
// #endregion actions names

// #region reducer
const INIT_STATE = {
  firendsList: [],
  friendsRequests: [],
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
// #endregion actions createors
