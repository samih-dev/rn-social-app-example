import { FriendModel } from './models';

// #region actions names
const FRIENDS_FETCH_LIST = 'FRIENDS_FETCH_LIST';
const FRIENDS_FETCH_LIST_SUCCESS = 'FRIENDS_FETCH_LIST_SUCCESS';
const FRIENDS_FETCH_LIST_FAIL = 'FRIENDS_FETCH_LIST_FAIL';

const FRIENDS_REQUEST = 'FRIENDS_REQUEST';
export const FRIENDS_REQUEST_SUCCESS = 'FRIENDS_REQUEST_SUCCESS';
const FRIENDS_REQUEST_FAIL = 'FRIENDS_REQUEST_FAIL';

const FRIENDS_ACCEPT_REQUEST = 'FRIENDS_ACCEPT_REQUEST';
export const FRIENDS_ACCEPT_REQUEST_SUCCESS = 'FRIENDS_ACCEPT_REQUEST_SUCCESS';
const FRIENDS_ACCEPT_REQUEST_FAIL = 'FRIENDS_ACCEPT_REQUEST_FAIL';

const FRIENDS_DENY_REQUEST = 'FRIENDS_DENY_REQUEST';
export const FRIENDS_DENY_REQUEST_SUCCESS = 'FRIENDS_DENY_REQUEST_SUCCESS';
const FRIENDS_DENY_REQUEST_FAIL = 'FRIENDS_DENY_REQUEST_FAIL';

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
      return onFriendsFetchNonFriendsSuccess(state, payload);
    case FRIENDS_FETCH_NON_FRIENDS_FAIL:
      return onFriendsFetchNonFriendsFail(state, payload);

    case FRIENDS_REQUEST:
      return onFriendRequest(state);
    case FRIENDS_REQUEST_SUCCESS:
      return onFriendRequestSuccess(state, payload);
    case FRIENDS_REQUEST_FAIL:
      return onFriendRequestFail(state, payload);

    case FRIENDS_ACCEPT_REQUEST:
      return onFriendsAcceptRequest(state);
    case FRIENDS_ACCEPT_REQUEST_SUCCESS:
      return onFriendsAcceptRequestSuccess(state, payload);
    case FRIENDS_ACCEPT_REQUEST_FAIL:
      return onFriendsAcceptRequestFail(state, payload);

    case FRIENDS_DENY_REQUEST:
      return onFriendsDenyRequest(state);
    case FRIENDS_DENY_REQUEST_SUCCESS:
      return onFriendsDenyRequestSuccess(state, payload);
    case FRIENDS_DENY_REQUEST_FAIL:
      return onFriendsDenyRequestFail(state, payload);

    default:
      return state;
  }
};

function onFriendsFetchList(prevState) {
  return { ...prevState, pending: true };
}

function onFriendsFetchListSuccess(prevState, { data: { list, userId } }) {
  // mapped model mainly generate FriendModels deciding what user on the relation needs to be created
  const mappedModels = list.map(friendshipModel => {
    const { isApproved, requestDate } = friendshipModel;

    // eslint-disable-next-line no-underscore-dangle
    if (friendshipModel.user._id !== userId) {
      return FriendModel.createFromBeModel({
        isApproved,
        user: friendshipModel.user,
        requestDate,
      });
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
function onFriendRequestSuccess(prevState, { data: askedUserId }) {
  return {
    ...prevState,
    pending: false,
    nonFriends: prevState.nonFriends.filter(user => user.id !== askedUserId),
  };
}
function onFriendRequestFail(prevState, payload) {
  return { ...prevState, pending: false };
}

function onFriendsAcceptRequest(prevState) {
  return { ...prevState, pending: true };
}
function onFriendsAcceptRequestSuccess(prevState, { data: userIdAccepted }) {
  let friendModel;

  const friendsRequests = prevState.friendsRequests.filter(m => {
    if (m.id === userIdAccepted) {
      friendModel = m;
      return false;
    }
    return true;
  });

  friendModel.isApproved = true;

  const friendsList = [friendModel, ...prevState.friendsList];
  return { ...prevState, pending: false, friendsList, friendsRequests };
}
function onFriendsAcceptRequestFail(prevState, payload) {
  return { ...prevState, pending: false };
}

function onFriendsDenyRequest(prevState) {
  return { ...prevState, pending: true };
}
function onFriendsDenyRequestSuccess(prevState, { data: userIdDenied }) {
  return {
    ...prevState,
    pending: false,
    friendsRequests: prevState.friendsRequests.filter(m => m.id !== userIdDenied),
  };
}
function onFriendsDenyRequestFail(prevState, payload) {
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
    payload: {
      request: {
        method: 'post',
        url: '/users/getNonFriends',
        data: {
          userId,
          friendsIds,
          usersIdsWithRequests,
        },
      },
    },
  };
}

export function friendRequest(userId, askedUserId) {
  return {
    type: FRIENDS_REQUEST,
    payload: {
      request: {
        method: 'post',
        url: '/users/friendRequest',
        data: {
          userId,
          askedUserId,
        },
      },
    },
  };
}

export function acceptRequest(userId, userIdToApprove) {
  return {
    type: FRIENDS_ACCEPT_REQUEST,
    payload: {
      request: {
        url: '/users/approveFriendRequest',
        method: 'post',
        data: {
          userId,
          userIdToApprove,
        },
      },
    },
  };
}

export function denyRequest(userId, userIdToDeny) {
  return {
    type: FRIENDS_DENY_REQUEST,
    payload: {
      request: {
        url: '/users/denyFriendRequest',
        method: 'post',
        data: {
          userId,
          userIdToDeny,
        },
      },
    },
  };
}
// #endregion actions createors
