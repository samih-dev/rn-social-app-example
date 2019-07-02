import { FriendModel } from './models';

// #region actions names
const FRIENDS_FETCH_LIST = 'FRIENDS_FETCH_LIST';
const FRIENDS_FETCH_LIST_SUCCESS = 'FRIENDS_FETCH_LIST_SUCCESS';
const FRIENDS_FETCH_LIST_FAIL = 'FRIENDS_FETCH_LIST_FAIL';
// const FRIENDS_ACCEPT_REQUEST = 'FRIENDS_ACCEPT_REQUEST';
// const FRIENDS_DENY_REQUEST = 'FRIENDS_DENY_REQUEST';

const FRIENDS_REQUEST = 'FRIENDS_ADD_REQUEST';
export const FRIENDS_REQUEST_SUCCESS = 'FRIENDS_REQUEST_SUCCESS';
const FRIENDS_REQUEST_FAIL = 'FRIENDS_REQUEST_FAIL';

const FRIENDS_FETCH_NON_FRIENDS = 'FRIENDS_FETCH_NON_FRIENDS';
const FRIENDS_FETCH_NON_FRIENDS_SUCCESS = 'FRIENDS_FETCH_NON_FRIENDS_SUCCESS';
const FRIENDS_FETCH_NON_FRIENDS_FAIL = 'FRIENDS_FETCH_NON_FRIENDS_FAIL';

// #endregion actions names

// #region reducer
const INIT_STATE = {
  friendsList: [],
  friendsRequests: [],
  nonFriends: [],
  pending: false,
};

export default (state = INIT_STATE, { type, payload }) => {
  switch (type) {
    case FRIENDS_FETCH_LIST:
      return onFriendsFetchList(state);
    case FRIENDS_FETCH_LIST_SUCCESS:
      return onFriendsFetchListSuccess(state, payload);
    case FRIENDS_FETCH_LIST_FAIL:
      return onFriendsFetchListFail(state, payload);

    case FRIENDS_FETCH_NON_FRIENDS:
      return onFriendsFetchNonFriends(state);
    case FRIENDS_FETCH_NON_FRIENDS_SUCCESS:
      return onFriendsFetchNonFriendsSuccess(state);
    case FRIENDS_FETCH_NON_FRIENDS_FAIL:
      return onFriendsFetchNonFriendsFail(state);

    case FRIENDS_REQUEST:
      return onFriendRequest(state);
    case FRIENDS_REQUEST_SUCCESS:
      return onFriendRequestSuccess(state, payload);
    case FRIENDS_REQUEST_FAIL:
      return onFriendRequestFail(state, payload);

    default:
      return state;
  }
};

function onFriendsFetchList(prevState) {
  return { ...prevState, prending: true };
}

function onFriendsFetchListSuccess(prevState, { data: { list, userId } }) {
  // mapped model mainly generate FriendModels deciding what user on the relation needs to be created
  const mappedModels = list.map(friendshipModel => {
    const { isApproved, requestDate } = friendshipModel;

    if (friendshipModel.user.id !== userId) {
      return FriendModel.createFromBeModel({ isApproved, user: friendshipModel.user, requestDate });
    }
    return FriendModel.createFromBeModel({
      isApproved,
      user: friendshipModel.userAsked,
      requestDate,
    });
  });

  return {
    ...prevState,
    friendsList: mappedModels.filter(model => model.isApproved),
    friendsRequests: mappedModels.filter(model => !model.isApproved),
    pending: false,
  };
}

function onFriendsFetchListFail(prevState, payload) {
  return { ...prevState, prending: false };
}

function onFriendsFetchNonFriends(prevState) {
  return { ...prevState, pending: true };
}
function onFriendsFetchNonFriendsSuccess(prevState, { data }) {
  debugger;
  return {
    ...prevState,
    pending: false,
    nonFriends: data.map(userModel =>
      FriendModel.createFromBeModel({ user: userModel, isApproved: false, requestDate: undefined })
    ),
  };
}

function onFriendsFetchNonFriendsFail(prevState, payload) {
  return { ...prevState, pending: false };
}

function onFriendRequest(prevState) {
  return { ...prevState, pending: true };
}
function onFriendRequestSuccess(prevState, { data: userId }) {
  return { ...prevState, pending: false, nonFriends: prevState.filter(user => user.id !== userId) };
}

function onFriendRequestFail(prevState, payload) {
  return { ...prevState, pending: false };
}
// #endregion reducer

// #region actions createors
export function getFriendsAndFriendsRequestsList(userId) {
  return {
    type: FRIENDS_FETCH_LIST,
    payload: {
      request: {
        method: 'post',
        url: '/users/getFriendsAndFriendsRequests',
        data: {
          userId,
        },
      },
    },
  };
}

export function getNonFriendsList(userId, friendsIds, usersIdsWithRequests) {
  return {
    type: FRIENDS_FETCH_NON_FRIENDS,
    request: {
      method: 'post',
      url: '/users/getNonFriends',
      data: {
        userId,
        friendsIds,
        usersIdsWithRequests,
      },
    },
  };
}

export function friendRequest(userId, askedUserId) {
  return {
    type: FRIENDS_REQUEST,
    request: {
      method: 'post',
      url: '/users/friendRequest',
      data: {
        userId,
        askedUserId,
      },
    },
  };
}

export function acceptRequest(userId) {
  // todo after connecting to API
}

export function denyRequest(userId) {}
// #endregion actions createors
