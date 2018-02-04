import {
	SUBMIT_REPORTING_ASTRONOMERS_FAIL,
	SUBMIT_REPORTING_ASTRONOMERS_PASS,
	SUBMIT_REPORTING_ASTRONOMERS_START,
	SUBMIT_TECHNICAL_REPORTS_FAIL,
	SUBMIT_TECHNICAL_REPORTS_PASS,
	SUBMIT_TECHNICAL_REPORTS_START,
	UPDATE_TECHNICAL_REVIEW,
	UN_ASSIGN_PROPOSAL
} from '../types';
import { jsonClient } from '../api/api';
import { makeTechComment } from "../util";
import { isTechReportUpdated, isReviewerUpdated } from '../util/filters'

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

function startSubmittingReportingAstronomers() {
	return {
		type: SUBMIT_REPORTING_ASTRONOMERS_START
	}
}

function submittingReportingAstronomersFail() {
	return {
		type: SUBMIT_REPORTING_ASTRONOMERS_FAIL
	}
}

function submittingReportingAstronomersPass() {
	return {
		type: SUBMIT_REPORTING_ASTRONOMERS_PASS
	}
}

function startSubmitTechnicalReports() {
	return {
		type: SUBMIT_TECHNICAL_REPORTS_START
	}
}

function submitTechnicalReportsFail() {
	return {
		type: SUBMIT_TECHNICAL_REPORTS_FAIL
	}
}
export function unAssignProposal(proposalCode) {
	return {
		type: UN_ASSIGN_PROPOSAL,
		payload: {proposalCode: proposalCode}
	}
}

function submitTechnicalReportsPass() {
	return {
		type: SUBMIT_TECHNICAL_REPORTS_PASS
	}
}

/**
 * An action for submitting reviewers and technical reviews.
 *
 * @param proposals Proposals whose reviewer and technical report are submitted, if they have changed.
 * @param initProposals Proposals downloaded from the server. They are used to check whether reviewers or
 *                      technical reports have changed.
 * @param semester Semester, such as "2018-1".
 */
export function submitTechnicalReviewDetails(proposals, initProposals, semester) {
	return async (dispatch) => {
		await Promise.all(
			[
				submitTechnicalReviewers(dispatch,
										 proposals,
										 initProposals,
										 semester),
				submitTechnicalReports(dispatch,
									   proposals,
									   initProposals,
									   semester)
			]);
	}
}

async function submitTechnicalReviewers(dispatch, proposals, initProposals, semester) {
	dispatch(startSubmittingReportingAstronomers());
	try {
		const assignments = proposals
				.filter(p => isReviewerUpdated(p, initProposals, semester))
				.map(p => {
					return {
						proposalCode: p.proposalCode,
						reviewer: p.techReviews[semester].reviewer
					}
				});
		await jsonClient().post('reviewers', {semester, assignments});
		dispatch(submittingReportingAstronomersPass());
	} catch (e) {
		dispatch(submittingReportingAstronomersFail());
	}
}

async function submitTechnicalReports(dispatch, proposals, initProposals, semester) {
	dispatch(startSubmitTechnicalReports());
	try {
		const reports = proposals
				.filter(p => isTechReportUpdated(p, initProposals, semester))
				.map(p => {
					return {
						proposalCode: p.proposalCode,
						report: makeTechComment(p.techReviews[semester])
					}
				});
		await jsonClient().post('technical-reports', {semester, reports});
		dispatch(submitTechnicalReportsPass());
	} catch (e) {
		dispatch(submitTechnicalReportsFail());
	}
}