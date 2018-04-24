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

function submitNewTacMembersPass(partner) {
  return {
    type: SUBMIT_NEW_TAC_PASS,
    payload: {
      partner
    }
  };
}

/**
 * It will submit to the jsonClient which will set if no liaison or update liaison for all proposals in parameters
 * @params tac
 * @return function
 */
export default function submitNewTacMembers(newMembers, removedMembers, partner){
  return async (dispatch) => {
    dispatch(submitNewTacMembersStart());
    const added = newMembers.map(m => ({
      member: m.username,
      is_chair: 0
    }))
    const removed = removedMembers.map(m => ({
      member: m.username
    }))
    try {
      await jsonClient().post('update_tac_members', {members: added, partner});
      await jsonClient().post('remove_tac_members', {members: removed, partner});
    } catch (e) {
      dispatch(submitNewTacMembersFail(e.message));
      return;
    }
    dispatch(fetchTacMembers());
    dispatch(submitNewTacMembersPass(partner));
  }
}