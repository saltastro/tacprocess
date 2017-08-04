import Partner from './partner';

const AMNH = Partner.partnerByCode('AMNH');
const RSA = Partner.partnerByCode('RSA');

describe('partnerByCode', () => {
    it('should return proposals requesting time from a partner', () => {
        const proposals = [
            {
                timeRequests: [
                    {
                        partner: AMNH,
                        time: 3.7
                    },
                    {
                        partner: RSA,
                        time: 5
                    }
                ]
            },
            {
                timeRequests: [
                    {
                        partner: AMNH,
                        time: 54.57
                    },
                ]
            },
            {
                timeRequests: [
                    {
                        partner: RSA,
                        time: 17
                    }
                ]
            },
            {
                timeRequests: [
                    {
                        partner: RSA,
                        time: 0
                    }
                ]
            }
        ];

        expect(proposals.map(proposal => RSA.requestsTimeFor(proposal))).toEqual([true, false, true, false]);
    });

    it('should return the correct partner for a partner code', () => {
        expect(Partner.partnerByCode('AMNH').name).toEqual('American Museum of Natural History');
        expect(Partner.partnerByCode('RSA').name).toEqual('South Africa');
    });

    it('should return undefined for an unknown partner code', () => {
        expect(Partner.partnerByCode('XF56T')).not.toBeDefined();
    });
});
