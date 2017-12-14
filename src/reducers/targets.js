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
  selecterSemester: "2017-1",
  selecterPartner: "All",
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
        console.log(">>>>", action.payload);
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
