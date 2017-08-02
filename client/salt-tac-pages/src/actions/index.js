import { v4 } from 'uuid';

import C from '../constants';
import * as api from '../api';

export function fetchProposals(semester) {
    return dispatch => {
        dispatch(fetchProposalsStarted());
        return api.fetchProposals(semester)
                .then(proposals => dispatch(fetchProposalsSucceeded(proposals)))
                .catch(message => dispatch(fetchProposalsFailed(message)));
    }
}

export function fetchProposalsStarted() {
    return {
        type: C.FETCH_PROPOSALS_STARTED
    };
}

export function fetchProposalsSucceeded(proposals) {
    return {
        type: C.FETCH_PROPOSALS_SUCCEEDED,
        payload: {
            proposals
        }
    };
}

export function fetchProposalsFailed(message) {
    return {
        type: C.FETCH_PROPOSALS_FAILED,
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
        type: C.DELETE_PROPOSALS_ERROR,
        payload:{
            id
        }
    };
}
