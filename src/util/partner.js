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
        return proposal.timeRequests.find((t) => t.semester === semester && t.partner.code === this.code) !== undefined;
    }

    /**
     * Does the given proposal have a non-zero tine request for this partner and the given semester?
     */
    hasNonZeroTimeRequestFor(proposal, semester) {
        return proposal.timeRequests.find((t) => t.semester === semester && t.partner.code === this.code && t.requestedTime > 0) !== undefined;
    }

    /**
     * Time request from this partner for the given proposal and semester. Is undefined if there is no time request.
     */
    timeRequestsFor(proposal, semester) {
        return proposal.timeRequests.filter((t) => t.partner.code === this.code && t.semester === semester);
    }

    static partnerByCode(code) {
        return PARTNERS.find((partner) => partner.code === code);
    }
}

export class NoPartner extends Partner {
    constructor() {
        super('NONE', 'No Partner');
    }

    hasTimeRequestFor(proposal, semester) {
        return false;
    }

    timeRequestsFor(proposal, semester) {
        return [];
    }
}

export class AllPartners extends Partner {
    constructor() {
        super('ALL', 'All Partners');
    }

    hasTimeRequestFor(proposal, semester) {
        return proposal.timeRequests.find((t) => t.semester === semester) !== undefined;
    }

    hasNonZeroTimeRequestFor(proposal, semester) {
        return proposal.timeRequests.find((t) => t.semester === semester && t.requestedTime > 0) !== undefined;
    }

    timeRequestsFor(proposal, semester) {
        return proposal.timeRequests.filter((t) => t.semester === semester);
    }

}

export const PARTNERS = [
    new Partner('AMNH', 'American Museum of Natural History'),
    new Partner('RSA', 'South Africa'),
    new Partner('UW', 'University of Wisconsin'),
    new AllPartners()
];

export function partnerList(user) {
    if (!user.partner) {
        return PARTNERS;
    } else {
        return [user.partner];
    }
}

export function defaultPartner(user) {
    if (user.partner) {
        return user.partner;
    } else {
        return Partner.partnerByCode("ALL");
    }
}
