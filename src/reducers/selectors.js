import {
  FETCH_SELECTOR_DATA_START,
  FETCH_SELECTOR_DATA_PASS,
  FETCH_SELECTOR_DATA_FAIL,
  PAGE_CHANGE,
  SEMESTER_CHANGE,
  PARTNER_CHANGE,
} from "../types";

const initialState = {
  fetching: false,
  errors: false,
  payload: {
      partners: ["None"],
      semesters:["None"]
  },
  selectedSemester: "2017-1",
  selectedPartner: "All",
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
      case SEMESTER_CHANGE: {
        return {
          ...state,
          selectedSemester: action.payload,
        }
      }
      case PARTNER_CHANGE: {
        return {
          ...state,
          selectedPartner: action.payload,
        }
      }
      default:{
        return state;
      }

    }

}
