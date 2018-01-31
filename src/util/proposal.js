export default function PartnerProposals(proposalList, partners){
	/**
	 *
	 *
	 * @param proposals
	 * @param partner
	 * @return proposals belonging to that partner
	 */
	
	let proposalPerPartner = {};
	
	partners.forEach(partner => {
		proposalList.forEach( proposal => {
			if (!proposalPerPartner[partner]){
				proposalPerPartner[partner] = [];
				if (proposal.allocatedTime[partner]){
					proposalPerPartner[partner].push(proposal)
				}
				
			}else{
				if (proposal.allocatedTime[partner]){
					proposalPerPartner[partner].push(proposal)
				}
			}
		})
	});
	return proposalPerPartner
}
