import { graphqlClient } from './index'
import {getTechReportFields} from '../util'
import { isNewProposal, isLongTermProposal } from '../util/proposal'
import {convertPartnerAllocations} from '../actions/timeAllocationActions'

export const convertUserData = rowUser => ({
	firstName: rowUser.firstName,
	lastName: rowUser.lastName,
	email: rowUser.email,
	username: rowUser.username,
	roles:rowUser.role
})

function makeTechReviews(techReviews) {
	
  return ( techReviews|| [] ).reduce((prev, tr) => ({
    ...prev,
    [ tr.semester ]: {
      reviewer: tr.reviewer.username,
      ...getTechReportFields(tr.report)
    }
  }), {})
}

function makeAllocatedTime(alloc){
  const allocations = {}
  alloc.forEach( a => {
    allocations[ a.partner.code ] = {
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
	
  const tacComments = {}
  tComm.forEach( c => {
    tacComments[ c.partner.code ] = {
      comment: c.comment == null ? '' : `${ c.comment }`
    }
  })
  return tacComments
}

const makeInstruments = (instruments) => instruments.reduce((made, instrument) =>{
  made[ instrument.type.toLowerCase() ] = instrument.type ==='HRS' ? [
		...made[ instrument.type.toLowerCase() ],
    {
      type: 'hrs',
      exposureMode: instrument.detectorMode
    }
  ] : [
    ...made[ instrument.type.toLowerCase() ],
    instrument
  ]
  return made
}, {
  rss: [],
  hrs: [],
  scam: [],
  bvit: [],
})
function minimumTotalRequested(timeRequirements, semester){
  let total = 0
  let minimum = 0
  timeRequirements.forEach( requirement => {
    if (requirement.semester === semester ){
      minimum = requirement.minimumUsefulTime
      requirement.timeRequests.forEach( request => { total += parseFloat(request.time) }
      )}
  })
  return { total, minimum }
}

function requestedTime(requirements, semester){
	
  const reqTime = {
    minimum: 0,
    semester,
    requests: {}
  }
	requirements.forEach(requirement => {
    if (requirement.semester === semester){
      reqTime.minimum = requirement.minimumUsefulTime
      requirement.timeRequests.forEach(request => {
        reqTime.requests[ request.partner.code ] = request.time
      })
    }
  })
  return reqTime
}

export function convertProposals(proposals, semester, partner){
  if (!proposals.proposals){ return []}
  return proposals.proposals.map( proposal => {
    const minTotal  = minimumTotalRequested(proposal.timeRequirements, semester)
    const liaisonAstronomer = proposal.liaisonSaltAstronomer ? proposal.liaisonSaltAstronomer.username : null
    const allocatedTime = makeAllocatedTime(proposal.allocatedTime, partner)
    const tacComment = makeTacComments(proposal.tacComments, partner)
    const techReviews = makeTechReviews(proposal.techReviews)
    return ({
      title: proposal.title,
      abstract: proposal.abstract,
      proposalCode: proposal.code,
      isP4: proposal.isP4,
      status: proposal.status,
      actOnAlert: proposal.isTargetOfOpportunity,
      maxSeeing: proposal.maxSeeing,
      transparency: proposal.transparency,
      isNew: isNewProposal(proposal.timeRequirements, semester),
      isLong: isLongTermProposal(proposal.timeRequirements, semester),
      isThesis: proposal.isThesis,
      totalRequestedTime: minTotal.total,
      timeRequests: proposal.timeRequirements,
      minTime: minTotal.minimum,
      instruments: makeInstruments(proposal.instruments),
      pi: `${ proposal.principalInvestigator.lastName } ${ proposal.principalInvestigator.firstName }`,
      liaisonAstronomer,
      techReviews,
      allocatedTime,
      tacComment,
      requestedTime: requestedTime(proposal.timeRequirements, semester),
      initialState: {
        liaisonAstronomer,
        techReviews,
        allocatedTime,
        tacComment
      }
    })
  })
}

export function queryPartnerAllocations(semester){
  /**
	 * This method is only called by pages that will need and allocated time
	 * for partner at semester
	 *
	 * @params semester like "2017-1" type String
	 * @return GQL results of the below query
	 */
	
  const query = `
  {
    partnerAllocations(semester:"${ semester }"){
      code
      timeAllocation{
        allocatedTime {
          p0Andp1
          p2
          p3
          p4
        }
      }
    }
  }
  `
  return graphqlClient().post('/graphql', {query})
    .then(
      response => convertPartnerAllocations(response.data.data)
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
  }`
  return graphqlClient().post('/graphql', {query})
    .then(
      response =>  convertUserData(response.data.data.user)
    )
}

export function queryTargets(semester, partner){
  let par = ''
  if ( partner !== 'All' ) {
    par = ` , partnerCode:"${ partner }"`
  }
  const query = `{
    targets(semester:"${ semester }", ${ par }){
      id
      isOptional
      position{
        ra
        dec
      }
    }
  }`
  return graphqlClient().post('/graphql', {query})
    .then(
      response => response
    )
}

export function queryProposals(semester, partner){
  let par = ''
  if ( partner !== 'All' ) {
    par = ` , partnerCode:"${ partner }"`
  }
	
  const query = `
  {
    proposals(semester: "${ semester }",${ par } ){
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
      isTargetOfOpportunity
      transparency
      maxSeeing
      instruments{
        type
        ...on RSS{
          mode
          detectorMode
        }
        ...on HRS{
          detectorMode
        }
        ...on SCAM{
          detectorMode
        }
      }
      timeRequirements{
        semester
        minimumUsefulTime
        timeRequests{
          partner{
            code
          }
          time
        }
      }
      principalInvestigator{
        firstName
        lastName
      }
      liaisonSaltAstronomer{
        firstName
        username
        lastName
        email
      }
      allocatedTime{
        partner{
          code
        }
        p0
        p1
        p2
        p3
        p4
      }
      tacComments{
        partner{
          code
        }
        comment
      }
    }
  }
  `
  return graphqlClient().post('/graphql', { query })
    .then(
      response => convertProposals(response.data.data, semester, partner)
    )
}

export const  submitAllocations = (query) =>  graphqlClient().post('/graphql', { query }).then(response => response)

export function querySALTAstronomers(){
  const query=`
  {
    saltAstronomers{
      firstName
      lastName
      username
    }
  }
  `
  return graphqlClient().post('/graphql', {query})
    .then(response => response)
}

export const queryTacMembers = () => {
  const query = `
{
	tacMembers{
		lastName
	    firstName
	    partner{code}
	    username
	    isChair
	}
}
	`
  return graphqlClient().post('/graphql', {query})
    .then( response => response)
}

export const querySaltUsers = () => {
  const query = `
	{
		saltUsers{
			lastName
		    firstName
		    username
		}
	}
	`
  return graphqlClient().post('/graphql', {query})
    .then( response => response)
}
