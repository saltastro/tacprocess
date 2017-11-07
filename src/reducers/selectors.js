import {
  FETCH_SELECTOR_DATA_START,
  FETCH_SELECTOR_DATA_PASS,
  FETCH_SELECTOR_DATA_FAIL,
  PAGE_CHANGE
} from "../types";

const initialState = {
  fetching: false,
  errors: false,
  payload: {
      partners: ["None"],
      semesters:["None"]
  },
  selecterSemester: "2017-1",
  selecterPartner: "All",
  currentPage: "HomePage"

};

export default function selectors(state=initialState, action={}) {
  switch (action.type) {
    case FETCH_SELECTOR_DATA_START:{
      return {
        ...state,
        fetching: true,
        errors: false,
      };}
      case FETCH_SELECTOR_DATA_FAIL: {
        return {
          ...state,
          fetching: false,
          errors: true}
      }
      case FETCH_SELECTOR_DATA_PASS: {
        return {
          ...state,
          fetching: false,
          errors: false,
          payload: action.payload,
        }
      }
      case PAGE_CHANGE: {
        return {
          ...state,
          currentPage: action.payload,
        }
      }
      default:{
        return state;
      }

    }

}
