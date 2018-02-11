import {
  FETCH_TARGETS_START,
  FETCH_TARGETS_PASS,
  FETCH_TARGETS_FAIL,
} from "../types";

const initialState = {
  fetching: false,
  fetched: false,
  targets:[],
  error: null,
};

export default function targets(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_TARGETS_START:{
      return {
        ...state,
        fetching: true,
        fetched: false,
          error: null,
      };}
      case FETCH_TARGETS_FAIL: {
        return {
          ...state,
          fetching: false,
          fetched: false,
          targets: [],
          error: action.payload.error }
      }
      case FETCH_TARGETS_PASS: {
        return {
          ...state,
          fetching: false,
          fetched: true,
          targets: action.payload,
        }
      }
      default:{
        return state;
      }

    }

}
