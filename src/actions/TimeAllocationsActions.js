import {UPDATE_TAC_COMMENT, UPDATE_ALLOCATED_PRIORITY} from '../types'

/**
 * An action for updating the tac Comment of a proposal in the local store.
 *
 * @param proposalCode Proposal code, such as "2018-1-SCI-009".
 * @param semester Semester, such as "2018-1".
 * @param partner TAC Partnes.
 * @param tacComment Tac Comment.
 * @returns {{type, payload: {proposalCode: *, semester: *, partner: *, tacComment: *}}} The action.
 */
export function updateTacComment(proposalCode, semester, partner, tacComment) {
  return {
    type: UPDATE_TAC_COMMENT,
    payload: {
      proposalCode,
      semester,
      partner,
      tacComment
    }
  }
}

/**
 * An action for updating the tac Comment of a proposal in the local store.
 *
 * @param proposalCode Proposal code, such as "2018-1-SCI-009".
 * @param semester Semester, such as "2018-1".
 * @param partner TAC Partners.
 * @param time Time being allocated.
 * @param priority either p0, p1, p2, p3 or p4
 * @returns {{type, payload: {proposalCode: *, semester: *, partner: *, time: *, priority: *}}} The action.
 */

export function updateAllocatedTimePriority(proposalCode, semester, partner, time, priority) {
  return {
    type: UPDATE_ALLOCATED_PRIORITY,
    payload: {
      proposalCode,
      semester,
      partner,
      time,
      priority
    }
  }
}
