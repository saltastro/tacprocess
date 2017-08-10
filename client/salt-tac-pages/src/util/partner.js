export default class Partner {
    constructor(code, name) {
        this.code = code;
        this.name = name;
    }

    /**
     * Does the given proposal have a time request for this partner and the given semester? The time request may be
     * for 0 seconds.
     */
    hasTimeRequestFor(proposal, semester) {
        return proposal.timeRequests.find(t => t.semester === semester && t.partner.code === this.code) !== undefined;
    }

    static partnerByCode(code) {
        return PARTNERS.find(partner => partner.code === code);
    }
}

export const PARTNERS = [
    new Partner('AMNH', 'American Museum of Natural History'),
    new Partner('RSA', 'South Africa'),
    new Partner('UW', 'University of Wisconsin')
];
