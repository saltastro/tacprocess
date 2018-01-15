import * as types from '../types';

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
            .reduce((allDistributionItems, r) => [...allDistributionItems, ...r.distribution], []) // collect all partner time requests
            .filter(d => partner === 'All' || d.partnerCode === partner) // partner is correct
            .reduce((sum, d) => sum + d.time, 0); // add up all time requests
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
            .reduce((allDistributionItems, r) => [...allDistributionItems, ...r.distribution], []) // collect partner time requests
            .filter(d => partner === 'All' || d.partnerCode === partner) // partner is correct
            .reduce((sum, request) => sum + request.time, 0); // add up all time requests
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
            .filter(p => seeingRange[0] <= p.maxSeeing && p.maxSeeing < seeingRange[1])// seeing is correct
            .reduce((allTimeRequests, p) => [...allTimeRequests, ...p.timeRequests], []) // collect time requests
            .filter(r => r.semester === semester) // semester is correct
            .reduce((allDistributionItems, r) => [...allDistributionItems, ...r.distribution], []) // collect partner time requests
            .filter(d => partner === 'All' || d.partnerCode === partner) // partner is correct
            .reduce((sum, request) => sum + request.time, 0); // add up all time requests
}

/**
 * Get the number of instrument configurations in a proposal.
 *
 * @param proposal
 * @returns {*}
 */
export function instrumentCount(proposal) {
    return Object.keys(proposal.instruments)
            .reduce((sum, key) => sum + proposal.instruments[key].length, 0);
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
    const instrumentModeCount = (proposal.instruments[instrument.toLowerCase()] || [])
            .filter(v => !field || v[field] === value)
            .length;

    const instrumentModeFraction = instrumentModeCount / instrumentCount(proposal);

    const totalObservingTime = proposal.timeRequests
            .filter(r => r.semester === semester) // semester is correct
            .reduce((distributionItems, r) => [...distributionItems, ...r.distribution], []) // collect all partner time requests
            .filter(d => partner === 'All' || d.partnerCode === partner) // partner is correct
            .reduce((sum, d) => sum + d.time, 0); // add all time requests

    return instrumentModeFraction * totalObservingTime;
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
                                                                     {field, value, partner}), 0);
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
        return [];
    }
    const initial = hasRole(user, types.ADMINISTRATOR) || hasRole(user, types.SALT_ASTRONOMER) ? [types.ALL_PARTNER] : [];
    const rolePartners = user.roles // collect partners from all roles
            .reduce((prev, role) => [...(role.partners || []), ...prev], initial);
    const partnerSet = new Set(rolePartners);

    return Array.from(partnerSet).sort();
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
        return (user.roles || []).some(r => r.role === role);
    } else {
        return (user.roles || []).some(r => r.role === role && (r.partners || []).includes(partner));
    }
}

export function canDo(user, action, partner) {
    switch (action) {
    case types.VIEW_TIME_ALLOCATION_PAGE:
        return hasRole(user, types.TAC_MEMBER, partner) ||
                hasRole(user, types.SALT_ASTRONOMER) ||
                hasRole(user, types.ADMINISTRATOR);
    case types.EDIT_TIME_ALLOCATION_PAGE:
        return hasRole(user, types.TAC_CHAIR, partner) ||
                hasRole(user, types.ADMINISTRATOR);
    default:
        return false;
    }
}

export function isFloat(val) {
    const floatRegex = /^[+-]?\d+(?:[.,]\d*?)?$/;
    if (!floatRegex.test(val))
        return false;

    const temp = parseFloat(val);
    if (isNaN(temp))
        return false;
    return true;
}

export function canUserWriteAllocations(user, partner){
  let canWrite = false;
  user.partners.forEach( p => {
    if (p.value === partner){
      if (p.role === "ADMINISTRATOR" ||
          p.role === "TAC_CHAIR"){
        canWrite = true;
      }
    }
  });
  console.log("Can Wrte: ", canWrite);
  return canWrite;
}

export function canUserWriteTechComments(user, partner){
  let canWrite = false;
  user.partners.forEach( p => {
    if (p.value === partner){
      if (p.role === "ADMINISTRATOR" ||
          p.role === "SALT_ASTRONOMER"){
        canWrite = true;
      }
    }
  });
  return canWrite;
}
