

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