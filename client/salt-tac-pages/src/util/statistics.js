import * as _ from 'lodash';

// Utility functions for statistics

/**
 * Compare two semesters. The semesters must be strings of the form 'yyyy-s', where yyyy is the four digit year and s is
 * either 1 or 2.
 *
 * -1, 0 or 1 is returned, depending on whether the first semester is earlier than, the same as or later than the
 * second semester.
 *
 * Parameters:
 *
 * semester1: string
 *     The first semester.
 * semester2: string
 *     The second semester.
 */
export function compareSemesters(semester1, semester2) {
    const [year1, sem1] = semester1.split('-');
    const [year2, sem2] = semester2.split('-');

    if (year1 < year2) {
        return -1;
    } else if (year1 === year2) {
        if (sem1 < sem2) {
            return -1;
        } else if (sem1 === sem2) {
            return 0;
        } else {
            return 1;
        }
    } else {
        return 1;
    }
}

export function proposalsCount(proposals) {
    return proposals.length;
}

export function newProposalsCount(proposals, semester) {
    return proposals.filter(proposal => compareSemesters(proposal.semester, semester) === 0).length;
}

export function resubmittedProposalsCount(proposals, semester) {
    return proposals.filter(proposal => compareSemesters(proposal.semester, semester) < 0).length;
}

export function isLongtermProposal(proposal) {
    const allSemesters = proposal.timeRequests.map(request => request.semester);
    const uniqueSemesters = new Set(allSemesters);

    return uniqueSemesters.size > 1;
}

export function longtermProposalsCount(proposals) {
    return proposals.filter(isLongtermProposal).length;
}

export function newLongtermProposalsCount(proposals, semester) {
    return proposals.filter(isLongtermProposal)
            .filter(proposal => compareSemesters(proposal.semester, semester) === 0)
            .length;
}

/**
 * The time which can be spent on observations. This is summed over priorities 0 to 3. It may differ from the time which
 * can be allocated to proposals. The latter is calculated by the function availableAllocationTime.
 *
 * Parameters:
 *
 * availableTime: object
 *     The available time. This must be for the given partner and semester. The object must contain the key
 *     'scienceTime', and the corresponding object must contain the keys 'p0and1', 'p2' and 'p3'.
 */
export function availableScienceTime(availableTime) {
    return availableTime.scienceTime.p0and1
            + availableTime.scienceTime.p2
            + availableTime.scienceTime.p3;
}

/**
 * The time which can be allocated to proposals. This is summed over priorities 0 to 3. It may differ from the time
 * which can be observed. The latter is calculated by the function availableScienceTime.
 *
 * Parameters:
 *
 * availableTime: object
 *     The available time. This must be for the given partner and semester. The object must contain the key
 *     'allocationTime', and the corresponding object must contain the keys 'p0and1', 'p2' and 'p3'.
 */
export function availableAllocationTime(availableTime) {
    return availableTime.allocationTime.p0and1
            + availableTime.allocationTime.p2
            + availableTime.allocationTime.p3;
}

/**
 * The list of non-zero requested times (in hours) for a partner and semester.
 *
 * Parameters:
 *
 * proposals: array
 *     Proposals.
 * partner: Partner
 *     Partner.
 * semester: string
 *     Semester.
 */
export function requestedTimes(proposals, partner, semester) {
    const timeRequest = (proposal, partner) => proposal.timeRequests.find(t => t.partner.code === partner.code);

    return proposals
            .filter(proposal => !proposal.isP4)
            .filter(proposal => partner.hasTimeRequestFor(proposal, semester))
            .reduce(
                    (a, proposal) => {
                        const req = timeRequest(proposal, partner, semester);
                        return [...a, req.time]
                    },
                    []
            )
            .map(t => t / 3600);
}

/**
 * The total requested time for a partner and semester, summed over all proposals.
 *
 * Parameters:
 *
 * proposals: array
 *     Proposals.
 * partner: Partner
 *     Partner.
 * semester: string
 *     Semester.
 */
export function totalRequestedTime(proposals, partner, semester) {
    return _.sum(requestedTimes(proposals, partner, semester));
}

/**
 * The oversubscription rate. This is the ratio of the total requested time and the available science time.
 *
 * Parameters:
 *
 * proposals: array
 *     Proposals.
 * partner: Partner
 *     Partner.
 * semester: string
 *     Semester.
 * availableTime: object
 *     The available time. This must be for the given partner and semester. The object must contain the key
 *     'scienceTime', and the corresponding object must contain the keys 'p0and1', 'p2' and 'p3'.
 */
export function oversubscriptionRate(proposals, partner, semester, availableTime) {
    return totalRequestedTime(proposals, partner, semester) / availableScienceTime(availableTime)
}

/**
 * The average time (in hours) requested per proposal for a partner and semester. This is the ratio of the total
 * requested time and the number of proposals.
 */
export function averageRequestedTime(proposals, partner, semester) {
    return totalRequestedTime(proposals, partner, semester) / proposalsCount(proposals);
}

export function thesisProjectsCount(proposals) {
    return proposals.reduce((count, proposal) => count + proposal.thesisProjects.length, 0);
}

export function p4ProposalsCount(proposals) {
    return proposals.filter(proposal => proposal.isP4).length;
}

/**
 * The sublist of proposals whose maximum seeing is greater than or equal to a given seeing.
 *
 * Parameters:
 *
 * proposals: array
 *     Proposals.
 * seeing: number
 *     Seeing.
 */
export function proposalsForSeeing(proposals, seeing) {
    return proposals.filter(proposal => proposal.maxSeeing >= seeing);
}

export function proposalsForTransparency(proposals, transparency) {
    return proposals.filter(proposal => proposal.transparency === transparency);
}

export function proposalsWithInstrumentConfig(proposals, instrumentConfig) {
    return proposals.filter(
            proposal => proposal.instrumentConfigurations.some(
                    // are all properties of instrumentConfig existing and the same in configuration c?
                    c => Object.keys(instrumentConfig).reduce(
                            (allFound, key) => allFound && key in c && c[key] === instrumentConfig[key],
                            true
                    )
            )
    );
}