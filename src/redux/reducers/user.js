import { USER_SIGNUP, USER_LOGIN, USER_LOGOUT } from '../actions/user';

const initialState = {
  currentUser: {},
  isLoggedIn: false
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGNUP:
      return {
        ...state
      };
    case USER_LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        currentUser: action.user
      };
    case USER_LOGOUT:
      return {
        ...state,
        currentUser: {},
        isLoggedIn: false
      };
    default:
      return state;
  }
};

export default user;
