const isProposalRequestingTimeInPartner = (request, partner, semester) => {
	
	let belong = false;
	(request || []).forEach( r => {
		if (r.semester === semester){
			(r.distribution || []).forEach( d => {
				if (d.partnerCode === partner){
					belong = true
				}
			})
		}
	});
	return belong;
};




export default function PartnerProposals(proposalList, partners, semester){
	/**
	 *
	 *
	 * @param proposals
	 * @param partner
	 * @return proposals belonging to that partner
	 */
	
	let proposalPerPartner = {};
	
	partners.forEach(partner => {
		if (partner !== "OTH"){
			proposalList.forEach( proposal => {
				if (!proposalPerPartner[partner]){
					proposalPerPartner[partner] = [];
					if (isProposalRequestingTimeInPartner(proposal.timeRequests, partner, semester)){
						proposalPerPartner[partner].push(proposal)
					}
					
				}else{
					if (isProposalRequestingTimeInPartner(proposal.timeRequests, partner, semester)){
						proposalPerPartner[partner].push(proposal)
					}
				}
			})}
	});
	return proposalPerPartner
}
