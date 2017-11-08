
import { queryStatData } from "../api/graphQL"
import {
  FETCH_STAT_DATA_PASS,
  FETCH_STAT_DATA_FAIL,
  FETCH_STAT_DATA_START
} from "../types";

function status(s){
  let stat
  if(s === "1" || s === "10"){
    stat = "Old"
  }
  else {
    if (s === "7") {
        stat = "New"
      } else{
        console.log(s);
        stat = "Unknown" };
  }
return stat
}

function isP4(p){
  return p === 1
}

export const convertData = statData => {
  console.log(statData);
  const proposals = statData.proposals.map( proposal =>   (
    {
      proposalId: proposal.ProposalId,
      proposalCode: proposal.proposalcode.ProposalCode,
      isP4: isP4(proposal.proposalInfo.P4),
      status: status(proposal.proposalInfo.proposalstatus.ProposalStatusId)

    } )


);
  const targets = []
  return {
    proposals,
    targets
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
      dispatch(FetchDataPass(convertData(res.data.data)))
    ).catch(() => {
      dispatch(FetchDataFail())})
  }
}
