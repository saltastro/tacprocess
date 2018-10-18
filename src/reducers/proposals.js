import {
  FETCH_PROPOSALS_START, FETCH_PROPOSALS_PASS, FETCH_PROPOSALS_FAIL,
  UPDATE_SINGLE_PROPOSAL, UPDATING_PROPOSALS,
  UPDATE_TECHNICAL_REVIEW,
  SUBMIT_TECHNICAL_REVIEWS_START, SUBMIT_TECHNICAL_REVIEWS_PASS, SUBMIT_TECHNICAL_REVIEWS_FAIL,
  UPDATE_TAC_COMMENT, UPDATE_ALLOCATED_PRIORITY,
  SUBMIT_TIME_ALLOCATIONS_START, SUBMIT_TIME_ALLOCATIONS_FAIL, SUBMIT_TIME_ALLOCATIONS_PASS,
  USER_LOGGED_OUT, LIAISON_SELECTED, SET_LIAISON_ASTRONOMER, UNSET_LIAISON_ASTRONOMER
} from '../types'
import {setDefaultTechReviews} from '../util/technicalReports'

const initialState = {
  fetching: false,
  fetched: false,
  submittingTechnicalReviews: false,
  submittedTechnicalReviews: false,
  submittingTimeAllocations: false,
  submittedTimeAllocations: {},
  unSubmittedTacChanges: false,
  proposals:[],
  initProposals: [],
  errors: {
    fetchingError : null,
    submittingError : null,
    submittingReviewsError : null,
  },
}

export default function proposals(state = initialState, action = {}) {
  switch (action.type) {
  case FETCH_PROPOSALS_START:{
    return {
      ...state,
      fetching: true,
      fetched: false,
    }}
  case FETCH_PROPOSALS_FAIL: {
    return {
      ...state,
      fetching: false,
      fetched: false,
      proposals: [],
      initProposals: [],
      errors: {
        ...state.errors,
        fetchingError: action.payload.error
      }
    }
  }
  case FETCH_PROPOSALS_PASS: {
    return {
      ...state,
      fetching: false,
      fetched: true,
      errors: {
        ...state.errors,
        fetchingError: null
      },
      proposals: setDefaultTechReviews(action.payload.proposals, action.payload.semester),
      initProposals: JSON.parse(JSON.stringify(setDefaultTechReviews(action.payload.proposals, action.payload.semester)))
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
  case UPDATE_TECHNICAL_REVIEW: {
    return {
      ...state,
      submittedTechnicalReports: false,
      proposals: state.proposals.map(p => {
        if (p.proposalCode === action.payload.proposalCode) {
          return {
            ...p,
            techReviews: {
              ...p.techReviews,
              [ action.payload.semester ]: action.payload.techReview
            },
            liaisonAstronomer: p.liaisonAstronomer ? p.liaisonAstronomer : action.payload.techReview.reviewer.username
          }
        }
        return p
      }),
    }
  }
  case SUBMIT_TECHNICAL_REVIEWS_START: {
    return {
      ...state,
      submittingTechnicalReviews: true,
      submittedTechnicalReviews: false,
      errors: {
        ...state.errors,
        submittingReviewsError: null
      }
    }
  }
  case SUBMIT_TECHNICAL_REVIEWS_PASS: {
    return {
      ...state,
      submittingTechnicalReviews: false,
      submittedTechnicalReviews: true,
    }
  }
  case SUBMIT_TECHNICAL_REVIEWS_FAIL: {
    return {
      ...state,
      submittingTechnicalReviews: false,
      submittedTechnicalReviews: false,
      errors: {
        ...state.errors,
        submittingReviewsError: action.payload.error,

      }
    }
  }
  case UPDATE_TAC_COMMENT: {
    const commentForPartner = { [ action.payload.partner ]: { 'comment': action.payload.tacComment } }
    return {
      ...state,
      unSubmittedTacChanges: {
        ...state.unSubmittedTacChanges,
        [ action.payload.partner ]: true
      },
      proposals: state.proposals.map(p => {
        if (p.proposalCode === action.payload.proposalCode) {
          return {
            ...p,
            tacComment: commentForPartner
          }
        }
        return p

      })
    }
  }
  case UPDATE_ALLOCATED_PRIORITY: {
    const {partner} = action.payload
    return {
      ...state,
      unSubmittedTacChanges: { [ partner ]: true },
      proposals: state.proposals.map(p => {
        if (p.proposalCode === action.payload.proposalCode) {
          if ( !p.allocatedTime[ partner ]){p.allocatedTime[ partner ] = {
            p0: 0, p1: 0, p2: 0, p3: 0, p4: 0
          }}
          return {
            ...p,
            allocatedTime: {
              ...p.allocatedTime,
              [ partner ]: {
                ...p.allocatedTime[ partner ],
                [ action.payload.priority ]: action.payload.time
              }
            }
          }
        }
        return p

      })
    }
  }
  case SUBMIT_TIME_ALLOCATIONS_START: {
    return {
      ...state,
      submittingTimeAllocations: true,
      submittedTimeAllocations: {},
    }
  }
  case SUBMIT_TIME_ALLOCATIONS_FAIL: {
    return {
      ...state,
      submittingTimeAllocations: false,
      submittedTimeAllocations: {
        results: false,
        partner: action.payload.partner
      },
      errors: {
        ...state.errors,
        submittingError: action.payload.error,

      }
    }
  }
  case SUBMIT_TIME_ALLOCATIONS_PASS: {
    return {
      ...state,
      submittingTimeAllocations: false,
      submittedTimeAllocations: {
        results: true,
        partner: action.payload.partner
      },
      unSubmittedTacChanges: false,
      errors: {
        ...state.errors,
        submittingError: null,

      }
    }
  }
  case USER_LOGGED_OUT: {
    return {
      ...initialState
    }
  }
	case LIAISON_SELECTED: {
	  return {
	    ...state,
      fetching: false,
      fetched: true,
      proposals: state.proposals.map(proposal => {
				const {liaison} = action.payload
        if (proposal.proposalCode === liaison.proposalCode){
				  return {
            ...proposal,
            possibleLiaison: liaison.liaison
          }
        }
        return proposal
      }),
    }
	}
	case SET_LIAISON_ASTRONOMER: {
    return {
      ...state,
      proposals: state.proposals.map(proposal => {
        if (proposal.proposalCode === action.payload.proposalCode){
          return {
            ...proposal,
            liaisonAstronomer: action.payload.astronomerUsername
          }
        }
        return proposal
      }),
    }
  }
  case UNSET_LIAISON_ASTRONOMER: {
    return {
      ...state,
      proposals: state.proposals.map(proposal => {
        if (proposal.proposalCode === action.payload.proposalCode){
          return {
            ...proposal,
            liaisonAstronomer: null
          }
        }
        return proposal
      }),
    }
  }
  default: {
    return state
  }

  }

}
