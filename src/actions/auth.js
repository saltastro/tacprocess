import { USER_LOGGED_IN,
	USER_LOGGED_OUT,
	FETCHING_USER,
	FAIL_TO_GET_USER,
	SWITCH_USER_START,
	SWITCH_USER_FAIL,
	PARTNER_CHANGE
} from "../types";
import { queryUserData } from "../api/graphQL"
import api from "../api/api";
import { firstSelectedPartner } from "../util/filters";

export const userLoggedIn = user => {
	return ({
		type: USER_LOGGED_IN,
		payload: user
	})};

export const userLoggedOut = () => ({
	type: USER_LOGGED_OUT
});

export const fetchingUserData = () => ({
	type: FETCHING_USER
});

export const fetchingUserFail = () => ({
	type: FAIL_TO_GET_USER
});

export const switchUserStart = () => ({
	type: SWITCH_USER_START
});

export const switchUserFail = () => ({
	type: SWITCH_USER_FAIL
});

export const switchUser = (username) => {
	return async (dispatch) => {
		dispatch(switchUserStart());
		try {
            const user = await api.user.switchUser(username);
            console.log({user});
            localStorage.tacPageJWT = user.token;
            const userData = await queryUserData();
            dispatch(userLoggedIn(userData));
        } catch (e) {
			dispatch(switchUserFail());
		}
	}
};

export const partnersFilter = partner => ({
	type: PARTNER_CHANGE,
	changeTo: partner
});

export const login = credentials => dispatch =>
	api.user.login(credentials)
			.then(user => {
				localStorage.tacPageJWT = user.token;
				dispatch(userLoggedIn(user));
			});

export const logout = () => dispatch => {
	localStorage.removeItem("tacPageJWT");
	dispatch(userLoggedOut());
};


export function fetchUserData(){
	return function disp(dispatch){
		dispatch(fetchingUserData());
		queryUserData().then(user => {
			dispatch(userLoggedIn(user));
			dispatch(partnersFilter(firstSelectedPartner(user.roles)))
		}).catch(() => dispatch(fetchingUserFail()))
	}
}
