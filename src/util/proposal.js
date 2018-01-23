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
