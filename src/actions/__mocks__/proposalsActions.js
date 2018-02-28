import {
	FETCH_PROPOSALS_START,
	FETCH_PROPOSALS_PASS,
	FETCH_PROPOSALS_FAIL,
	UPDATING_PROPOSALS,
} from "../../types";
import {queryProposals} from "../../api/__mocks__/graphQL";

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

function FetchProposalsPass(proposals, semester) {
	return (
		{
			type: FETCH_PROPOSALS_PASS,
			payload: {
				proposals: proposals,
				semester: semester
			}
		}
	);
}


export default function fetchProposals(semester, partner="All") {
	return function disp(dispatch){
		dispatch(startFetchProposals());
		queryProposals(semester, partner).then( res =>
			{
				dispatch(FetchProposalsPass(res, semester))
			}
		).catch((e) => {
			dispatch(FetchProposalsFail(e.message))})
	}
}
