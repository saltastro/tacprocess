import { graphqlClient } from './index';
import {getTechReportFields} from "../util";
import { isNewProposal, isLongTermProposal } from "../util/proposal";
import {removeToken} from "../util/storage";


function makeTechReviews(techReviews) {
	
	return ( techReviews|| [] ).reduce((prev, tr) => ({
			...prev,
			[tr.semester]: {
				reviewer: tr.reviewer,
				...getTechReportFields(tr.report)
			}
		}), {});
}

function makeAllocatedTime(alloc){
	const allocations = {};
	alloc.forEach( a => {
		allocations[a.partnerCode] = {
			p0: (a.p0 === null) ? 0 : a.p0,
			p1: (a.p1 === null) ? 0 : a.p1,
			p2: (a.p2 === null) ? 0 : a.p2,
			p3: (a.p3 === null) ? 0 : a.p3,
			p4: (a.p4 === null) ? 0 : a.p4,
		}
	});
	return allocations
}

function makeTacComments(tComm){
	
	const tacComment = {};
	tComm.forEach( c => {
		tacComment[c.partnerCode] = {
			comment: c.comment == null ? "" : `${c.comment}`
		};
	});
	return tacComment;
}

function minimumTotalRequested(distributedTimes, semester){
	let total = 0;
	let minimum = 0;
	distributedTimes.forEach( t => {
		if (t.semester === semester ){
			minimum = t.minimumUsefulTime;
			t.distribution.forEach( d => { total += parseFloat(d.time) }
			)}
	});
	return { total, minimum }
}

function requestedTime(requests, semester){
	
	const reqTime = {
		minimum: 0,
		semester,
		requests: {}
	};
	requests.forEach(p => {
		if (p.semester === semester){
			reqTime.minimum = p.minimumUsefulTime;
			p.distribution.forEach(d => {
				reqTime.requests[d.partnerCode] = d.time
			})
		}
	});
	return reqTime
}

export function convertProposals(proposals, semester, partner){
	if (!proposals.proposals){ return []}
	return proposals.proposals.map( proposal => {
		const minTotal  = minimumTotalRequested(proposal.timeRequests, semester);
		return ({
			proposalId: proposal.id,
			title: proposal.title,
			abstract: proposal.abstract,
			proposalCode: proposal.code,
			isP4: proposal.isP4,
			status: proposal.status,
			actOnAlert: proposal.actOnAlert,
			maxSeeing: proposal.maxSeeing,
			transparency: proposal.transparency,
			isNew: isNewProposal(proposal, semester),
			isLong: isLongTermProposal(proposal, semester),
			isThesis: proposal.isThesis,
			totalRequestedTime: minTotal.total,
			timeRequests: proposal.timeRequests,
			minTime: minTotal.minimum,
			instruments: proposal.instruments,
			pi: `${ proposal.pi.surname } ${ proposal.pi.name }`,
			liaisonAstronomer: proposal.SALTAstronomer ? proposal.SALTAstronomer.username : null,
			techReviews: makeTechReviews(proposal.techReviews),
			allocatedTime: makeAllocatedTime(proposal.allocatedTime, partner),
			tacComment: makeTacComments(proposal.tacComment, partner),
			requestedTime: requestedTime(proposal.timeRequests, semester)
		})
	});
}

export const convertUserData = rowUser => ({
		firstName: rowUser.firstName,
		lastName: rowUser.lastName,
		email: rowUser.email,
		username: rowUser.username,
		roles:rowUser.role
	}
);

export function queryPartnerAllocations(semester, partner="All" ){
	/**
	 * This method is only called by pages that will need and allocated time
	 * for partner at semester
	 *
	 * @params semester like "2017-1" type String
	 * @params partner is a partner code as it will be shown on partner filter
	 * @return GQL results of the below query
	 */
	let par = "";
	if ( partner !== "All" ) {
		par = ` , partnerCode:"${ partner}"`
	}
	
	const query = `
  {
    partnerAllocations(semester:"${ semester }" ${ par }){
      code
      allocatedTime{
        AllocatedP0P1
        AllocatedP2
        AllocatedP3
      }
    }
  }
  `;
	return graphqlClient().post(`/graphql`, {query})
	.then(response => response)
    .catch(e => e.response)
}

export function queryUserData(){
	const query = `{
    user{
      lastName
      firstName
      email
      username
      role{
        type
        partners
      }
    }
  }`;
	return graphqlClient().post(`/graphql`, {query})
	.then( response =>  response)
    .catch(e => {
			if (e.response.status === 401 ){
    		removeToken()
    	}
    	return e.response})
}

export function queryTargets(semester, partner){
	let par = "";
	if ( partner !== "All" ) {
		par = ` , partnerCode:"${ partner}"`
	}
	const query = `{
    targets(semester:"${semester}", ${par}){
      id
      optional
      coordinates{
        ra
        dec
      }
    }
  }`;
	return graphqlClient().post(`/graphql`, {query})
	.then( response => response )
		.catch(e => e.response)
}

export function queryProposals(semester, partner){
	let par = "";
	if ( partner !== "All" ) {
		par = ` , partnerCode:"${ partner}"`
	} else{
		par = ` allProposals: true `
	}
	
	const query = `
  {
    proposals(semester: "${semester}",${par} ){
      id
      code
      title
      abstract
      techReviews{
        semester
        reviewer{
          username
        }
        report
      }
      isP4
      isThesis
      status
      actOnAlert
      transparency
      maxSeeing
      instruments{
        rss{
          mode
          detectorMode
        }
        hrs{
          exposureMode
        }
        bvit{
          type
        }
        scam{
          detectorMode
        }
      }
      timeRequests{
        semester
        minimumUsefulTime
        distribution{
          partnerName
          partnerCode
          time
        }
      }
      pi{
        name
        surname
      }
      SALTAstronomer{
        name
        username
        surname
        email
      }
      allocatedTime{
        partnerCode
        p0
        p1
        p2
        p3
        p4
      }
      tacComment{
        partnerCode
        comment
      }
    }
  }
  `;
	return graphqlClient().post(`/graphql`, { query })
	.then(
		response => response
	).catch(e => e.response)
}

export const  submitAllocations = (query) =>  graphqlClient().post(`/graphql`, { query }).then(response => response);

export function querySALTAstronomers(){
	const query=`
  {
    SALTAstronomers{
        name
	    username
	    surname
    }
  }
  `;
	return graphqlClient().post(`/graphql`, {query})
	.then(response => response).catch(e => e.response)
}

export const queryTacMembers = () => {
	const query = `
{
	tacMembers{
		lastName
	    firstName
	    partnerCode
	    username
	    isChair
	}
}
	`;
	return graphqlClient().post(`/graphql`, {query})
	.then( response => response).catch(e => e.response)
};

export const querySaltUsers = () => {
	const query = `
	{
		saltUsers{
			lastName
		    firstName
		    username
		}
	}
	`;
	return graphqlClient().post(`/graphql`, {query})
	.then( response => response).catch(e => e.response)
};
