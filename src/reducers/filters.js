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
  filters: {
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
          errors: true
        }
      }
      case FETCH_SELECTOR_DATA_PASS: {
        return {
          ...state,
          fetching: false,
          errors: false,
          filters: action.filters,
        }
      }
      case PAGE_CHANGE: {
        return {
          ...state,
          currentPage: action.filters,
        }
      }
      case SEMESTER_CHANGE: {
        return {
          ...state,
          selectedSemester: action.filters,
        }
      }
      case PARTNER_CHANGE: {
        return {
          ...state,
          selectedPartner: action.filters,
        }
      }
      default:{
        return state;
      }

    }

}
