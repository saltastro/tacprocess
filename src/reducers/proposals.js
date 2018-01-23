import {
    FETCH_PROPOSALS_START,
    FETCH_PROPOSALS_PASS,
    FETCH_PROPOSALS_FAIL,
     UPDATE_SINGLE_PROPOSAL,
     UPDATING_PROPOSALS,
    UPDATE_LIAISON_ASTRONOMER,
    UPDATE_TECHNICAL_REPORT
} from "../types";

const initialState = {
  fetching: false,
  fetched: false,
  proposals:[],
  errors: null,
};

export default function proposals(state = initialState, action = {}) {
  switch (action.type) {
  case FETCH_PROPOSALS_START:{
      return {
          ...state,
          fetching: true,
          fetched: false,
      };}
  case FETCH_PROPOSALS_FAIL: {
      return {
          ...state,
          fetching: false,
          fetched: false,
          errors: "Fail to get proposals from api" }
  }
  case FETCH_PROPOSALS_PASS: {
      return {
          ...state,
          fetching: false,
          fetched: true,
          errors: null,
          proposals: action.payload,
      }
  }
  case UPDATE_SINGLE_PROPOSAL: {
      return {
          ...state,
          fetching: false,
          fetched: true,
          proposals: action.payload,
      }
  }
  case UPDATING_PROPOSALS: {
      return {
          ...state,
          fetching: false,
          fetched: true,
          proposals: action.payload,
      }
  }
  case UPDATE_LIAISON_ASTRONOMER: {
      return {
          ...state,
          proposals: state.proposals.map(p => {
              if (p.proposalCode === action.payload.proposalCode) {
                  return {
                      ...p,
                      liaisonAstronomer: action.payload.liaisonAstronomer
                  }
              }
              else {
                  return p;
              }
          })
      }
  }
  case UPDATE_TECHNICAL_REPORT: {
      return {
              ...state,
          proposals: state.proposals.map(p => {
            if (p.proposalCode === action.payload.proposalCode) {
              return {
                  ...p,
                  techReport: action.payload.techReport
              }
            }
          })
      }
  }
  default:{
      return state;
  }

    }

}
