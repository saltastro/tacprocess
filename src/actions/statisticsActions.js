
import { queryStatData } from "../api/graphQL"
import {
  FETCH_STAT_DATA_PASS,
  FETCH_STAT_DATA_FAIL,
  FETCH_STAT_DATA_START
} from "../types";

function status(s){
  let status
  if(s === "1"){
    status = "Old"
  }else if (s === "7") {
    status = "New"
  } else{ status = "Unknown" };
  return status
}

function isP4(p){
  return p === 1
}

export const convertData = statData => {
  const proposals = statData.proposals.map( proposal =>   (
    {
      proposalId: proposal.ProposalId,
      proposalCode: proposal.proposalcode.ProposalCode,
      isP4: isP4(proposal.proposalInfo.P4),
      status: status(proposal.proposalInfo.proposalstatus.ProposalStatusId)

    } )


);
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
    ).catch(() => {
      console.log("FAiling");
      dispatch(FetchDataFail())})
  }
}
