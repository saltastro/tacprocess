import { queryPartnerShareTimes } from '../api/graphQL'
import {
  FETCH_PARTNER_SHARE_TIMES_START,
  FETCH_PARTNER_SHARE_TIMES_PASS,
  FETCH_PARTNER_SHARE_TIMES_FAIL
} from '../types'

function fetchPartnerShareTimesStart () {
  return (
    {
      type: FETCH_PARTNER_SHARE_TIMES_START
    }
  )
}

function fetchPartnerShareTimesFail (error) {
  return (
    {
      type: FETCH_PARTNER_SHARE_TIMES_FAIL,
      payload: { error }
    }
  )
}

export function fetchPartnerShareTimesPass (partnerShareTimes, semester) {
  return (
    {
      type: FETCH_PARTNER_SHARE_TIMES_PASS,
      payload: {
        partnerShareTimes,
        semester
      }
    }
  )
}

/**
 * Fetch the partner share times
 * @param semester
 * @param partner
 * @returns {function}
 */
export default function fetchPartnerShareTimes (semester, partner = 'All') {
  return function disp (dispatch) {
    dispatch(fetchPartnerShareTimesStart())
    queryPartnerShareTimes(semester, partner)
      .then(res => { dispatch(fetchPartnerShareTimesPass(res, semester)) }
      )
      .catch((e) => {
        dispatch(fetchPartnerShareTimesFail(e.message))
      })
  }
}
