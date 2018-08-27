import {
  FETCH_SELECTOR_DATA_START,
  FETCH_SELECTOR_DATA_PASS,
  FETCH_SELECTOR_DATA_FAIL,
  SEMESTER_CHANGE,
  PARTNER_CHANGE,
  ASTRONOMER_CHANGE,
  USER_LOGGED_OUT
} from '../types'
import { defaultSemester } from '../util'

const initialState = {
  fetching: false,
  error: false,
  selectedSemester: defaultSemester(),
  selectedLiaison: 'All',
}

export default function selectors(state=initialState, action={}) {
  switch (action.type) {
  case FETCH_SELECTOR_DATA_START:{
    return {
      ...state,
      fetching: true,
      error: null,
    }}
  case FETCH_SELECTOR_DATA_FAIL: {
    return {
      ...state,
      fetching: false,
      error: action.payload.error
    }
  }
  case FETCH_SELECTOR_DATA_PASS: {
    return {
      ...state,
      fetching: false,
      filters: action.filters,
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
  case ASTRONOMER_CHANGE: {
    return {
      ...state,
      selectedLiaison: action.current,
    }
  }
  case USER_LOGGED_OUT: {
	    return {
		  ...initialState
	  }
  }
  default:{
    return state
  }

  }

}
