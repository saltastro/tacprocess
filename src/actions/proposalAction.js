/**
 * This file contains all the actions that will only affect one proposal 
 * 
 */
import {SET_LIAISON_ASTRONOMER, UNSET_LIAISON_ASTRONOMER} from '../types'


export const setLiaisonAstronomer = (proposalCode, astronomerUsername) => {
  if ( astronomerUsername ) return {
    type: SET_LIAISON_ASTRONOMER,
    payload: {
      proposalCode,
      astronomerUsername
    }
  }
  return {
    type: UNSET_LIAISON_ASTRONOMER,
    payload: {
      proposalCode,
      astronomerUsername
    }
  }
}