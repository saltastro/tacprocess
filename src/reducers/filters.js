import {
  FETCH_SELECTOR_DATA_START,
  FETCH_SELECTOR_DATA_PASS,
  FETCH_SELECTOR_DATA_FAIL,
  PAGE_CHANGE,
  SEMESTER_CHANGE,
  PARTNER_CHANGE,
} from "../types";

const today = new Date()
const month = today.getMonth() + 3
const year = today.getFullYear()
let semester
if ( month >= 3  && month < 9){ semester = 1 } else {
  semester = 2
}

const initialState = {
  fetching: false,
  errors: false,
  selectedSemester: `${year}-${semester}`,
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
          currentPage: action.current,
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
          selectedPartner: action.changeTo,
        }
      }
      default:{
        return state;
      }

    }

}
