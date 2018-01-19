import _ from "lodash"
import { ALL_PARTNER } from "../types"


export function totalTimeRequestedPerParner(proposals, semester, partner="All" ){
  /*
  *
  * @param proposals of a selected partner all or single
  * @param semester selected semester
  * @param partner all partners or a single
  * @return total
  */

  let total = 0
  proposals.forEach( p =>{
    p.timeRequests.forEach( r => {
      if (r.semester === semester){
        r.distribution.forEach(d => {
          if ( partner === "All"){
            total += d.time
          }else if (d.partnerCode === partner){
              total += d.time
            }
        })

      }
    })
  })
  return total
}

export function userPartners(roles) {
  let allPartners = [{value: "All", label: "All", role: ""}]
  if (! _.isEmpty(roles)){
    roles.forEach(u => {
        u.partners.forEach( s => {
          if ( _.findIndex(allPartners, { value: s, label: s }) === -1 ){
            allPartners.push({ value: s, label: s, role: u.type })
          }
        }
      );
    })
  }
  return allPartners
}

export const semesterFilter = () => {
    let startYear = 2006
    const today = new Date();
    const year = today.getFullYear()
    let semester = []
    while (startYear < year + 8){
      semester.push(
        {value: `${ startYear }-1`, label: `${startYear  }-1` },
        {value: `${ startYear }-2`, label: `${startYear  }-2` }
      )
    startYear += 1
  }
  return semester
}

export const firstSelectedPartner = roles => {
  let first = ALL_PARTNER

  for (let r of roles) {
    if (r.type === "ADMINISTRATOR") {
      first = ALL_PARTNER;
      break;
    }
    if (r.type === "SALT_ASTRONOMER") {
      first = ALL_PARTNER;
      break;
    }
    if (r.type === "TAC_CHAIR") {
      first = r.partners[0] || "";
    }
    if (r.type === "TAC_MEMBER") {
      first = r.partners[0] || "";
    }
}

  return first
}
const toSelectorObj = partner => ({label: partner, value: partner})
const toSelectorObjs = partners => {
    return partners.map( p => (toSelectorObj(p)))
}

export const getPartnerList = roles => {
  let partnerList = []
  for (let r of roles) {
    if (r.type === "ADMINISTRATOR") {
      partnerList = toSelectorObjs(r.partners);
      partnerList.push({label: ALL_PARTNER, value: ALL_PARTNER})
      break;
    }
    if (r.type === "SALT_ASTRONOMER") {
      partnerList = toSelectorObjs(r.partners);
      partnerList.push({label: ALL_PARTNER, value: ALL_PARTNER})
      break;
    }
    if (r.type === "TAC_CHAIR") {
      partnerList = toSelectorObjs(r.partners);
    }
    if (r.type === "TAC_MEMBER") {
      partnerList = toSelectorObjs(r.partners);
    }
  }
  return partnerList
}
