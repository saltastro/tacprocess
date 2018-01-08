import { isFloat } from "../util";


export function illegalAllocation(proposal, priority) {
  const t = proposal.allocatedTime[priority];
  return !isFloat(t) || parseFloat(t) < 0;
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
