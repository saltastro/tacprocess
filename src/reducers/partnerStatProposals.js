import {
  FETCH_PARTNER_STAT_PROPOSALS_PASS,
  FETCH_PARTNER_STAT_PROPOSALS_START,
  FETCH_PARTNER_STAT_PROPOSALS_FAIL,
  UPDATE_PARTNER_STAT_COMMENT,
  SUBMIT_PARTNER_STAT_COMMENT_START,
  SUBMIT_PARTNER_STAT_COMMENT_PASS,
  SUBMIT_PARTNER_STAT_COMMENT_FAIL,
  USER_LOGGED_OUT
} from '../types'

const initialState = {
  fetching: false,
  fetched: false,
  submittingCompletionComment: false,
  submittedCompletionComment: false,
  proposals: [],
  initProposals: [],
  timeAllocations: [],
  observations: [],
  completionComments: [],
  errors: {
    fetchingError: null,
    submittingCommentError: ''
  }
}

export default function partnerStatProposals (state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_PARTNER_STAT_PROPOSALS_START: {
      return {
        ...state,
        fetching: true,
        fetched: false
      }
    }
    case FETCH_PARTNER_STAT_PROPOSALS_FAIL: {
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
    case FETCH_PARTNER_STAT_PROPOSALS_PASS: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        errors: {
          ...state.errors,
          fetchingError: null
        },
        proposals: action.payload.proposals,
        initProposals: JSON.parse(JSON.stringify(action.payload.proposals))
      }
    }
    case UPDATE_PARTNER_STAT_COMMENT: {
      return {
        ...state,
        proposals: state.proposals.map(p => {
          if (p.proposalCode === action.payload.proposalCode) {
            return {
              ...p,
              completionComments: p.completionComments.map(c => c.semester === action.payload.semester ?
                { semester: action.payload.semester, comment: action.payload.completionComment } :
                c
              )
            }
          }
          return p
        })
      }
    }
    case SUBMIT_PARTNER_STAT_COMMENT_START: {
      return {
        ...state,
        submittingCompletionComment: true,
        submittedCompletionComment: false
      }
    }
    case SUBMIT_PARTNER_STAT_COMMENT_PASS: {
      return {
        ...state,
        submittingCompletionComment: false,
        submittedCompletionComment: true
      }
    }
    case SUBMIT_PARTNER_STAT_COMMENT_FAIL: {
      return {
        ...state,
        errors: {
          fetchingError: null,
          submittingCommentError: 'Could not submit the completion stat comment'
        }
      }
    }
    case USER_LOGGED_OUT: {
      return {
        ...initialState
      }
    }
    default: {
      return state
    }
  }
}
