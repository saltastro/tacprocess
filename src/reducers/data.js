import {
  FETCHING_DATA,
  FETCHED_DATA, USER_LOGGED_OUT, FETCHING_DATA_FAIL
} from '../types';

const initialState = {
  fetchingData: false,
  fetchedData: false,
  error: null
};

export default function targets(state = initialState, action = {}) {
  switch (action.type) {
    case FETCHING_DATA:{
      return {
        ...state,
        fetchingData: true,
        fetchedData: false,
        error: null
      };}
    case FETCHED_DATA: {
      return {
        ...state,
        fetchingData: false,
        fetchedData: true,
      }
    }
    case FETCHING_DATA_FAIL: {
      return {
        ...state,
        fetchingData: false,
        fetchedData: false,
        error: action.payload.error
      }
    }
    case USER_LOGGED_OUT: {
      return initialState
    }
    default:{
      return state;
    }

  }

}
