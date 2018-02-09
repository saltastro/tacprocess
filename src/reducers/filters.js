import {
	FETCH_SELECTOR_DATA_START,
	FETCH_SELECTOR_DATA_PASS,
	FETCH_SELECTOR_DATA_FAIL,
	PAGE_CHANGE,
	SEMESTER_CHANGE,
	PARTNER_CHANGE,
	ASTRONOMER_CHANGE,
	USER_LOGGED_OUT
} from "../types";
import { defaultSemester } from '../util';

const initialState = {
	fetching: false,
	errors: false,
	selectedSemester: defaultSemester(),
	selectedLiaison: "All"
	
};

export default function selectors(state=initialState, action={}) {
	switch (action.type) {
		case FETCH_SELECTOR_DATA_START:{
			return {
				...state,
				fetching: true,
				errors: false,
			};}
		case FETCH_SELECTOR_DATA_FAIL: {
			return {
				...state,
				fetching: false,
				errors: true
			}
		}
		case FETCH_SELECTOR_DATA_PASS: {
			return {
				...state,
				fetching: false,
				errors: false,
				filters: action.filters,
			}
		}
		case PAGE_CHANGE: {
			return {
				...state,
				currentPage: action.current,
			}
		}
		case SEMESTER_CHANGE: {
			return {
				...state,
				selectedSemester: action.filters,
			}
		}
		case PARTNER_CHANGE: {
			return {
				...state,
				selectedPartner: action.changeTo,
			}
		}
		case ASTRONOMER_CHANGE: {
			return {
				...state,
				selectedLiaison: action.current,
			}
		}
		case USER_LOGGED_OUT: {
			return initialState
		}
		default:{
			return state;
		}
		
	}
	
}
