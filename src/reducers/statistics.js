import {
  FETCH_STAT_DATA,
  FETCH_STAT_DATA_REJECTED,
  FETCH_STAT_DATA_FULFILLED
} from "../types";

const initialState = {
  fetching: false,
  fetched: false,
  data: {
    data:{
      proposals:[]
    }
  },
  error: null,
};

export default function statistics(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_STAT_DATA:{
      return {
        ...state,
        fetching: true,
        fetched: false,
      };}
      case FETCH_STAT_DATA_REJECTED: {
        return {
          ...state,
          fetching: false,
          fetched: true,
          errors: action.payload}
      }
      case FETCH_STAT_DATA_FULFILLED: {
        return {
          ...state,
          fetching: false,
          fetched: true,
          data: action.payload,
        }
      }
      default:{
        return state;
      }

    }

}
