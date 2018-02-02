import {
	SUBMIT_REPORTING_ASTRONOMERS_FAIL,
	SUBMIT_REPORTING_ASTRONOMERS_PASS,
	SUBMIT_REPORTING_ASTRONOMERS_START,
	SUBMIT_TECHNICAL_REPORTS_FAIL,
	SUBMIT_TECHNICAL_REPORTS_PASS,
	SUBMIT_TECHNICAL_REPORTS_START,
	UPDATE_TECHNICAL_REPORT,
	UPDATE_REPORTING_ASTRONOMER,
	UN_ASSIGN_PROPOSAL
} from '../types';
import { jsonClient } from '../api/api';
import {makeTechComment} from "../util";

/**
 * An action for updating the technical reviewer of a proposal in the local store.
 *
 * @param proposalCode Proposal code, such as "2018-1-SCI-009".
 * @param reviewer Username of the technical reviewer.
 * @returns {{type, payload: {proposalCode: *, reviewer: *}}} The action.
 */
export function updateTechnicalReviewer(proposalCode, reviewer) {
	return {
		type: UPDATE_REPORTING_ASTRONOMER,
		payload: {
			proposalCode,
			reviewer
		}
	}
}

/**
 * An action for updating the technical report of a proposal in the local store.
 *
 * @param proposalCode Proposal code, such as "2018-1-SCI-009".
 * @param semester Semester, such as "2018-1".
 * @param techReport Technical report.
 * @param field an edited field either (comment, details, feasible).
 * @returns {{type, payload: {proposalCode: *, semester: *, techReport: *}}} The action.
 */
export function updateTechnicalReport(proposalCode, semester, techReport, field) {
	return {
		type: UPDATE_TECHNICAL_REPORT,
		payload: {
			proposalCode,
			semester,
			techReport,
			field
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
 * An action for submitting liaison astronomers and technical reviews.
 *
 * @param proposals Proposals whose liaison astronomer and technical report are submitted.
 * @param semester Semester, such as "2018-1".
 */
export function submitTechnicalReviewDetails(proposals, semester) {
	return async (dispatch) => {
		await Promise.all(
			[
				submitTechnicalReviewers(dispatch, proposals, semester),
				submitTechnicalReports(dispatch, proposals, semester)
			]);
	}
}

async function submitTechnicalReviewers(dispatch, proposals, semester) {
	dispatch(startSubmittingReportingAstronomers());
	try {
		const assignments = proposals.map(p => {
			return {
				proposalCode: p.proposalCode,
				reviewer: p.reviewer
			}
		});
		await jsonClient().post('reviewers', {semester, assignments});
		dispatch(submittingReportingAstronomersPass());
	} catch (e) {
		dispatch(submittingReportingAstronomersFail());
	}
}

async function submitTechnicalReports(dispatch, proposals, semester) {
	dispatch(startSubmitTechnicalReports());
	try {
		const reports = proposals.map(p => {
			return {
				proposalCode: p.proposalCode,
				report: makeTechComment(p.techReport)
			}
		});
		await jsonClient().post('technical-reports', {semester, reports});
		dispatch(submitTechnicalReportsPass());
	} catch (e) {
		dispatch(submitTechnicalReportsFail());
	}
}