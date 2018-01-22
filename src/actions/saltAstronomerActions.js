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
function FetchSAFail() {
  return (
    {
       type: FETCH_SA_FAIL
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
  const convertedSA = sa.SALTAstronomers.map(sa => (
          {
              name: sa.name,
              username: sa.username,
              surname: sa.surname
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
    ).catch(() => {
      dispatch(FetchSAFail())})
  }
}
