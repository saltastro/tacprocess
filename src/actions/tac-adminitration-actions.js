import {jsonClient} from '../api'
import {fetchTacMembers} from './AdminActions'
import {SUBMIT_NEW_TAC_FAIL, SUBMIT_NEW_TAC_PASS, SUBMIT_NEW_TAC_START} from '../types'

function submitNewTacMembersStart() {
  return {
    type: SUBMIT_NEW_TAC_START
  };
}

function submitNewTacMembersFail(message) {
  return {
    type: SUBMIT_NEW_TAC_FAIL,
    payload: {
      error: message
    }
  }
}

function submitNewTacMembersPass() {
  return {
    type: SUBMIT_NEW_TAC_PASS
  };
}

/**
 * It will submit to the jsonClient which will set if no liaison or update liaison for all proposals in parameters
 * @params tac
 * @return function
 */
export default function submitNewTacMembers(tacMembers, partner){
  console.log('------------------------------')
  return async (dispatch) => {
    dispatch(submitNewTacMembersStart());
    console.log("++++++++++ in +++++++++++")
    const members = tacMembers.map(m => ({
      member: m.username
    }))
    try {
      console.log("X XXX XXX XXX XXX XXX X")
      await jsonClient().post('update_tac_members', {members, partner});
    } catch (e) {
      dispatch(submitNewTacMembersFail(e.message));
      return;
    }
    dispatch(fetchTacMembers());
    dispatch(submitNewTacMembersPass());
  }
}