import {
  ADMIN_PAGE,
  ALL_PARTNER,
  DOCUMENTATION_PAGE,
  HOME_PAGE,
  STATISTICS_PAGE,
  TAC_PAGE,
  TECHNICAL_PAGE,
  PAGE_NOT_FOUND,
  LIAISON_PAGE,
  PARTNER_STAT_PAGE,
} from '../types'
import { makeTechComment } from './index'
import { semesterComment } from './partner-stat'

/**
*
* @param proposals of a selected partner all or single
* @param semester selected semester
* @param partner all partners or a single
* @return number
*/
export function totalTimeRequestedPerPartner(proposals, semester, partner='All' ){
  let total = 0
  proposals.forEach( p =>{
    if (!p.isP4){
    	if (partner === ALL_PARTNER) {
				total += p.totalRequestedTime
			} else {
    		total += p.requestedTime.requests[ partner ]
			}

    }

  })
  return total
}

export function totalTimeRequestedForP4(proposals, semester, partner='All' ){
  let total = 0
  proposals.forEach( p =>{
    if (p.isP4){
      p.timeRequests.forEach( r => {
        if (r.semester === semester){
          r.timeRequests.forEach(d => {
            if ( partner === 'All'){
              total += d.time
            }else if (d.partner.code === partner){
              total += d.time
            }
          })
        }
      })
    }

  })
  return total
}

export const semestersArray = () => {
  let startYear = 2006
  const today = new Date()
  const year = today.getFullYear()
  const semester = []
  while (startYear < year + 8){
    semester.push(
      `${ startYear }-1`, `${ startYear }-2`
    )
    startYear += 1
  }
  return semester
}

/**
 * returns an array of partners a user can see
 * @params roles
 * @return Array
 * */
export const getPartnerList = roles => {
  let partnerList = []// eslint-disable-next-line
  for (const r of roles || []) {
    if (r.type === 'ADMINISTRATOR' || r.type === 'SALT_ASTRONOMER') {
      partnerList = r.partners
      break
    }

    if (r.type === 'TAC_MEMBER') {
      partnerList = r.partners
    }
    if (r.type === 'BOARD') {
      partnerList = r.partners
    }
    if (r.type === 'TAC_CHAIR') {
      partnerList = r.partners
    }
  }
  partnerList.includes(ALL_PARTNER) ? partnerList.push() : partnerList.push(ALL_PARTNER)

  return partnerList
}

/*
* @params list an array of
*/
export const listForDropdown = list => ( list || [] ).filter( l => l !== 'OTH').map( l => ({ label: l, value: l }))

/**
 * method convert a standard SA object to an array of SA names
 *
 * @params Array of SALT astronomers directly from server
 * @return Array of SALT astronomers names
 * */
export const getAstronomersList = saList => (saList || []).map( l => (`${ l.name }`))

/**
 * get a current uri path and return the selected page name
 *
 * @params pathname uri path
 * @return name of selected page or Home page by default
 */
export const loadedPage = pathname => {
	let page = HOME_PAGE
	if (pathname === '/' ) page = HOME_PAGE
	else if (pathname === '/timeallocation' ) page = TAC_PAGE
	else if (pathname === '/liaison' ) page = LIAISON_PAGE
	else if( pathname === '/statistics' ) page = STATISTICS_PAGE
	else if( pathname === '/partnerstat' ) page = PARTNER_STAT_PAGE
	else if( pathname === '/techreview' ) page = TECHNICAL_PAGE
	else if( pathname === '/documentation' ) page = DOCUMENTATION_PAGE
	else if( pathname === '/admin' ) page = ADMIN_PAGE
	else if( pathname === '/login' ) page = HOME_PAGE
	else page = PAGE_NOT_FOUND
	return page
}

/**
 * It reduce the proposals to only proposals that are assigned to @param astronomer
 * if @param astronomer is "All" all are returned
 * if @param astronomer is "Assigned" only assigned proposals returned
 * if @param astronomer is "Not Assigned" only unassigned proposals returned
 * if @param astronomer is "SA name" only proposals that are assigned to "SA name" can be returned
 *
 * @param proposals array of proposals
 * @param astronomer a SALT astronomer
 * @param semester Current semester
 * @return Array reduced proposals
 * */

export const reduceProposalsPerAstronomer = (proposals, astronomer, semester) => {
  let prop = []
  if (astronomer === 'All'){
    prop = proposals
  }
  else if (astronomer === 'Assigned'){
    proposals.forEach(p => {
      if (
        p.initialState &&
        p.initialState.techReviews &&
        p.initialState.techReviews[ semester ] &&
        p.initialState.techReviews[ semester ].reviewer &&
        p.initialState.techReviews[ semester ].reviewer.username !== null
      ) {prop.push(p)}
    })
  }
  else if (astronomer === 'Not Assigned'){
    proposals.forEach(p => {
      if (
        p.initialState &&
        p.initialState.techReviews &&
        p.initialState.techReviews[ semester ] &&
        p.initialState.techReviews[ semester ].reviewer &&
        p.initialState.techReviews[ semester ].reviewer.username === null
      ) {prop.push(p)}
    })
  }else {
    proposals.forEach(p => {
      if (
        p.initialState &&
        p.initialState.techReviews &&
        p.initialState.techReviews[ semester ] &&
        p.initialState.techReviews[ semester ].reviewer &&
        p.initialState.techReviews[ semester ].reviewer.username === astronomer
      ) {
        prop.push(p)
      }
    })
  }

  return prop
}

export const isTechReportUpdated = (proposal, initProposals, semester) => {
  const initProposal = initProposals.find(p => p.proposalCode === proposal.proposalCode)
  return !initProposal || makeTechComment(proposal.techReviews[ semester ]) !== makeTechComment(initProposal.techReviews[ semester ])
}

export const isReviewerUpdated = (proposal, initProposals, semester) => {
  const initProposal = initProposals.find(p => p.proposalCode === proposal.proposalCode)
  return !initProposal || initProposal.techReviews[ semester ].reviewer.username !== proposal.techReviews[ semester ].reviewer.username
}

export const isCompletionCommentUpdated = (proposal, initProposals, semester) => {
  const initProposal = initProposals.find(p => p.proposalCode === proposal.proposalCode)
  return !initProposal || semesterComment(proposal, semester) !== semesterComment(initProposal, semester)
}

export const compareByValue = (a, b) => {
  const name1 = a.value
  const name2 = b.value
  if (name1 < name2) {
    return -1
  }
  if (name1 > name2) {
    return 1
  }
  return 0
}
