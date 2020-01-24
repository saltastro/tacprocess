import { saveAs } from 'file-saver'
import * as types from '../types'
import { jsonClient } from '../api'

/**
 * Return the sum of a and b
 * */
export function add (a, b) {
  return a + b
}

/**
 * Get the observing time for a semester in a proposal.
 * If a partner is given, the observing time is the time requested for that partner.
 *
 * @param proposal
 * @param semester
 * @param partner
 * @returns {*}
 */
export function proposalObservingTime(proposal, semester, partner='All') {
  return proposal.timeRequests
    .filter(r => r.semester === semester) // semester is correct
    .reduce((allDistributionItems, r) => [...allDistributionItems, ...r.timeRequests], []) // collect all partner time requests
    .filter(d => partner === 'All' || d.partnerCode === partner) // partner is correct
    .reduce((sum, d) => sum + d.time, 0) // add up all time requests
}
/**
 * Get the observing time requested for a semester and transparency in a list of proposals.
 * If a partner is given, the observing time is calculated for that partner only.
 *
 * @param proposals
 * @param semester
 * @param transparency
 * @param partner
 */
export function observingTimeForTransparency(proposals, semester, transparency, partner='All') {
  return proposals
    .filter(p => p.transparency === transparency) // transparency is correct
    .reduce((allTimeRequests, p) => [...allTimeRequests, ...p.timeRequests], []) // collect time requests
    .filter(r => r.semester === semester) // semester is correct
    .reduce((allDistributionItems, r) => [...allDistributionItems, ...r.timeRequests], []) // collect partner time requests
    .filter(d => partner === 'All' || d.partnerCode === partner) // partner is correct
    .reduce((sum, request) => sum + request.time, 0) // add up all time requests
}

/**
 * Get the observing time requested for a semester and seeing range in a list of proposals.
 * If a partner is given, the observing time is calculated for that partner only.
 *
 * The seeing range must be an array of the minimum and maximum value the proposal's maximum
 * seeing may have. The minimum value is inclusive, the maximum value exclusive.
 *
 * @param proposals
 * @param semester
 * @param seeingRange
 * @param partner
 */
export function observingTimeForSeeing(proposals, semester, seeingRange, partner='All') {
  return proposals
    .filter(p => seeingRange[ 0 ] <= p.maxSeeing && p.maxSeeing < seeingRange[ 1 ])// seeing is correct
    .reduce((allTimeRequests, p) => [...allTimeRequests, ...p.timeRequests], []) // collect time requests
    .filter(r => r.semester === semester) // semester is correct
    .reduce((allDistributionItems, r) => [...allDistributionItems, ...r.timeRequests], []) // collect partner time requests
    .filter(d => partner === 'All' || d.partnerCode === partner) // partner is correct
    .reduce((sum, request) => sum + request.time, 0) // add up all time requests
}

/**
 * Get the number of instrument configurations in a proposal.
 *
 * @param proposal
 * @returns {*}
 */
export function instrumentCount(proposal) {
  return Object.keys(proposal.instruments)
    .reduce((sum, key) => sum + proposal.instruments[ key ].length, 0)
}

/**
 * Get the observing time requested for a semester and instrument in a proposal.
 * If a partner is given, the observing time is calculated for that partner only. If a field is
 * given, in the JavaScript object representing the object this field must have the given
 * value.
 *
 * If a proposal has more than one instrument configuration, the time is split evenly between
 * the configurations.
 *
 * The instrument argument is case-insensitive.
 *
 * The partner, field and value must be passed as an object. For example,
 *
 * observingTimeForInstrument(proposals, '2017-1', 'rss', {partner: 'RSA'})
 * observingTimeForInstrument(proposals, '2017-1', 'rss', {partner: 'RSA', field: 'mode', value: 'Polarimetry'})

 * @param proposal
 * @param semester
 * @param instrument
 * @param field
 * @param value
 * @param partner
 */
export function proposalObservingTimeForInstrument(proposal, semester, instrument, {field, value, partner='All'}) {
  const instrumentModeCount = (proposal.instruments[ instrument.toLowerCase() ] || [])
    .filter(v => !field || v[ field ] === value).length
  const instrumentModeFraction = instrumentModeCount / instrumentCount(proposal)

  const totalObservingTime = proposal.timeRequests
    .filter(r => r.semester === semester) // semester is correct
    .reduce((timeRequestsItems, r) => [...timeRequestsItems, ...r.timeRequests], []) // collect all partner time requests
    .filter(d => partner === 'All' || d.partnerCode === partner) // partner is correct
    .reduce((sum, d) => sum + d.time, 0) // add all time requests

  return instrumentModeFraction * totalObservingTime
}

