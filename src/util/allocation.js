import { isFloat, NumberParser } from '../util'

export function illegalAllocation(proposal, priority, partner) {
  const t = proposal.allocatedTime[ partner ] ? proposal.allocatedTime[ partner ][ priority ] : 0
  return !isFloat(t) || new NumberParser(window.navigator.language).parse(t) < 0
}

export function checkAllocatedTimes(proposals, partner){
  /*
   *
   *
   * @param proposals and array of proposals
   * @return true if all the allocated times correct else false
   */
  return !proposals.some( p => [0, 1, 2, 3, 4].some(ind => illegalAllocation(p, `p${ ind }`, partner)) )
}

export function getQuaryToAddAllocation(proposals, partner, semester){
  const allocationsList = []
  const commentList = []

  // TODO: this must check validy of allocations
  if (checkAllocatedTimes(proposals, partner)){
    proposals.forEach( p => {
      commentList.push(`{
            proposalCode: "${ p.proposalCode }",
            comment: "${ (p.tacComment[ partner ] ? p.tacComment[ partner ].comment : '')
    .replace(/(?:\\)/g, '\\\\')
    .replace(/(?:\r\n|\r|\n)/g, '\\n')
    .replace(/(?:")/g, '\\"') }"
         }`);
      [0, 1, 2, 3, 4].forEach( t => {
        const priority = `p${ t }`
        allocationsList.push(
          `{
               proposalCode: "${ p.proposalCode }",
               priority: ${ t },
               time: ${ p.allocatedTime[ partner ] ? 
            new NumberParser().parse(p.allocatedTime[ partner ][ priority ]) : 0 }
            }`
        )
      })
    })
  }

  return `
      mutation uta {
        updateTimeAllocations(timeAllocations: {
          partner: "${ partner }",
          semester: "${ semester }",
          timeAllocations: [
            ${ allocationsList }
          ],
          tacComments: [
            ${ commentList }
          ]
        }) {
          success
        }
      }
  `
}
