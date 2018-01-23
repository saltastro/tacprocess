import {
    SUBMIT_LIAISON_ASTRONOMERS_FAIL,
    SUBMIT_LIAISON_ASTRONOMERS_PASS,
    SUBMIT_LIAISON_ASTRONOMERS_START,
    SUBMIT_TECHNICAL_REPORTS_FAIL,
    SUBMIT_TECHNICAL_REPORTS_PASS,
    SUBMIT_TECHNICAL_REPORTS_START,
    UPDATE_LIAISON_ASTRONOMER,
    UPDATE_TECHNICAL_REPORT,
} from '../types';
import { jsonClient } from '../api/api';

/**
 * An action for updating the liaison astronomer of a proposal in the local store.
 *
 * @param proposalCode Proposal code, such as "2018-1-SCI-009".
 * @param liaisonAstronomer Username of the liaison astronomer.
 * @returns {{type, payload: {proposalCode: *, liaisonAstronomer: *}}} The action.
 */
export function updateLiaisonAstronomer(proposalCode, liaisonAstronomer) {
    return {
        type: UPDATE_LIAISON_ASTRONOMER,
        payload: {
            proposalCode,
            liaisonAstronomer
        }
    }
}

/**
 * An action for updating the technical report of a proposal in the local store.
 *
 * @param proposalCode Proposal code, such as "2018-1-SCI-009".
 * @param semester Semester, such as "2018-1".
 * @param techReport Technical report.
 * @returns {{type, payload: {proposalCode: *, semester: *, techReport: *}}} The action.
 */
export function updateTechnicalReport(proposalCode, semester, techReport) {
    return {
        type: UPDATE_TECHNICAL_REPORT,
        payload: {
            proposalCode,
            semester,
            techReport
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
                report: p.techReport
            }
        });
        await jsonClient().post('technical-reports', {semester, reports});
        dispatch(submitTechnicalReportsPass());
    } catch (e) {
        dispatch(submitTechnicalReportsFail());
    }
}