import {
  SUBMIT_LIAISON_ASTRONOMERS_FAIL,
  SUBMIT_LIAISON_ASTRONOMERS_PASS,
  SUBMIT_LIAISON_ASTRONOMERS_START
} from '../types'
import fetchProposals from './proposalsActions'
import {jsonClient} from '../api'


function submitLiaisonStart() {
  return {
    type: SUBMIT_LIAISON_ASTRONOMERS_START
  }
}

function submitLiaisonPass() {
  return {
    type: SUBMIT_LIAISON_ASTRONOMERS_PASS
  }
}

function submitLiaisonFail(message) {
  return {
    type: SUBMIT_LIAISON_ASTRONOMERS_FAIL,
    payload:{
      error: message
    }
  }
}

/**
 * It will submit to the jsonClient which will set if no liaison or update liaison for all proposals in parameters
 * @params proposals
 * @params semesters
 * @params partners
 */
export default function submitProposalsLiaison(proposals, semester, partner){
  return async (dispatch) => {
    dispatch(submitLiaisonStart());
    const assignments = proposals.map(p => ({
      proposalCode: p.proposalCode,
      liaisonAstronomer: p.liaisonAstronomer
    }))
    try {
      await jsonClient().post('liaison-astronomers', {assignments});
    } catch (e) {
      dispatch(submitLiaisonFail(e.message));
      return;
    }
    dispatch(fetchProposals(semester, partner));
    dispatch(submitLiaisonPass());
  }
}
