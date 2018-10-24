export const USER_SIGNUP = 'USER_SIGNUP';
export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';

export const logIn = user => {
  return async dispatch => {
    return dispatch({
      type: USER_LOGIN,
      user: user,
      isLoggedIn: true
    });
  };
};

export const logOut = () => {
  return {
    type: USER_LOGOUT
  };
};
