
import {
  FETCH_SELECTOR_DATA_PASS,
  SEMESTER_CHANGE,
  PARTNER_CHANGE, PAGE_CHANGE,
  ASTRONOMER_CHANGE
} from "../types";

export const convertData = data => {
  let partners = data.partner.map( p => (
      {value: p, label: p}
  ));
  const semesters = data.semester.map( s => (
       { value: s, label: s }
  ));
  partners = [{value: "All", label: "All"}].concat(partners)
  return {
    partners,
    semesters
  }
};



const filters =  (load)  => (
    {
       type: FETCH_SELECTOR_DATA_PASS,
       filters: load,
       selectedPartner: "All"
    }
)

export function semesterChange(load) {
  return (
    {
       type: SEMESTER_CHANGE,
       filters: load
  }
);
}

export function partnerChange(load) {
  return (
    {
       type: PARTNER_CHANGE,
       changeTo: load
  }
);
}


export function pageChange(load) {
  return (
    {
       type: PAGE_CHANGE,
       current: load
  }
);
}

export function astronomerChange(load) {
  return (
    {
       type: ASTRONOMER_CHANGE,
       current: load
  }
);
}

// export function fetchSelectorsData(){
//   return function disp(dispatch){
//
//     dispatch(startFetchData());
//     querySelectorData().then( res =>{
//       dispatch(FetchDataPass(convertData(res.data.data.selectors)))}
//     ).catch(() => dispatch(FetchDataFail()))
//   }
// }

export const storeFilters = (semesters, partners) => function fits(dispatch) {
    dispatch(filters({semesters, partners}))
  }
