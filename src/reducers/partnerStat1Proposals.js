import {
  FETCH_PARTNER_STAT1_PROPOSALS_START,
  FETCH_PARTNER_STAT1_PROPOSALS_PASS,
  FETCH_PARTNER_STAT1_PROPOSALS_FAIL
} from '../types'

const initialState = {
  fetching: false,
  fetched: false,
  proposals: [],
  initProposals: [],
  errors: {
    fetchingError: null
  }
}

export default function partnerStat1Proposals (state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_PARTNER_STAT1_PROPOSALS_START: {
      return {
        ...state,
        fetching: true,
        fetched: false
      } }
    case FETCH_PARTNER_STAT1_PROPOSALS_FAIL: {
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
    case FETCH_PARTNER_STAT1_PROPOSALS_PASS: {
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
    default: {
      return state
    }
  }
}
