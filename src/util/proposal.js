import {makeTechComment} from "./index";

const isProposalRequestingTimeInPartner = (request, partner) => {
	
	let belong = false;
	if (request[partner]){
		if (request[partner] > 0){
			belong = true
		}
	}
	return belong;
};




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
		if (partner !== "OTH"){
			(proposalList || []).forEach( proposal => {
				if (!proposalPerPartner[partner]){
					proposalPerPartner[partner] = [];
					if (isProposalRequestingTimeInPartner(proposal.requestedTime.requests, partner)){
						proposalPerPartner[partner].push(proposal)
					}
					
				}else{
					if (isProposalRequestingTimeInPartner(proposal.requestedTime.requests, partner)){
						proposalPerPartner[partner].push(proposal)
					}
				}
			})}
	});
	return proposalPerPartner
}

export const didReportChange = (proposal, initProposals, semester) => {
	let didIt = false;
	(initProposals || []).forEach(p => {
		if (p.proposalCode === proposal.proposalCode){
			didIt = makeTechComment(p.techReviews[semester]) !== makeTechComment(proposal.techReviews[semester])
		}
	});
	return didIt
};

/**
 * check if proposal is requesting anytime from previous semester and if so it can not be new proposal
 * hence return false
 *
 * @param proposal A proposal from API
 * @param semester
 * @return Boolean (true) if the proposal is new
 * */
export const isNewProposal = (proposal, semester) => {
	return !proposal.timeRequests.some(t =>  t.semester < semester )
};