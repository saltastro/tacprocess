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
	
	const proposalPerPartner = {};
	
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
export const isNewProposal = (proposal, semester) =>  !(
	proposal.timeRequests || [] ).some(t =>  t.semester < semester
);

/**
 * check if proposal is requesting anytime from any semester other than selected semester
 * and if so it is a long term proposal
 * hence return false
 *
 * @param proposal A proposal from API
 * @param semester
 * @return Boolean (true) if the proposal is new
 * */
export const isLongTermProposal = (proposal, semester) =>  (
	proposal.timeRequests || [] ).some(t => t.semester !== semester
);

/**
 * method used fro sorting proposals by proposal code
 * */

export const compareByProposalCode = (a, b) => {
  const name1 = a.proposalCode.toUpperCase();
  const name2 = b.proposalCode.toUpperCase();
  if (name1 < name2) {
    return -1;
  }
  if (name1 > name2) {
    return 1;
  }
  return 0;
};