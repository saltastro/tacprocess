
import { querySelectorData } from "../api/graphQL"
import {
  FETCH_SELECTOR_DATA_PASS,
  FETCH_SELECTOR_DATA_FAIL,
  FETCH_SELECTOR_DATA_START
} from "../types";

export const convertData = data => {
  let partners = data.partners.map( partner => (
      partner.PartnerCode
  ));
  const semesters = data.semesters.map( semester => (
       `${semester.Year}-${semester.Semester}`
  ));
  partners = ["All"].concat(partners)
  return {
    partners,
    semesters
  }
};

function startFetchData() {
  return (
    {
       type: FETCH_SELECTOR_DATA_START
  }
);

}
function FetchDataFail() {
  return (
    {
       type: FETCH_SELECTOR_DATA_FAIL
  }
);
}

function FetchDataPass(load) {
  return (
    {
       type: FETCH_SELECTOR_DATA_PASS,
       payload: load
  }
);
}

export function fetchSelectorsData(){
  return function disp(dispatch){
    dispatch(startFetchData());
    querySelectorData().then( res =>
      dispatch(FetchDataPass(convertData(res.data.data)))
    ).catch(() => dispatch(FetchDataFail()))
  }
}
