import {
  TIME_ALLOCATIONS_QUERY_START,
  TIME_ALLOCATIONS_QUERY_PASS,
  TIME_ALLOCATIONS_QUERY_FAIL
} from "../types";

const initState = {
    data:{
        p0p1: 0,
        p2: 0,
        p3: 0
      }
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
      default:{
        return state;
      }

    }

}
