
import { queryStatData } from "../api/graphQL"
import {
  FETCH_STAT_DATA_PASS,
  FETCH_STAT_DATA_FAIL,
  FETCH_STAT_DATA_START,
  ALL_PARTNER,
  UPDATE_SINGLE_PROPOSAL
} from "../types";

function isNewProposal(distributedTimes, semester){
  return distributedTimes.some(t => t.semester > semester)
}

function isLongTermProposal(distributedTimes, semester){
  return distributedTimes.some(t => t.semester !== semester )
}
//
// function makeAllocatedTime(alloc, partner){
//     const allocForPartner = alloc.filter(a => partner === ALL_PARTNER || a.partnerCode == partner);
//     return allocForPartner.reduce((prev, a) => {
//           const updated = { ...prev };
//           [0, 1, 2, 3, 4].forEach(priority => {
//             const key = `p${priority}`;
//             updated[key] += (a[key] || 0);
//         }), {
//            p0: 0, p1: 0, p2: 0, p3: 0, p4: 0
//          }
//        )
//
// }

function makeAllocatedTime(alloc, partner){
    const allocForPartner = alloc.filter(a => partner === ALL_PARTNER || a.partnerCode === partner)
    return allocForPartner.reduce((prev, a) => {
      const updated = { ...prev };
      [0, 1, 2, 3, 4].forEach(priority => {
        const key = `p${priority}`
        updated[key] = a[key] || 0
      });
      return updated;
    }, { p0: 0, p1: 0, p2: 0, p3: 0, p4: 0 })
}

function minimumTotalRequested(distributedTimes, semester){
  let total = 0
  let minimum = 0
  distributedTimes.forEach( t => {
    if (t.semester === semester ){
      minimum = t.minimumUsefulTime
      t.distribution.forEach( d => { total += parseFloat(d.time) }
    )}
  })
  return { total, minimum }
}

function convertData (statData, semester, partner) {
  const proposals = statData.proposals.map( proposal =>   {
    const minTotal  = minimumTotalRequested(proposal.timeRequests, semester)

    return ({
      proposalId: proposal.id,
      title: proposal.title,
      abstract: proposal.abstract,
      proposalCode: proposal.code,
      isP4: proposal.isP4,
      status: proposal.status,
      maxSeeing: proposal.maxSeeing,
      transparency: proposal.transparency,
      isNew: isNewProposal(proposal.timeRequests, semester),
      isLong: isLongTermProposal(proposal.timeRequests, semester),
      totalRequestedTime: minTotal.total,
      timeRequests: proposal.timeRequests,
      minTime: minTotal.minimum,
      instruments: proposal.instruments,
      pi: `${ proposal.pi.surname } ${ proposal.pi.name }`,
      report: proposal.techReport,
      allocatedTime: makeAllocatedTime(proposal.allocatedTime, partner)
    })
  }
);

  const targets = statData.targets.map(target => (
          {
              targetId: target.id,
              optional: target.optional,
              ra: target.coordinates.ra / 15,
              dec: target.coordinates.dec
          }
  ));
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

export function FetchDataPass(load) {
  return (
    {
       type: FETCH_STAT_DATA_PASS,
       payload: load
  }
);
}

export function updateSingleProposal(load) {
  return (
    {
       type: UPDATE_SINGLE_PROPOSAL,
       payload: load
  }
);
}

export function fetchStatData(semester, partner="All"){
  return function disp(dispatch){
    dispatch(startFetchData());
    queryStatData(semester, partner).then( res =>
      {
        dispatch(FetchDataPass(convertData(res.data.data, semester, partner)))
      }
    ).catch(() => {
      dispatch(FetchDataFail())})
  }
}
