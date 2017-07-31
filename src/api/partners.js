const hasInvestigatorIn = proposal => proposal.timeRequests.find(t => t.code === this.code);

export const PARTNERS = [
    {
        code: 'AMNH',
        name: 'American Museum of Natural History',
        hasInvestigatorIn: hasInvestigatorIn
    },
    {
        code: 'RSA',
        name: 'South Africa',
        hasInvestigatorIn: hasInvestigatorIn
    },
    {
        code: 'UW',
        name: 'University of Wisconsin',
        hasInvestigatorIn: hasInvestigatorIn
    }
];

export const partnerByCode = code => PARTNERS.find(partner => partner.code === code);
