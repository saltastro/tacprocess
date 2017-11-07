
import { queryStatData } from "../api/graphQL"
import {
  FETCH_STAT_DATA_PASS,
  FETCH_STAT_DATA_FAIL,
  FETCH_STAT_DATA_START
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

function startFetchData() {
  return (
    {
       type: FETCH_STAT_DATA_START
  }
);

}
function FetchDataFail() {
  return (
    {
       type: FETCH_STAT_DATA_FAIL
  }
);
}

function FetchDataPass(load) {
  return (
    {
       type: FETCH_STAT_DATA_PASS,
       payload: load
  }
);
}

export function fetchStatData(semester, partner="All"){
  return function disp(dispatch){
    dispatch(startFetchData());
    queryStatData(semester, partner).then( res =>
      dispatch(FetchDataPass(res.data.data))
    ).catch(() => dispatch(FetchDataFail()))
  }
}
