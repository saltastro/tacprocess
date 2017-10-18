export const login = credentials => dispatch =>
  api.user.login(credentials).then( user => {
    localStorage.tacPageJWT = user.token;
    dispatch(userLoggedIn(user));
  });
