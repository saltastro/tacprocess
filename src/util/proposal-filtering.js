export const isLiaisonAstronomerUpdated = (proposal, initProposals) => {
  const initProposal = initProposals.find(p => p.proposalCode === proposal.proposalCode)
  if (!initProposal) return true
  return proposal.liaisonAstronomer !== initProposal.liaisonAstronomer
}

export  const dummyFunction = () => undefined