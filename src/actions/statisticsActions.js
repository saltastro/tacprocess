
import { queryStatData } from "../api/graphQL"
import {
  FETCH_STAT_DATA_PASS,
  FETCH_STAT_DATA_FAIL,
  FETCH_STAT_DATA_START
} from "../types";

function isNew(req, sem ){
  let isnew = true
  req.map( r => {
    if (sem > r.forSemester ){
      isnew =  false }
    return r
  } )
  return isnew
}

function isLong(req, sem ){
  let islong = false
  req.map( r => {
    if (sem !== r.forSemester ){
      islong =  true }
    return r
  } )
  return islong
}

export const convertData = (statData, semester) => {
  const proposals = statData.proposalsM.map( proposal =>   (
    {
      proposalId: proposal.proposalId,
      proposalCode: proposal.proposalCode,
      isP4: proposal.generalInfo.isP4,
      status: proposal.generalInfo.status,
      maxSeeing: proposal.generalInfo.maxSeeing,
      transparency: proposal.generalInfo.transparency,
      isNew: isNew(proposal.requesterTime, semester),
      isLong: isLong(proposal.requesterTime, semester),
      requestedTime: proposal.requesterTime
    } )
);

  const targets = statData.targets
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
      dispatch(FetchDataPass(convertData(res.data.data, semester)))
    ).catch(() => {
      dispatch(FetchDataFail())})
  }
}
