import { v4 } from 'uuid';

import C from '../constants';
import * as api from '../api';

export function fetchSemesterData(semester) {
    return dispatch => {
        dispatch(fetchProposalsStarted(semester));
        return api.fetchProposals(semester)
                .then(proposals => dispatch(fetchProposalsSucceeded(proposals)))
                .catch(message => dispatch(fetchProposalsFailed(message)));
    }
}

export function fetchProposalsStarted(semester) {
    return {
        type: C.FETCH_SEMESTER_DATA_STARTED,
        payload: {
            semester
        }
    };
}

export function fetchProposalsSucceeded(proposals) {
    return {
        type: C.FETCH_SEMESTER_DATA_SUCCEEDED,
        payload: {
            proposals
        }
    };
}

export function fetchProposalsFailed(message) {
    return {
        type: C.FETCH_SEMESTER_DATA_FAILED,
        payload: {
            error: {
                id: v4(),
                message
            }
        }
    };
}

export function deleteProposalsError(id) {
    return {
        type: C.DELETE_SEMESTER_DATA_ERROR,
        payload:{
            id
        }
    };
}
