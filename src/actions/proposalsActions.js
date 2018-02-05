import { queryProposals } from "../api/graphQL"
import { getTechReportFields } from "../util";
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

function FetchProposalsFail() {
	return (
		{
			type: FETCH_PROPOSALS_FAIL
		}
	);
}

function FetchProposalsPass(proposals) {
	return (
		{
			type: FETCH_PROPOSALS_PASS,
			payload: proposals
		}
	);
}


export default function fetchProposals(semester, partner="All") {
	return function disp(dispatch){
		dispatch(startFetchProposals());
		queryProposals(semester, partner).then( res =>
			{
				dispatch(FetchProposalsPass(res))
			}
		).catch((e) => {
			console.error(e);
			dispatch(FetchProposalsFail())})
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
