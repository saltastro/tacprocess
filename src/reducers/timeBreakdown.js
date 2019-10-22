import {
  FETCH_TIME_BREAKDOWN_START,
  FETCH_TIME_BREAKDOWN_PASS,
  FETCH_TIME_BREAKDOWN_FAIL
} from '../types'

const initialState = {
  fetching: false,
  fetched: false,
  timeBreakdown: {},
  errors: {
    fetchingError: null
  }
}

export default function timeBreakdown (state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_TIME_BREAKDOWN_START: {
      return {
        ...state,
        fetching: true,
        fetched: false
      }
    }
    case FETCH_TIME_BREAKDOWN_FAIL: {
      return {
        ...state,
        fetching: false,
        fetched: false,
        timeBreakdown: {},
        errors: {
          ...state.errors,
          fetchingError: action.payload.error
        }
      }
    }
    case FETCH_TIME_BREAKDOWN_PASS: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        errors: {
          ...state.errors,
          fetchingError: null
        },
        timeBreakdown: action.payload.timeBreakdown
      }
    }
    default: {
      return state
    }
  }
}
