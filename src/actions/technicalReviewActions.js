import {
	SUBMIT_TECHNICAL_REVIEWS_FAIL,
	SUBMIT_TECHNICAL_REVIEWS_PASS,
	SUBMIT_TECHNICAL_REVIEWS_START,
	UPDATE_TECHNICAL_REVIEW,
} from '../types';
import { jsonClient } from '../api/api';
import { isTechReportUpdated, isReviewerUpdated } from '../util/filters'
import fetchProposals from './proposalsActions';
import { makeTechComment } from '../util';

/**
 * An action for updating the technical reviewer of a proposal in the local store.
 *
 * @param proposalCode Proposal code, such as "2018-1-SCI-009".
 * @param semester Semester, such as "2018-1".
 * @param techReview Updated technical review.
 * @returns {{type, payload: {proposalCode: *, reviewer: *}}} The action.
 */
export function updateTechnicalReview(proposalCode, semester, techReview) {
	return {
		type: UPDATE_TECHNICAL_REVIEW,
		payload: {
			proposalCode,
			semester,
			techReview
		}
	}
}

function startSubmittingTechnicalReviews() {
	return {
		type: SUBMIT_TECHNICAL_REVIEWS_START
	}
}

function submittingTechnicalReviewsFail() {
	return {
		type: SUBMIT_TECHNICAL_REVIEWS_FAIL
	}
}

function submittingTechnicalReviewsPass() {
	return {
		type: SUBMIT_TECHNICAL_REVIEWS_PASS
	}
}

/**
 * An action for submitting reviewers and technical reviews.
 *
 * @param proposals Proposals whose reviewer and technical report are submitted, if they have changed.
 * @param user Current user of tac Web
 * @param initProposals Proposals downloaded from the server. They are used to check whether reviewers or
 *                      technical reports have changed.
 * @param partner Partner code, such "RSA" or "IUCAA".
 * @param semester Semester, such as "2018-1".
 */
export function submitTechnicalReviewDetails(proposals, user, initProposals, partner, semester) {
	console.log({partner, semester});
	return async (dispatch) => {
        dispatch(startSubmittingTechnicalReviews());
        const updatedProposals = proposals
                .filter(p => {
					return isReviewerUpdated(p, initProposals, semester) ||
							isTechReportUpdated(p, initProposals, semester)
				});
        if (updatedProposals.some(p => !p.techReviews[semester].reviewer || !p.techReviews[semester].reviewer.username)) {
        	dispatch(submittingTechnicalReviewsFail());
        	return;
        }
		const reviews = updatedProposals.map(p => {
					const reviewer = !p.techReviews[semester].reviewer || !p.techReviews[semester].reviewer.username
							? null
							: p.techReviews[semester].reviewer.username;
                    return {
                        proposalCode: p.proposalCode,
                        reviewer,
						report: makeTechComment(p.techReviews[semester])
                    }
                });

        try {
            await jsonClient().post('technical-reviews', {semester, reviews});
        } catch (e) {
        	dispatch(submittingTechnicalReviewsFail());
        	return;
		}
		dispatch(fetchProposals(semester, partner));
		dispatch(submittingTechnicalReviewsPass());
	}
}
