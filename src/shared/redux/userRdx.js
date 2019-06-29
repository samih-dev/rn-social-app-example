const INIT_STATE = {
  username: '',
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case 'SET_USER_DETAILS':
      return { ...state, username: action.data.username };
    default:
      return state;
  }
};
