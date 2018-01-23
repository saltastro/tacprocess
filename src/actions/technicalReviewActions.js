import {
    UPDATE_LIAISON_ASTRONOMER, UPDATE_TECHNICAL_REPORT
} from '../types';

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