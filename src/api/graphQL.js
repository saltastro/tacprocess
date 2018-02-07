import axios from 'axios';
import { API_BASE_URL } from '../types';
import { jsonClient } from './api';
import {getTechReportFields} from "../util";


function isNewProposal(distributedTimes, semester){
	return distributedTimes.some(t => t.semester > semester)
}

function isLongTermProposal(distributedTimes, semester){
	return distributedTimes.some(t => t.semester !== semester )
}

function makeTechReviews(techReviews) {
	
	return ( techReviews|| [] ).reduce((prev, tr) => {
		return {
			...prev,
			[tr.semester]: {
				reviewer: tr.reviewer,
				...getTechReportFields(tr.report)
			}
		};
	}, {});
}

function makeAllocatedTime(alloc){
	let allocations = {};
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
	
	let tacComment = {};
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
	
	let reqTime = {
		minimum: 0,
		semester: semester,
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
			maxSeeing: proposal.maxSeeing,
			transparency: proposal.transparency,
			isNew: isNewProposal(proposal.timeRequests, semester),
			isLong: isLongTermProposal(proposal.timeRequests, semester),
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

const graphqlClient = () => axios.create({
	baseURL: API_BASE_URL,
	"routes": {
		"cors": true
	},
	headers: {
		'Authorization': `Token ${localStorage.tacPageJWT}`,
		'Content-Type': 'application/graphql',
	}
});

const convertData = rowUser => {
	return {
		firstName: rowUser.firstName,
		lastName: rowUser.lastName,
		email: rowUser.email,
		username: rowUser.username,
		roles:rowUser.role
	};
};

export function queryStatData(semester, partner){
	let partnerArgs = "";
	if (partner !== "All") {
		partnerArgs = `partnerCode:"${partner}"`
	}
	const query = `
  {
    proposals(semester: "${semester}", ${partnerArgs}){
      id
      code
      title
      abstract
      techReport
      isP4
      status
      transparency
      maxSeeing
      instruments{
        rss{
          mode
          dictatorMode
        }
        hrs{
          exposureMode
        }
        bvit{
          type
        }
        scam{
          dictatorMode
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
        username
      }
      allocatedTime{
        partnerCode
        p0
        p1
        p2
        p3
        p4
      }
    }

    targets(semester:"${semester}", ${partnerArgs}){
      id
      optional
      coordinates{
        ra
        dec
      }
    }
  }
  `;
	return graphqlClient().post(`/graphql?query=${query}`)
	.then(
		response => convertData(response)
	)
}


export function queryPartnerAllocations(semester, partner="All" ){
	/*
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
	return graphqlClient().post(`/graphql?query=${query}`)
	.then(
		response => response
	)
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
	return graphqlClient().post(`/graphql?query=${query}`)
	.then(
		response => {
			return convertData(response.data.data.user);
		}
	)
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
	return graphqlClient().post(`/graphql?query=${query}`)
	.then(
		response => response
	)
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
    proposals(semester: "${semester}", ${par} ){
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
      status
      transparency
      maxSeeing
      instruments{
        rss{
          mode
          dictatorMode
        }
        hrs{
          exposureMode
        }
        bvit{
          type
        }
        scam{
          dictatorMode
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
	return graphqlClient().post(`/graphql?query=${query}`)
	.then(
		response => convertProposals(response.data.data, semester, partner)
	)
}



export function submitAllocations(query){
	return jsonClient().post(`/graphql`, { query })
	.then(response => response)
}

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
	return graphqlClient().post(`/graphql?query=${query}`)
	.then(response => response)
}