/**
 * Get the observing time requested for a semester and instrument in a list of proposals.
 * If a partner is given, the observing time is calculated for that partner only. If a field is
 * given, in the JavaScript object representing the object this field must have the given
 * value.
 *
 * If a proposal has more than one instrument configuration, the time is split evenly between
 * the configurations.
 *
 * The instrument argument is case-insensitive.
 *
 * The partner, field and value must be passed as an object. For example,
 *
 * observingTimeForInstrument(proposals, '2017-1', 'rss', {partner: 'RSA'})
 * observingTimeForInstrument(proposals, '2017-1', 'rss', {partner: 'RSA', field: 'mode', value: 'Polarimetry'})

 * @param proposals
 * @param semester
 * @param instrument
 * @param field
 * @param value
 * @param partner
 */
export function observingTimeForInstrument(proposals, semester, instrument, {field, value, partner}) {
  return proposals
  .reduce((sum, proposal) =>
    sum + proposalObservingTimeForInstrument(proposal,
    semester,
    instrument,
    {field, value, partner}), 0)
}

/**
 * Get the sorted list of partners a user should see.
 *
 * A partner is included in this list if it is included in any of the user's roles. If the user is an
 * administrator, the partner 'All' is added to the list as well.
 *
 * @param user
 */
export function partners(user) {
  if (!user.roles) {
    return []
  }
  const initial = hasRole(user, types.ADMINISTRATOR) || hasRole(user, types.SALT_ASTRONOMER) ? [types.ALL_PARTNER] : []
  const rolePartners = user.roles // collect partners from all roles
  .reduce((prev, role) => [...(role.partners || []), ...prev], initial)
  const partnerSet = new Set(rolePartners)

  return Array.from(partnerSet).sort()
}

/**
 * Check whether a user has a role for a partner.
 *
 * The partner is ignored for the roles of administrator and SALT Astronomer.
 *
 * The partner "All" is not supported.
 *
 * @param user
 * @param role
 * @param partner
 */
export function hasRole(user, role, partner) {
  if (role === types.ADMINISTRATOR || role === types.SALT_ASTRONOMER) {
    return (user.roles || []).some(r => r.type === role)
  }
  return (user.roles || []).some(r => r.type === role && (r.partners || []).includes(partner))

}

export function canDo(user, action, partner) {
  switch (action) {
    case types.VIEW_TIME_ALLOCATION_PAGE:
      return hasRole(user, types.TAC_MEMBER, partner) ||
        hasRole(user, types.SALT_ASTRONOMER) ||
        hasRole(user, types.ADMINISTRATOR)
    case types.EDIT_TIME_ALLOCATION_PAGE:
      return hasRole(user, types.TAC_CHAIR, partner) ||
        hasRole(user, types.ADMINISTRATOR)
    case types.CHANGE_LIAISON:
      return hasRole(user, types.ADMINISTRATOR)
    case types.SELF_ASSIGN_TO_PROPOSAL:
      return hasRole(user, types.SALT_ASTRONOMER)
    default:
      return false
  }
}

/**
 * Test is the given value can be a float
 * @param val is a value to test
 * @return boolean (true)if value can be a float
 * */
export function isFloat(val) {
  const floatRegex = /^[+-]?\d+(?:[.,]\d*?)?$/
  if (!floatRegex.test(val))
    return false
  if (Array.isArray(val))return false

  const temp = parseFloat(val)
  return !isNaN(temp)

}

/**
 * Only tac chair and administrator that can Allocate time and write tac comment
 * @param roles an array of user roles like [{type: "ADMINISTRATOR", partners: [... , "RSA", ...] }]
 * @param partner a partner to test if the user has role of e.g. "RSA"
 * @return boolean (true if the roles is Admin or tac chair for a partner )
 * */
