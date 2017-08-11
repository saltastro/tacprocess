import { v4 } from 'uuid';

import C from '../constants';
import * as api from '../api';
import Partner from '../util/partner';

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
        payload: {
            id
        }
    };
}

export function login(username, password) {
    return dispatch => {
        dispatch(loginStarted());
        api.login(username, password)
                .then((response) => {
                    const userData = response.data;
                    let partner = Partner.partnerByCode('NONE');
                    if (userData.partnerCode) {
                        partner = Partner.partnerByCode(userData.partnerCode);
                    }
                    delete userData['partnerCode'];
                    const user = {
                        ...userData,
                        partner
                    };
                    api.saveUser(user);
                    dispatch(loginSucceeded(user))
                })
                .catch(response => dispatch(loginFailed(response.data)));
    }
}

export function loginStarted() {
    return {
        type: C.LOGIN_STARTED
    };
}

export function loginSucceeded(user) {
    return {
        type: C.LOGIN_SUCCEEDED,
        payload: {
            user
        }
    };
}

export function loginFailed(message) {
    return {
        type: C.LOGIN_FAILED,
        payload: {
            error: {
                id: v4(),
                message
            }
        }
    };
}

export function deleteLoginError(id) {
    return {
        type: C.DELETE_LOGIN_ERROR,
        payload: {
            id
        }
    };
}

export function logout() {
    api.logout();

    return {
        type: C.LOGOUT
    }
}
