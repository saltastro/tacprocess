import {
  TIME_ALLOCATIONS_QUERY_START,
  TIME_ALLOCATIONS_QUERY_PASS,
  TIME_ALLOCATIONS_QUERY_FAIL,
  SUBMIT_TIME_ALLOCATIONS_START,
  SUBMIT_TIME_ALLOCATIONS_PASS,
  SUBMIT_TIME_ALLOCATIONS_FAIL,
} from "../types";

const initState = {
    data:{
        p0p1: 0,
        p2: 0,
        p3: 0
      },
    submiting: false,
    }

export default function statistics(state=initState, action = {}) {
  switch (action.type) {
    case TIME_ALLOCATIONS_QUERY_START:{
      return {
        ...state,
        fetching: true,
        fetched: false,
      };}
      case TIME_ALLOCATIONS_QUERY_FAIL: {
        return {
          ...state,
          fetching: false,
          fetched: false,
          errors: "Fail to get statistics data from api" }
      }
      case TIME_ALLOCATIONS_QUERY_PASS: {
        return {
          ...state,
          fetching: false,
          fetched: true,
          data: action.timeallocation,
        }
      }
      case SUBMIT_TIME_ALLOCATIONS_PASS: {
        return {
          ...state,
          submiting: false,
          submited: true,
        }
      }
      case SUBMIT_TIME_ALLOCATIONS_FAIL: {
        return {
          ...state,
          submiting: false,
          submited: false,
        }
      }
      case SUBMIT_TIME_ALLOCATIONS_START: {
        return {
          ...state,
          submiting: true,
          submited: false,
        }
      }

      default:{
        return state;
      }

    }

}
