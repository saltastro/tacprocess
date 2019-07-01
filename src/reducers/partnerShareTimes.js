import {
  FETCH_PARTNER_SHARE_TIMES_START,
  FETCH_PARTNER_SHARE_TIMES_PASS,
  FETCH_PARTNER_SHARE_TIMES_FAIL
} from '../types'

const initialState = {
  fetching: false,
  fetched: false,
  partnerShareTimes: [],
  errors: {
    fetchingError: null
  }
}

export default function partnerShareTimes (state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_PARTNER_SHARE_TIMES_START: {
      return {
        ...state,
        fetching: true,
        fetched: false
      }
    }
    case FETCH_PARTNER_SHARE_TIMES_FAIL: {
      return {
        ...state,
        fetching: false,
        fetched: false,
        partnerShareTimes: [],
        errors: {
          ...state.errors,
          fetchingError: action.payload.error
        }
      }
    }
    case FETCH_PARTNER_SHARE_TIMES_PASS: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        errors: {
          ...state.errors,
          fetchingError: null
        },
        partnerShareTimes: action.payload.partnerShareTimes,
      }
    }
    default: {
      return state
    }
  }
}
