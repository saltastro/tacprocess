import { USER_LOGGED_IN, USER_LOGGED_OUT, FETCHING_USER, FAIL_TO_GET_USER } from "../types";


const initialState = {
  user: {
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    partners:[]
}}


export default function user(state = initialState, action = {}) {
  switch (action.type) {
    case USER_LOGGED_IN:
      return {
        ...state,
        user: action.user
      };

    case USER_LOGGED_OUT:
      return {};

    case FETCHING_USER:
      return {
        ...state,
        user: {}
      };

    case FAIL_TO_GET_USER:
      return {
        ...state,
        user: {}
      };

    default:
      return state;

  }
}
