import { queryPartnerStatObservations, queryPartnerStatProposals } from '../api/graphQL'
import { isCompletionCommentUpdated } from '../util/filters'
import { calculateTotalObservation, semesterComment } from '../util/partner-stat'
import {
  FETCH_PARTNER_STAT_PROPOSALS_START,
  FETCH_PARTNER_STAT_PROPOSALS_PASS,
  FETCH_PARTNER_STAT_PROPOSALS_FAIL,
  UPDATE_PARTNER_STAT_COMMENT,
  SUBMIT_PARTNER_STAT_COMMENT_START,
  SUBMIT_PARTNER_STAT_COMMENT_PASS,
  SUBMIT_PARTNER_STAT_COMMENT_FAIL,
  TOTAL_PARTNER_STAT_OBSERVATION
} from '../types'
import { jsonClient } from '../api'

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

export function updateCompletenessComment (proposalCode, semester, completionComment) {
  return {
    type: UPDATE_PARTNER_STAT_COMMENT,
    payload: {
      proposalCode,
      semester,
      completionComment
    }
  }
}

export function totalObservation (total) {
  return {
    type: TOTAL_PARTNER_STAT_OBSERVATION,
    payload: total
  }
}

export default function fetchPartnerStatProposals (semester, partner = 'All') {
  return async function disp (dispatch) {
    dispatch(startFetchPartnerStatProposals())
    try {
      const observations = await queryPartnerStatObservations(semester)
      dispatch(totalObservation(calculateTotalObservation(observations)))

      const partnerStatProposals = await queryPartnerStatProposals(semester, partner)
      dispatch(fetchPartnerStatProposalsPass(partnerStatProposals, semester))
    } catch (e) {
      dispatch(fetchPartnerStatProposalsFail(e.message))
    }
  }
}

function submittingPartnerStatCommentStart () {
  return {
    type: SUBMIT_PARTNER_STAT_COMMENT_START
  }
}

function submittingPartnerStatCommentFail (error) {
  return {
    type: SUBMIT_PARTNER_STAT_COMMENT_FAIL,
    payload: { error }
  }
}

function submittingPartnerStatCommentPass () {
  return {
    type: SUBMIT_PARTNER_STAT_COMMENT_PASS
  }
}

/**
 * An action for submitting completion comment.
 *
 * @param proposals Proposals whose completion comment are submitted, if they have changed.
 * @param initProposals Proposals downloaded from the server. They are used to check whether completion comment changed.
 * @param semester Semester, such as "2018-1".
 * @param partner Partner, such as "RSA"
 */
export function submitCompletionComment (proposals, initProposals, semester, partner) {
  return async (dispatch) => {
    dispatch(submittingPartnerStatCommentStart())
    const updatedProposals = proposals.filter(p => isCompletionCommentUpdated(p, initProposals, semester))
    const completionComments = updatedProposals.map(p => (
      {
        proposalCode: p.proposalCode,
        comment: semesterComment(p, semester)
      }
    ))
    try {
      await jsonClient().post('completion-comments', {semester, completionComments})
    } catch (e) {
      dispatch(submittingPartnerStatCommentFail(e.message))
      return
    }
    dispatch(fetchPartnerStatProposals(semester, partner))
    dispatch(submittingPartnerStatCommentPass())
  }
}
