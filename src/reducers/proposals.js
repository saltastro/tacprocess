import {
  FETCH_PROPOSALS_START,
  FETCH_PROPOSALS_PASS,
  FETCH_PROPOSALS_FAIL,
} from "../types";

const initialState = {
  fetching: false,
  fetched: false,
  proposals:[],
  errors: null,
};

export default function proposals(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_PROPOSALS_START:{
      return {
        ...state,
        fetching: true,
        fetched: false,
      };}
      case FETCH_PROPOSALS_FAIL: {
        return {
          ...state,
          fetching: false,
          fetched: false,
          errors: "Fail to get proposals from api" }
      }
      case FETCH_PROPOSALS_PASS: {
        return {
          ...state,
          fetching: false,
          fetched: true,
          proposals: action.payload,
        }
      }
      default:{
        return state;
      }

    }

}
