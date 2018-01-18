import { queryProposals } from "../api/graphQL"
import {
    FETCH_PROPOSALS_START,
    FETCH_PROPOSALS_PASS,
    FETCH_PROPOSALS_FAIL,
    UPDATING_PROPOSALS,
    UPDATE_SINGLE_PROPOSAL,
} from "../types";

function startFetchProposals() {
  return (
    {
       type: FETCH_PROPOSALS_START
  }
);

}
function FetchProposalsFail() {
  return (
    {
       type: FETCH_PROPOSALS_FAIL
  }
);
}

function FetchProposalsPass(proposals) {
  return (
    {
       type: FETCH_PROPOSALS_PASS,
       payload: proposals
  }
);
}

function isNewProposal(distributedTimes, semester){
  return distributedTimes.some(t => t.semester > semester)
}

function isLongTermProposal(distributedTimes, semester){
  return distributedTimes.some(t => t.semester !== semester )
}

function makeAllocatedTime(alloc){
  let allocations = {}
  alloc.forEach( a => {
    allocations[a.partnerCode] = {
      p0: (a.p0 === null) ? 0 : a.p0,
      p1: (a.p1 === null) ? 0 : a.p1,
      p2: (a.p2 === null) ? 0 : a.p2,
      p3: (a.p3 === null) ? 0 : a.p3,
      p4: (a.p4 === null) ? 0 : a.p4,
    }
  })
  return allocations
}

function makeTacComments(tComm){

  let tacComment = {};
  tComm.forEach( c => {
    tacComment[c.partnerCode] = {
      comment: c.comment == null ? "" : `${c.comment}`
    };
  });
  return tacComment;
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

function requestedTime(requests, semester){

  let reqTime = {
    minimum: 0,
    semester: semester,
    requests: {}
  }
  requests.forEach(p => {
    if (p.semester === semester){
      reqTime.minimum = p.minimumUsefulTime
      p.distribution.forEach(d => {
        reqTime.requests[d.partnerCode] = d.time
      })
    }
  })
  return reqTime
}

function convertProposals(proposals, semester, partner){
  const convertedProposals = proposals.proposals.map( proposal =>   {
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
      allocatedTime: makeAllocatedTime(proposal.allocatedTime, partner),
      tacComment: makeTacComments(proposal.tacComment, partner),
      requestedTime: requestedTime(proposal.timeRequests, semester)
    })
  }
);

  return convertedProposals
}

export default function fetchProposals(semester, partner="All"){
  return function disp(dispatch){
    dispatch(startFetchProposals());
    queryProposals(semester, partner).then( res =>
      {
        dispatch(FetchProposalsPass(convertProposals(res.data.data, semester, partner)))
      }
    ).catch(() => {
      dispatch(FetchProposalsFail())})
  }
}

export function updateSingleProposal(load) {
    return (
            {
                type: UPDATE_SINGLE_PROPOSAL,
                payload: load
            }
    );
}

export function updateProposals(load) {
    return (
            {
                type: UPDATING_PROPOSALS,
                payload: load
            }
    );
}
