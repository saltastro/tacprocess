import {
	USER_LOGGED_IN,
	USER_LOGGED_OUT,
	FAIL_TO_GET_USER,
	SWITCH_USER_START,
	SWITCH_USER_FAIL,
	PARTNER_CHANGE, ALL_PARTNER,
} from "../types";
import api from "../api/api";
import {defaultSemester} from "../util";
import {setToken, removeToken} from "../util/storage";
import {fetchAllData} from './data-actions'

export const userLoggedIn = user => ({
	type: USER_LOGGED_IN,
	payload: user
});

export const userLoggedOut = () => ({
	type: USER_LOGGED_OUT
});

export const fetchingUserFail = (error) => {
	removeToken();
	return {
	type: FAIL_TO_GET_USER,
	payload: { error }
	};
};

export const switchUserStart = () => ({
	type: SWITCH_USER_START
});

export const switchUserFail = (error) => ({
	type: SWITCH_USER_FAIL,
	payload: { error }
});

export const partnersFilter = partner => ({
	type: PARTNER_CHANGE,
	changeTo: partner
});

export const switchUser = (username) =>  async (dispatch) => {
  const semester = defaultSemester();
	dispatch(switchUserStart());
	try {
		const user = await api.user.switchUser(username);
		await setToken(user);
		dispatch(fetchAllData(semester, ALL_PARTNER))
	} catch (e) {
		dispatch(switchUserFail(e.message));
	}
};

export const login = credentials => async (dispatch) => {
	const semester = defaultSemester();
	try {
		const user = await api.user.login(credentials);
		await setToken(user);
		dispatch(fetchAllData(semester, ALL_PARTNER))
	} catch (e) {
		dispatch(fetchingUserFail(e.message));
	}
};

export const logout = () => dispatch => {
	removeToken();
	dispatch(userLoggedOut());
};
