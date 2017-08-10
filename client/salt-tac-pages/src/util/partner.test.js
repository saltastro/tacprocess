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
                        semester: '2017-1',
                        time: 3.7
                    },
                    {
                        partner: RSA,
                        semester: '2017-1',
                        time: 5
                    }
                ]
            },
            {
                timeRequests: [
                    {
                        partner: AMNH,
                        semester: '2017-1',
                        time: 54.57
                    },
                ]
            },
            {
                timeRequests: [
                    {
                        partner: RSA,
                        semester: '2017-1',
                        time: 17
                    }
                ]
            },
            {
                timeRequests: [
                    {
                        partner: RSA,
                        semester: '2017-1',
                        time: 0
                    }
                ]
            },
            {
                timeRequests: [
                    {
                        partner: RSA,
                        semester: '2017-2',
                        time: 97
                    }
                ]
            }

        ];

        expect(proposals.map(proposal => RSA.hasTimeRequestFor(proposal, '2017-1'))).toEqual([true, false, true, true, false]);
        expect(proposals.map(proposal => RSA.hasTimeRequestFor(proposal, '2017-2'))).toEqual([false, false, false, false, true]);
    });

    it('should return the correct partner for a partner code', () => {
        expect(Partner.partnerByCode('AMNH').name).toEqual('American Museum of Natural History');
        expect(Partner.partnerByCode('RSA').name).toEqual('South Africa');
    });

    it('should return undefined for an unknown partner code', () => {
        expect(Partner.partnerByCode('XF56T')).not.toBeDefined();
    });
});
