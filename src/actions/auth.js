import { USER_LOGGED_IN,
  USER_LOGGED_OUT,
  FETCHING_USER,
  FAIL_TO_GET_USER
} from "../types";
import { queryUserData } from "../api/graphQL"
import api from "../api/api";

export const userLoggedIn = user =>{
  return ({
  type: USER_LOGGED_IN,
  user
})}

export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT
})

export const fetchingUserData = () => ({
  type: FETCHING_USER
})

function FetchingUserFail() {
  return (
    {
       type: FAIL_TO_GET_USER
  }
);
}

export const login = credentials => dispatch =>
  api.user.login(credentials).then( user => {
    localStorage.tacPageJWT = user.token;
    dispatch(userLoggedIn(user));
  });

export const logout = () => dispatch => {
    localStorage.removeItem("tacPageJWT");
    dispatch(userLoggedOut());
  };

const convertData = rowUser => {
  const user = {
    firstName: rowUser.firstName,
    lastName: rowUser.lastName,
    email: rowUser.email,
    username: rowUser.username,
    role: rowUser.role
  }
  return user
}


export function fetchUserData(){
  return function disp(dispatch){
    dispatch(fetchingUserData);
    queryUserData().then( res => {
      dispatch(userLoggedIn(convertData(res.data.data.user)))}
    ).catch(() => dispatch(FetchingUserFail()))
  }
}
