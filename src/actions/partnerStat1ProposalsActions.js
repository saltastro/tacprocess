import { queryProposals } from '../api/graphQL'
import {
  FETCH_PARTNER_STAT1_PROPOSALS_START,
  FETCH_PARTNER_STAT1_PROPOSALS_PASS,
  FETCH_PARTNER_STAT1_PROPOSALS_FAIL
} from '../types'

function startFetchPartnerStat1Proposals () {
  return (
    {
      type: FETCH_PARTNER_STAT1_PROPOSALS_START
    }
  )
}

function fetchPartnerStat1ProposalsFail (error) {
  return (
    {
      type: FETCH_PARTNER_STAT1_PROPOSALS_FAIL,
      payload: { error }
    }
  )
}

export function fetchPartnerStat1ProposalsPass (proposals, semester) {
  return (
    {
      type: FETCH_PARTNER_STAT1_PROPOSALS_PASS,
      payload: {
        proposals,
        semester
      }
    }
  )
}

export default function fetchPartnerStat1Proposals (semester, partner = 'All') {
  return function disp (dispatch) {
    dispatch(startFetchPartnerStat1Proposals())
    queryProposals(semester, partner)
    .then(res => { dispatch(fetchPartnerStat1ProposalsPass(res, semester)) }
    )
    .catch((e) => {
      dispatch(fetchPartnerStat1ProposalsFail(e.message))
    })
  }
}