export function canUserWriteAllocations(roles, partner){
  let canWrite = false;
  (roles ||[]).forEach( r => {
    if (r.type === types.ADMINISTRATOR){canWrite = true}
    if ( r.type === types.TAC_CHAIR && r.partners.some(p => (p === partner))){ canWrite = true }}
  )
  return canWrite
}

/**
 * Only SA and administrator that can write technical Review
 * @param roles an array of user roles like [{type: "ADMINISTRATOR", partners: [... , "RSA", ...] }]
 * @return boolean (true if the roles is Admin or SALT Astronomer )
 * */
export function canUserWriteTechReviews(roles){
  let canWrite = false;
  (roles||[]).forEach( r => {
    if (r.type === types.ADMINISTRATOR || r.type === types.SALT_ASTRONOMER){ canWrite = true }})
  return canWrite
}
/**
 * Only tac chair and Admins that can submit allocations
 * @param roles an array of user roles like [{type: "ADMINISTRATOR", partners: [... , "RSA", ...] }]
 * @param partner a partner to test if the user has role of e.g. "RSA"
 * @return boolean (true if the roles is Admin or tac chair for a partner )
 * */
export function canSubmitTimeAllocations(roles, partner){
  let canSubmit = false;

  (roles || []).forEach( r => {
    if (r.type === types.ADMINISTRATOR){canSubmit = true}
    if (r.type === types.TAC_CHAIR && r.partners.some(p => (p === partner))){ canSubmit = true }}
  )
  return canSubmit
}

export function allocatedTimeTotals( proposals, partner ){
  /**
   *
   *
   * @param partner
   * @param availableTime
   * @param proposals
   * @return object of allocated time totals per priority
   */

  const total = {
    p0: 0,
    p1: 0,
    p2: 0,
    p3: 0,
    p4: 0
  }
  proposals.forEach(p => {
    [0, 1, 2, 3, 4].forEach( pr => {
      if(p.allocatedTime && p.allocatedTime[ partner ]){
        total[ `p${ pr }` ] += parseFloat(p.allocatedTime[ partner ] ? p.allocatedTime[ partner ][ `p${ pr }` ] : 0) || 0
      }
    })
  })
  return total

}

export function areAllocatedTimesCorrect(partner, availableTime, proposals){
  /**
   *
   *
   * @param partner
   * @param availableTime
   * @param proposals
   * @return object stating if allocated time of proposals doen't exceed available time and charector are numbers
   */
  const allocTotals = allocatedTimeTotals( proposals, partner )

  return {
    p0p1: allocTotals.p0 + allocTotals.p1 <= (availableTime.p0p1) *60*60+30,
    p2: allocTotals.p2 <= availableTime.p2*60*60+30,
    p3: allocTotals.p3 <= availableTime.p3*60*60+30,
  }

}

export function getLiaisonUsername(name, SALTAstronomers){
  let username;
  (SALTAstronomers || []).forEach( sa => {
    if (sa.name === name){ // eslint-disable-next-line
      username = sa.username
    }
  })
  return username
}

const pageRole = (page, role) => {
  if (page === types.TAC_PAGE && (role === types.TAC_CHAIR || role === types.TAC_MEMBER)) { return true }
  if (page === types.PARTNER_STAT_PAGE && (role === types.BOARD || role === types.TAC_CHAIR)) { return true }
  if ((page === types.TECHNICAL_PAGE && (role === types.SALT_ASTRONOMER )) ||
    (page === types.LIAISON_PAGE && (role === types.SALT_ASTRONOMER ))) {
    return true
  }
  return (page === types.STATISTICS_PAGE && role !== types.BOARD) || page === types.DOCUMENTATION_PAGE

}

export function canViewPage (userRoles, page) {
  if (page === types.HOME_PAGE){return true}
  if ((userRoles || []).some( p => p.type.toLowerCase() === types.ADMINISTRATOR.toLowerCase())) {
    return true
  }
  if ((userRoles || []).some( p => p.type.toLowerCase() === types.TAC_CHAIR.toLowerCase() && page === 'Admin')) {
    return true
  }
  if ((userRoles || []).some(p =>
    (p.type.toLocaleLowerCase() === types.BOARD.toLocaleLowerCase() || p.type.toLocaleLowerCase() === types.TAC_CHAIR.toLocaleLowerCase()) && page === 'Completion Statistics')) { return true }
  return (userRoles || []).some( p => pageRole(page, p.type))
}

