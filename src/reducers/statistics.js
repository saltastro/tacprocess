import {
  FETCH_STAT_DATA_START,
  FETCH_STAT_DATA_PASS,
  FETCH_STAT_DATA_FAIL,
  UPDATE_SINGLE_PROPOSAL
} from "../types";

const initialState = {
  fetching: false,
  fetched: false,
  data: {
    data:{
      proposals:[],
      targets:[]
    }
  },
  error: null,
  selecterSemester: "2017-1",
  selecterPartner: "All",
};

export default function statistics(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_STAT_DATA_START:{
      return {
        ...state,
        fetching: true,
        fetched: false,
      };}
      case FETCH_STAT_DATA_FAIL: {
        return {
          ...state,
          fetching: false,
          fetched: false,
          errors: "Fail to get statistics data from api" }
      }
      case FETCH_STAT_DATA_PASS: {
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
