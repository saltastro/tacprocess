import { queryPartnerStatProposals } from '../api/graphQL'
import {
  FETCH_PARTNER_STAT_PROPOSALS_START,
  FETCH_PARTNER_STAT_PROPOSALS_PASS,
  FETCH_PARTNER_STAT_PROPOSALS_FAIL,
  UPDATE_PARTNER_STAT_COMMENT
} from '../types'

function startFetchPartnerStatProposals () {
  return (
    {
      type: FETCH_PARTNER_STAT_PROPOSALS_START
    }
  )
}

function fetchPartnerStatProposalsFail (error) {
  return (
    {
      type: FETCH_PARTNER_STAT_PROPOSALS_FAIL,
      payload: { error }
    }
  )
}

export function fetchPartnerStatProposalsPass (proposals, semester) {
  return (
    {
      type: FETCH_PARTNER_STAT_PROPOSALS_PASS,
      payload: {
        proposals,
        semester
      }
    }
  )
}

export function updateComment (proposalCode, semester, completionComment) {
  return {
    type: UPDATE_PARTNER_STAT_COMMENT,
    payload: {
      proposalCode,
      semester,
      completionComment
    }
  }
}

export default function fetchPartnerStatProposals (semester, partner = 'All') {
  return function disp (dispatch) {
    dispatch(startFetchPartnerStatProposals())
    queryPartnerStatProposals(semester, partner)
      .then(res => { dispatch(fetchPartnerStatProposalsPass(res, semester)) }
      )
      .catch((e) => {
        dispatch(fetchPartnerStatProposalsFail(e.message))
      })
  }
}
