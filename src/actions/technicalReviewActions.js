import {
	SUBMIT_LIAISON_ASTRONOMERS_FAIL,
	SUBMIT_LIAISON_ASTRONOMERS_PASS,
	SUBMIT_LIAISON_ASTRONOMERS_START,
	SUBMIT_TECHNICAL_REPORTS_FAIL,
	SUBMIT_TECHNICAL_REPORTS_PASS,
	SUBMIT_TECHNICAL_REPORTS_START,
	UPDATE_TECHNICAL_REPORT,
	UPDATE_TECHNICAL_REVIEWER,
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
		type: UPDATE_TECHNICAL_REVIEWER,
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

function startSubmitLiaisonAstronomers() {
	return {
		type: SUBMIT_LIAISON_ASTRONOMERS_START
	}
}

function submitLiaisonAstronomersFail() {
	return {
		type: SUBMIT_LIAISON_ASTRONOMERS_FAIL
	}
}

function submitLiaisonAstronomersPass() {
	return {
		type: SUBMIT_LIAISON_ASTRONOMERS_PASS
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
				submitLiaisonAstronomers(dispatch, proposals, semester),
				submitTechnicalReports(dispatch, proposals, semester)
			]);
	}
}

async function submitLiaisonAstronomers(dispatch, proposals, semester) {
	dispatch(startSubmitLiaisonAstronomers());
	try {
		const assignments = proposals.map(p => {
			return {
				proposalCode: p.proposalCode,
				liaisonAstronomer: p.liaisonAstronomer
			}
		});
		await jsonClient().post('liaison-astronomers', {semester, assignments});
		dispatch(submitLiaisonAstronomersPass());
	} catch (e) {
		dispatch(submitLiaisonAstronomersFail());
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