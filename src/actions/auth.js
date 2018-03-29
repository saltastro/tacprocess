import {
	USER_LOGGED_IN,
	USER_LOGGED_OUT,
	FETCHING_USER,
	FAIL_TO_GET_USER,
	SWITCH_USER_START,
	SWITCH_USER_FAIL,
	PARTNER_CHANGE, ALL_PARTNER,
} from "../types";
import { queryUserData } from "../api/graphQL"
import api from "../api/api";
import fetchTargets from "./targetsActions";
import {storePartnerAllocations} from "./timeAllocationActions";
import fetchProposals from "./proposalsActions";
import {defaultSemester} from "../util";
import {setToken, removeToken} from "../util/storage";

export const userLoggedIn = user => ({
	type: USER_LOGGED_IN,
	payload: user
});

export const userLoggedOut = () => ({
	type: USER_LOGGED_OUT
});

export const fetchingUserData = () => ({
	type: FETCHING_USER
});

export const fetchingUserFail = (error) => {

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
	dispatch(switchUserStart());
	try {
		const user = await api.user.switchUser(username);
		setToken(user);
		const userData = await queryUserData();
		dispatch(partnersFilter(ALL_PARTNER));
		dispatch(userLoggedIn(userData));
	} catch (e) {
		dispatch(switchUserFail(e.message));
	}
};

export const login = credentials => async (dispatch) => {
	try {
		const user = await api.user.login(credentials);
		setToken(user);
		const userData = await queryUserData();
		dispatch(userLoggedIn(userData));
		const semester = defaultSemester();

		dispatch(partnersFilter(ALL_PARTNER));

		dispatch(fetchProposals( semester, ALL_PARTNER));
		dispatch(fetchTargets(semester, ALL_PARTNER));
		dispatch(storePartnerAllocations(semester, ALL_PARTNER));
	} catch (e) {
		dispatch(fetchingUserFail(e.message));
	}
};

export const logout = () => dispatch => {
	removeToken();
	dispatch(userLoggedOut());
};

export function fetchUserData(){
	return function disp(dispatch){
		dispatch(fetchingUserData());
		queryUserData().then(user => {
			dispatch(userLoggedIn(user));
			dispatch(partnersFilter(ALL_PARTNER))
		}).catch((e) => dispatch(fetchingUserFail(e.message)))
	}
}
