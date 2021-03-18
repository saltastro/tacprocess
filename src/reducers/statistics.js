import {
  FETCH_STATISTICS_START,
  FETCH_STATISTICS_PASS,
  FETCH_STATISTICS_FAIL,
  FETCH_PARTNER_STATISTICS_START,
  FETCH_PARTNER_STATISTICS_PASS,
  FETCH_PARTNER_STATISTICS_FAIL
} from '../types'

const initialState = {
  fetching: false,
  fetched: false,
  statistics: {},
  errors: {
    fetchingError: null
  }
}

export default function statistics (state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_STATISTICS_START: {
      return {
        ...state,
        fetching: true,
        fetched: false
      }
    }
    case FETCH_STATISTICS_FAIL: {
      return {
        ...state,
        fetching: false,
        fetched: false,
        statistics: {},
        errors: {
          ...state.errors,
          fetchingError: action.payload.error
        }
      }
    }
    case FETCH_STATISTICS_PASS: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        errors: {
          ...state.errors,
          fetchingError: null
        },
        statistics: action.payload.statistics
      }
    }
    case FETCH_PARTNER_STATISTICS_START: {
      return {
        ...state,
        fetching: true,
        fetched: false
      }
    }
    case FETCH_PARTNER_STATISTICS_FAIL: {
      return {
        ...state,
        fetching: false,
        fetched: false,
        partnerStatistics: {},
        errors: {
          ...state.errors,
          fetchingError: action.payload.error
        }
      }
    }
    case FETCH_PARTNER_STATISTICS_PASS: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        errors: {
          ...state.errors,
          fetchingError: null
        },
        partnerStatistics: action.payload.partnerStatistics
      }
    }
    default: {
      return state
    }
  }
}