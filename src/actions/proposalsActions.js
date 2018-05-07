import {convertProposals, queryProposals} from '../api/graphQL'
import {
	FETCH_PROPOSALS_START,
	FETCH_PROPOSALS_PASS,
	FETCH_PROPOSALS_FAIL,
	UPDATING_PROPOSALS,
} from "../types";

function startFetchProposals() {
	return (
		{
			type: FETCH_PROPOSALS_START
		}
	);

}

function FetchProposalsFail(error) {
	return (
		{
			type: FETCH_PROPOSALS_FAIL,
			payload: { error }
		}
	);
}

export function fetchProposalsPass(proposals, semester) {
	return (
		{
			type: FETCH_PROPOSALS_PASS,
			payload: {
				proposals,
				semester
			}
		}
	);
}


export default function fetchProposals(semester, partner="All") {
	return function disp(dispatch){
		dispatch(startFetchProposals());
		queryProposals(semester, partner).then( res =>
			{
				dispatch(fetchProposalsPass(convertProposals(res.data.data, semester, partner), semester))
			}
		).catch((e) => {
			dispatch(FetchProposalsFail(e.message))})
	}
}

export function updateProposals(load) {
	return (
		{
			type: UPDATING_PROPOSALS,
			payload: load
		}
	);
}
