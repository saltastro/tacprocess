import {
  FETCH_WEATHER_DOWN_TIME_START,
  FETCH_WEATHER_DOWN_TIME_PASS,
  FETCH_WEATHER_DOWN_TIME_FAIL
} from '../types'

const initialState = {
  fetching: false,
  fetched: false,
  weatherDownTime: {},
  errors: {
    fetchingError: null
  }
}

export default function weatherDownTime (state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_WEATHER_DOWN_TIME_START: {
      return {
        ...state,
        fetching: true,
        fetched: false
      }
    }
    case FETCH_WEATHER_DOWN_TIME_FAIL: {
      return {
        ...state,
        fetching: false,
        fetched: false,
        weatherDownTime: {},
        errors: {
          ...state.errors,
          fetchingError: action.payload.error
        }
      }
    }
    case FETCH_WEATHER_DOWN_TIME_PASS: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        errors: {
          ...state.errors,
          fetchingError: null
        },
        weatherDownTime: action.payload.weatherDownTime
      }
    }
    default: {
      return state
    }
  }
}
