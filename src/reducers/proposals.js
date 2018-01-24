import {
    FETCH_PROPOSALS_START,
    FETCH_PROPOSALS_PASS,
    FETCH_PROPOSALS_FAIL,
    UPDATE_SINGLE_PROPOSAL,
    UPDATING_PROPOSALS,
    UPDATE_LIAISON_ASTRONOMER,
    UPDATE_TECHNICAL_REPORT, SUBMIT_LIAISON_ASTRONOMERS_START, SUBMIT_LIAISON_ASTRONOMERS_PASS,
    SUBMIT_LIAISON_ASTRONOMERS_FAIL, SUBMIT_TECHNICAL_REPORTS_START, SUBMIT_TECHNICAL_REPORTS_PASS,
    SUBMIT_TECHNICAL_REPORTS_FAIL
} from "../types";

const initialState = {
  fetching: false,
  fetched: false,
    submittingLiaisonAstronomers: false,
    submittedLiaisonAstronomers: false,
    submittingTechnicalReports: false,
    submittedTechnicalReports: false,
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
          submittedLiaisonAstronomers: false,
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
          submittedTechnicalReports: false,
          proposals: state.proposals.map(p => {
            if (p.proposalCode === action.payload.proposalCode) {
              return {
                  ...p,
                  techReport: action.payload.techReport
              }
            } else {
                return p;
            }
          })
      }
  }
  case SUBMIT_LIAISON_ASTRONOMERS_START: {
    return {
            ...state,
        submittingLiaisonAstronomers: true,
        submittedLiaisonAstronomers: false,
        errors: null
    }
  }
  case SUBMIT_LIAISON_ASTRONOMERS_PASS: {
    return {
            ...state,
        submittingLiaisonAstronomers: false,
        submittedLiaisonAstronomers: true
    }
  }
  case SUBMIT_LIAISON_ASTRONOMERS_FAIL: {
    return {
            ...state,
        submittingLiaisonAstronomers: false,
        submittedLiaisonAstronomers: false,
        errors: "Submitting the liaison astronomers failed."
    }
  }
  case SUBMIT_TECHNICAL_REPORTS_START: {
    return {
            ...state,
        submittingTechnicalReports: true,
        submittedTechnicalReports: false,
        errors: null
    }
  }
  case SUBMIT_TECHNICAL_REPORTS_PASS: {
    return {
        ...state,
        submittingTechnicalReports: false,
        submittedTechnicalReports: true,
    }
  }
  case SUBMIT_TECHNICAL_REPORTS_FAIL: {
      return {
          ...state,
          submittingTechnicalReports: false,
          submittedTechnicalReports: false,
          errors: "Submitting the technical reports failed."
      }
  }
  default: {
      return state;
  }

    }

}
