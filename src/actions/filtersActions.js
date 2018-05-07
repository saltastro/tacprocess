
import {
  SEMESTER_CHANGE,
  PARTNER_CHANGE,
  ASTRONOMER_CHANGE
} from "../types";

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

export function astronomerChange(load) {
  return (
    {
       type: ASTRONOMER_CHANGE,
       current: load
  }
);
}
