import React from 'react';
import * as _ from 'lodash';

/**
 * Return the technical report. The returned object depends on the requested format:
 *
 * 'object' returns an object with fields 'feasible', 'comment' and 'details'.
 * 'jsx' returns a JSX object.
 * Any other format returns a string representation.
 *
 * The format is case-insensitive.
 *
 * @param proposal The proposal.
 * @param semester The semester.
 * @param format The format.
 * @returns {*}
 */
export function getTechnicalReport(proposal, semester, format='string') {
    const review = proposal.techReviews[semester];
    const feasible = review && review.feasible ? review.feasible : null;
    const comment = review && review.comment ? review.comment : null;
    const details = review && review.details ? review.details : null;
    const report = review && review.report ? review.report : null;

    const lcFormat = format.toLowerCase();

    if (lcFormat === 'object') {
        return {
            feasible,
            comment,
            details,
            report
        };
    }

    let lines;
    if (!feasible && !comment && !details) {
        lines = ['(no report yet)'];
    } else {
        lines = [
            `Feasible: ${feasible ? feasible : ''}`,
            `Comment: ${comment ? comment : ''}`,
            `Detailed check: ${details ? details : ''}`
        ];
    }

    if (lcFormat === 'jsx') {
        return <div>
            {lines.map(line => <div>{line}</div>)}
        </div>
    }

    return lines.join('\n');
}

function getDefaultReview(p, semester) {
    let name = null;
    let feasible = null;
    let details = null;
    let comment = null;

    if (Object.keys(p.techReviews).some(s => s < semester)) {
        Object.keys(p.techReviews).forEach(s => {

            if (s < semester && (!_.isNull(p.techReviews[s].comment) || p.techReviews[s].comment !== "none")) {
                name = p.liaisonAstronomer;
                feasible = "yes";
                details = "no";
                comment = "Continuation of an existing proposal. Please see the PI’s report."
            }
        })
    }
    return {
        reviewer: {username: name},
        feasible: feasible,
        comment: comment,
        details: details

    }

}

export function setDefaultTechReviews(proposals, semester) {
    return (proposals || []).map(p => {
        if (!!p.techReviews[semester]) {
            return p
        }
        else {
            const rev = getDefaultReview(p, semester);
            return {
                ...p,
                techReviews: {
                    ...p.techReviews,
                    [semester]: {
                        reviewer: rev.reviewer,
                        feasible: rev.feasible,
                        comment: rev.comment,
                        details: rev.details
                    }
                }
            }
        }

    })
}