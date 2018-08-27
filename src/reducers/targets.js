import {
  FETCH_TARGETS_START,
  FETCH_TARGETS_PASS,
  FETCH_TARGETS_FAIL,
  USER_LOGGED_OUT,
} from '../types'

const initialState = {
  fetching: false,
  fetched: false,
  targets:[],
  error: null,
}

export default function targets(state = initialState, action = {}) {
  switch (action.type) {
  case FETCH_TARGETS_START:{
    return {
      ...state,
      fetching: true,
      fetched: false,
      error: null,
    }}
  case FETCH_TARGETS_FAIL: {
    return {
      ...state,
      fetching: false,
      fetched: false,
      targets: [],
      errors: action.payload.error }
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
  case USER_LOGGED_OUT: {
    return initialState
  }
  default:{
    return state
  }
		
  }
	
}
