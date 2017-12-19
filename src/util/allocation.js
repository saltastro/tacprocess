import { isFloat } from "../util";


export function illegalAllocation(element, index, array){
  if(
    !(isFloat(element.allocatedTime.p0)) ||
    !(isFloat(element.allocatedTime.p1)) ||
    !(isFloat(element.allocatedTime.p2)) ||
    !(isFloat(element.allocatedTime.p3)) ||
    !(isFloat(element.allocatedTime.p4)) ||
    !(parseFloat(element.allocatedTime.p0) >= 0) ||
    !(parseFloat(element.allocatedTime.p1) >= 0) ||
    !(parseFloat(element.allocatedTime.p2) >= 0) ||
    !(parseFloat(element.allocatedTime.p3) >= 0) ||
    !(parseFloat(element.allocatedTime.p4) >= 0)
){
    return true
  }
  return false
}

export function checkAllocatedTimes(proposals){
  /*
   *
   *
   * @param proposals and array of proposals
   * @return true if all the allocated times correct else false
   */
  return !proposals.some(illegalAllocation)
}

export function getQuaryToAddAllocation(proposals, partner, semester){
  const pList = []
  if (checkAllocatedTimes(proposals)){

    proposals.forEach(p => (
      [0, 1, 2, 3, 4].forEach( t => {
        const priority = `p${t}`
        pList.push(
        `{
            proposalCode: "${p.proposalCode}",
            priority: ${t},
            time: ${p.allocatedTime[priority]}
         }`
      )}
    )
    ))
  }
  const mutateQuery = `
      mutation uta {
        updateTimeAllocations(timeAllocations: {
          partner: "${ partner }",
          semester: "${ semester }",
          timeAllocations: [
            ${pList}
          ]
        }) {
          success
        }
      }
  `
  return mutateQuery
}