export function makeTechComment (techReview){
  const feasible = techReview.feasible && techReview.feasible !== 'none'? `Feasible: ${ techReview.feasible }\n` : ''
  const comment = techReview.comment ? `Comments: ${ techReview.comment.replace(/^\s+|\s+$/g, '')  }\n` : ''
  const details = techReview.details && techReview.details !== 'none' ? `Detailed Check: ${ techReview.details }\n` : ''
  return feasible + comment + details
}

function testTechReview (rev) {
  let review = { comment: '' }
  if (rev.length > 2) {
    (rev || []).forEach(r => {
      if (r.indexOf('Feasible:') !== -1) {
        review.feasible = r.split('Feasible: ').pop() || null
      } else if (r.indexOf('Detailed Check:') !== -1) {
        review.details = r.split('Detailed Check: ').pop() || null
      } else {
        review.comment = review.comment.concat(`${ r  }\n`)
      }

    })
  } else {
    review = {
      feasible: null,
      details: null,
      comment: null
    }
  }
  return review
}

export function getTechReportFields(report) {
  let feasible = null
  let comment = null
  let details = null
  if (!report) {
    return { feasible, comment, details }
  }
  const regExp = /Feasible:\s*(yes|no|yes with caveats)\.?\s+Comments:(.*)\s+Detailed Check:\s*(yes|no|\s)/mi
  const fields = regExp.exec(report)
  if ( fields ){
    feasible = fields[ 1 ].toLowerCase() // eslint-disable-next-line
    comment = fields[ 2 ]
    details = fields[ 3 ].toLowerCase()
  } else {
    const rep = testTechReview(report.split('\n'))
    feasible = rep.feasible ? rep.feasible : null
    comment = rep.comment ? rep.comment.split('Comments:').pop() : report.split('Comments:').pop()
    details = rep.details ? rep.details: null
  }
  return {
    feasible: !feasible || feasible.length < 2 ? null : feasible.replace(/^\s+|\s+$/g, ''),
    comment: comment ? comment.replace(/^\s+|\s+$/g, '') : '',
    details: !details || details.length < 2 ? null : details.replace(/^\s+|\s+$/g, '')
  }

}

export function canAssignOtherReviewer (roles){
  return (roles || []).some(r => r.type === types.ADMINISTRATOR)
}

export function defaultSemester () {
  const today = new Date()
  const month = today.getMonth() + 1
  let year = today.getFullYear()
  let semester = null
  if (month >= 1 && month <= 4) {
    semester = 1
  } else if (month >= 5 && month <= 12) {
    semester = 2
  } else {
    year += 1
    semester = 1
  }

  return `${ year }-${ semester }`
}

export function currentSemester () {
  const today = new Date()
  const month = today.getMonth() + 1
  let year = today.getFullYear()
  let semester = null
  if (month >= 5 && month <= 10) {
    semester = 1
  } else if (month >= 11) {
    semester = 2
  } else {
    year -= 1
    semester = 2
  }

  return `${ year }-${ semester }`
}

export function downloadSummary(proposalCode, semester, partner) {
  jsonClient('blob').post('/proposal-summary', {proposalCode, semester, partner})
    .then(res => {
      saveAs(res.data, `${ proposalCode }.pdf`)
    }) // eslint-disable-next-line
    .catch(err => console.error(err))
}

export function downloadSummaries(proposals, semester, partner) {
  const proposalCodes = proposals.map(p => p.proposalCode)
  jsonClient('blob').post('/proposal-summaries', {proposalCodes, semester, partner})
    .then(res => {
      saveAs(res.data, 'proposal_summaries.zip')
    }) // eslint-disable-next-line
    .catch(err => console.error(err))
}

export function addTacMembers(partner, members) {
  jsonClient('blob').post('/update-tac-members', {partner, members}) // eslint-disable-next-line
  .then(res => console.log(res)) // eslint-disable-next-line
  .catch(err => console.error(err))
}

export function removeTacMembers(partner, members) {
  jsonClient('blob').post('/remove-tac-members', {partner, members}) // eslint-disable-next-line
  .then(res => console.log(res)) // eslint-disable-next-line
  .catch(err => console.error(err))
}

export function getPercentage(divided, divisor) {
  return ((divided)/divisor)*100
}

export function removeDot00(number) {
  return number.replace(/\.00$/, '')
}