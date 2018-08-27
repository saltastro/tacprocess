import { queryProposals } from '../api/graphQL'
import {
  FETCH_PROPOSALS_START,
  FETCH_PROPOSALS_PASS,
  FETCH_PROPOSALS_FAIL,
  UPDATING_PROPOSALS,
  SET_LIAISON_ASTRONOMER,
  UNSET_LIAISON_ASTRONOMER,
	LIAISON_SELECTED
} from '../types'

function startFetchProposals() {
  return (
    {
      type: FETCH_PROPOSALS_START
    }
  )

}

export function liaisonSelected(liaison) {
	return (
		{
			type: LIAISON_SELECTED,
			payload: {liaison}
		}
	)
}

function fetchProposalsFail(error) {
  return (
    {
      type: FETCH_PROPOSALS_FAIL,
      payload: { error }
    }
  )
}

export function fetchProposalsPass(proposals, semester) {
  return (
    {
      type: FETCH_PROPOSALS_PASS,
      payload: {
        proposals,
        semester
      }
    }
  )
}

export default function fetchProposals(semester, partner='All') {
  return function disp(dispatch){
    dispatch(startFetchProposals())
    queryProposals(semester, partner).then( res =>
    {
      dispatch(fetchProposalsPass(res, semester))
    }
    ).catch((e) => {
      dispatch(fetchProposalsFail(e.message))})
  }
}

export function updateProposals(load) {
  return (
    {
      type: UPDATING_PROPOSALS,
      payload: load
    }
  )
}

export function setLiaisonAstronomer(proposalCode, astronomerUsername) {
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
