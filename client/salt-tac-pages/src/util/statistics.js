// Utility functions for statistics

/**
 * The list of non-zero requested hours for a partner.
 *
 * Parameters:
 *
 * proposals: array
 *     Proposals.
 * partner: Partner
 *     Partner
 */
export function requestedHours(proposals, partner) {
    const timeRequest = (proposal, partner) => proposal.timeRequests.find(t => t.partner.code === partner.code);

    return proposals
            .filter(proposal => partner.requestsTimeFor(proposal))
            .reduce(
                    (a, proposal) => {
                        const req = timeRequest(proposal, partner);
                        return req ? [...a, req.time] : a
                    },
                    []
            )
            .map(t => t / 3600);
}
