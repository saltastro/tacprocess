

export const isReviewer = (proposalCode, semester, initProposals) => initProposals.some(p => {
    if( p.proposalCode === proposalCode){
      return !p.techReviews[semester].reviewer.username
    }
    return false
  });

export const isLiaisonAstronomer = (proposalCode, initProposals) => initProposals.some(p => {
    if( p.proposalCode === proposalCode){
      return !!p.liaisonAstronomer
    }
    return false
  });

export const isLiaisonAstronomerChanged = (proposal, initProposals) => initProposals.some(p => {
  if( p.proposalCode === proposal.proposalCode){
    return (p.liaisonAstronomer === proposal.liaisonAstronomer)
  }
  return false
});