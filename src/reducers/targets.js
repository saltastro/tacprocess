import {
  FETCH_TARGETS_START,
  FETCH_TARGETS_PASS,
  FETCH_TARGETS_FAIL,
} from "../types";

const initialState = {
  fetching: false,
  fetched: false,
  targets:[],
  errors: null,
};

export default function targets(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_TARGETS_START:{
      return {
        ...state,
        fetching: true,
        fetched: false,
      };}
      case FETCH_TARGETS_FAIL: {
        return {
          ...state,
          fetching: false,
          fetched: false,
          errors: "Fail to get targets from api" }
      }
      case FETCH_TARGETS_PASS: {
        return {
          ...state,
          fetching: false,
          fetched: true,
          errors: null,
          targets: action.payload,
        }
      }
      default:{
        return state;
      }

    }

}
