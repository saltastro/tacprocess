import { USER_LOGGED_IN,
  USER_LOGGED_OUT,
  FETCHING_USER,
  FAIL_TO_GET_USER,
  PARTNER_CHANGE
} from "../types";
import { queryUserData } from "../api/graphQL"
import api from "../api/api";
import { firstSelectedPartner } from "../util/filters";

export const userLoggedIn = user => {
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

export const fetchingUserFail = () => ({
  type: FAIL_TO_GET_USER
})

export const partnersFilter = partner => ({
  type: PARTNER_CHANGE,
  changeTo: partner
})

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
    roles:rowUser.role
  }
  return user
}


export function fetchUserData(){
  return function disp(dispatch){
    dispatch(fetchingUserData());
    queryUserData().then( res => {
      const u = convertData(res.data.data.user)
      dispatch(userLoggedIn(u))
      dispatch(partnersFilter(firstSelectedPartner(u.roles)))
    }).catch(() => dispatch(fetchingUserFail()))
  }
}
