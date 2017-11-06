
import { queryStatData } from "../api/graphQL"
import {
  FETCH_STAT_DATA_REJECTED,
  FETCH_STAT_DATA_FULFILLED
} from "../types";

export const convertData = statData => {
  const proposals = statData.proposals.map( proposal => (
    {
      proposalId: proposal.ProposalId,
      proposalCode: proposal.proposalcode.ProposalCode
    }
  ));
  return {
    proposals
  }
};


export const getStatData = semester => {
  console.log("called");
  queryStatData(semester)
  .then( data => {
    console.log("Data:", data);
    return data})
  .catch( err => err)
}

export function fetchStatData(semester){
  return function(dispatch){
    queryStatData(semester).then( res =>
      dispatch({type:FETCH_STAT_DATA_FULFILLED, payload: res.data.data})
    ).catch(err => {
      console.log(err);
    })
  }

}
