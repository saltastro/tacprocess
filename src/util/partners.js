export default class Partner {
    constructor(code, name) {
        this.code = code;
        this.name = name;
    }

    requestsTimeFor(proposal) {
        return proposal.timeRequests.find(t => t.partner.code === this.code && t.time > 0) !== undefined;
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
