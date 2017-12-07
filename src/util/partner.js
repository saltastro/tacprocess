import _ from "lodash"


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

export function userPartners(user) {
  let allPartners = []
  if (! _.isEmpty(user)){
    user.user.role.forEach(u => {
        u.partners.forEach( s => {
          if ( _.findIndex(allPartners, { value: s, label: s }) === -1 ){
            allPartners.push({ value: s, label: s })
          }
        }
      );
    })
  }
  allPartners = [{value: "All", label: "All"}].concat(allPartners)
  return allPartners
}
