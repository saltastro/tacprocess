import { v4 } from 'uuid';

import C from '../constants';
import * as api from '../api';
import Partner from '../util/partner';

export function fetchSemesterData(partner, semester) {
    return dispatch => {
        dispatch(fetchSemesterDataStarted(partner, semester));
        api.fetchSemesterData(partner, semester)
                .then((semesterData) => {
                    dispatch(fetchSemesterDataSucceeded(semesterData.proposals,
                                                        semesterData.targets,
                                                        semesterData.availableTime));
                })
                .catch((error) => {
                    dispatch(fetchSemesterDataFailed((error.toString())))
                });
    }
}

export function fetchSemesterDataStarted(partner, semester) {
    return {
        type: C.FETCH_SEMESTER_DATA_STARTED,
        payload: {
            partner,
            semester
        }
    };
}

export function fetchSemesterDataSucceeded(proposals, targets, availableTime) {
    return {
        type: C.FETCH_SEMESTER_DATA_SUCCEEDED,
        payload: {
            proposals,
            targets,
            availableTime
        }
    };
}

export function fetchSemesterDataFailed(message) {
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

export function deleteSemesterDataError(id) {
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
                .then((user) => {
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
