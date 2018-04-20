import { querySALTAstronomers } from "../api/graphQL"
import {
	FETCH_SA_START,
	FETCH_SA_PASS,
	FETCH_SA_FAIL
} from "../types";

function startFetchSA() {
	return (
		{
			type: FETCH_SA_START
		}
	);

}
function FetchSAFail(error) {
	return (
		{
			type: FETCH_SA_FAIL,
			payload: { error }
		}
	);
}

function FetchSAPass(sa) {
	return (
		{
			type: FETCH_SA_PASS,
			payload: sa
		}
	);
}

function convertSA(sa){
	const convertedSA = sa.SALTAstronomers.map(ast => (
		{
			name: ast.name,
			username: ast.username,
			surname: ast.surname
		}
	));
	return convertedSA
}

export default function fetchSA(){
	return function disp(dispatch){
		dispatch(startFetchSA());
		querySALTAstronomers().then( res =>
			{
				dispatch(FetchSAPass(convertSA(res.data.data)))
			}
		).catch((e) => {
			dispatch(FetchSAFail(e.message))})
	}
}
