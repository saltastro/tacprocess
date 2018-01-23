export default function PartnerProposals(proposalList, partners){
  /**
   *
   *
   * @param proposals
   * @param partner
   * @return proposals belonging to that partner
   */

   let proposalPerPartner = {}

   partners.forEach(partner => {
     proposalList.forEach( proposal => {
       if (!proposalPerPartner[partner.value]){
         proposalPerPartner[partner.value] = []
         if (proposal.allocatedTime[partner.value]){
           proposalPerPartner[partner.value].push(proposal)
         }

       }else{
         if (proposal.allocatedTime[partner.value]){
           proposalPerPartner[partner.value].push(proposal)
         }
       }
     })
   })
   return proposalPerPartner
}

// This utility method checks if the user role is of interest
export const hasRole = (user, insterestedRole) => {
  // Retrieve the partners a user has
  let partners = user.partners;
  // Keeping track if the partner role of interest is found
  let found = false;
  // Updating the tracking variable if the role of interest is found
  partners.forEach(partner => {
    if(partner.role === insterestedRole){
      found = true;
    }
  });
  return found;
}

// This utility method checks if the user may update the Astronomer.
export const mayUpdateLiaison = (user) => {
  return hasRole(user, "ADMINISTRATOR");
}

// This utility method checks if the user may assign him/her to a proposal
export const mayAssignSelf = (user) => {
  return hasRole(user, "ASTRONOMER");
}

// This utility method checks if a proposal has assigned an Astronomer or not
export const astronomerAssigned = (proposal) => {
    if(!proposal.SALTAstronomer){
      return true;
    }
}
