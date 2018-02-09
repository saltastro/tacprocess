import {
	USER_LOGGED_IN, USER_LOGGED_OUT, FETCHING_USER, FAIL_TO_GET_USER, SWITCH_USER_START, SWITCH_USER_FAIL
} from "../types";


const initialState = {
	user: {
		firstName: undefined,
		lastName: undefined,
		email: undefined,
		username: undefined,
		roles: undefined,
		isAuthenticated: !!localStorage.tacPageJWT
	}};


export default function user(state = initialState, action = {}) {
	switch (action.type) {
	case USER_LOGGED_IN:
		return {
			...state,
			user: {
				...action.payload,
				isAuthenticated: true
            },
			fetching: false,
			error: null
		};

	case USER_LOGGED_OUT: {
		return initialState
		}

	case FETCHING_USER:
		return {
			
			user: {
					isAuthenticated: state.user.isAuthenticated
			},
			fetching: true,
			error: null
		};

	case FAIL_TO_GET_USER:
		return {
			...state,
            user: {
				...state.user,
	            username: action.payload.username,
                isAuthenticated: false
            },
			fetching: false,
			error: 'Authentication failed'
		};

	case SWITCH_USER_START:
		return {
			...state,
			fetching: true,
			error: null
		};

	case SWITCH_USER_FAIL:
		return {
			...state,
			fetching: false,
			error: 'The user could not be switched'
		};

	default:
			return state;

	}
}
