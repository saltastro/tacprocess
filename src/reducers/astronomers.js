import {
	FETCH_SA_START,
	FETCH_SA_PASS,
	FETCH_SA_FAIL,
	USER_LOGGED_OUT
} from "../types";

const initialState = {
	fetching: false,
	fetched: false,
	SALTAstronomer:[],
	errors: null,
};

export default function SALTAstronomers(state = initialState, action = {}) {
	switch (action.type) {
		case FETCH_SA_START:{
			return {
				...state,
				fetching: true,
			};}
		case FETCH_SA_FAIL: {
			return {
				...state,
				fetching: false,
				fetched: false,
				errors: "Fail to get SA from api" }
			
		}
		case FETCH_SA_PASS: {
			return {
				...state,
				fetching: false,
				fetched: true,
				SALTAstronomer: action.payload,
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
