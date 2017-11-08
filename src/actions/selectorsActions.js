
import { querySelectorData } from "../api/graphQL"
import {
  FETCH_SELECTOR_DATA_PASS,
  FETCH_SELECTOR_DATA_FAIL,
  FETCH_SELECTOR_DATA_START,
  SEMESTER_CHANGE,
  PARTNER_CHANGE
} from "../types";

export const convertData = data => {
  let partners = data.partners.map( partner => (
      {value: partner.PartnerCode, label:partner.PartnerCode}
  ));
  const semesters = data.semesters.map( semester => (
       {
         value:`${semester.Year}-${semester.Semester}`,
         label:`${semester.Year}-${semester.Semester}`
       }
  ));
  partners = [{value: "All", label: "All"}].concat(partners)
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

export function semesterChange(load) {
  return (
    {
       type: SEMESTER_CHANGE,
       payload: load
  }
);
}

export function partnerChange(load) {
  return (
    {
       type: PARTNER_CHANGE,
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
