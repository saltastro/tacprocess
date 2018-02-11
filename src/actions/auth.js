import { USER_LOGGED_IN,
	USER_LOGGED_OUT,
	FETCHING_USER,
	FAIL_TO_GET_USER,
	SWITCH_USER_START,
	SWITCH_USER_FAIL,
	PARTNER_CHANGE,
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

export const fetchingUserFail = (error) => ({
	type: FAIL_TO_GET_USER,
    payload: { error }
});

export const switchUserStart = () => ({
	type: SWITCH_USER_START
});

export const switchUserFail = (error) => ({
	type: SWITCH_USER_FAIL,
    payload: { error }
});

export const switchUser = (username) => {
	return async (dispatch) => {
		dispatch(switchUserStart());
		try {
			const user = await api.user.switchUser(username);
			localStorage.tacPageJWT = user.token;
			const userData = await queryUserData();
			dispatch(partnersFilter(firstSelectedPartner(user.roles)));
			dispatch(userLoggedIn(userData));
		} catch (e) {
			dispatch(switchUserFail(e.message));
		}
	}
};

export const partnersFilter = partner => ({
	type: PARTNER_CHANGE,
	changeTo: partner
});

export const login = credentials => {
	return async (dispatch) => {
		try {
			const user = await api.user.login(credentials);
			localStorage.tacPageJWT = user.token;
			const userData = await queryUserData();
			dispatch(userLoggedIn(userData));
			dispatch(partnersFilter(firstSelectedPartner(user.roles)))
		} catch (e) {
			dispatch(fetchingUserFail(e.message));
		}
	}
};

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
		}).catch((e) => dispatch(fetchingUserFail(e.message)))
	}
}
