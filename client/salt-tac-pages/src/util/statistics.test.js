import * as statistics from './statistics';
import Partner from './partner';

const AMNH = Partner.partnerByCode('AMNH');
const RSA = Partner.partnerByCode('RSA');
const UW = Partner.partnerByCode('UW');

function defaultProposals() {
    const timeRequests = {
        AMNH: [12.6, 22.0, 1.9, 25., 58.9, 31, 29.5, 7.8],
        RSA: [0, 0, 0, 78., 0, 99., 0, 0]
    };

    const proposals = timeRequests.AMNH.map((_, i) => (
            {
                timeRequests: [
                    {
                        partner: AMNH,
                        time: 3600 * timeRequests.AMNH[i]
                    },
                    {
                        partner: RSA,
                        time: 3600 * timeRequests.RSA[i]
                    }
                ]
            }
    ));
    proposals[2].timeRequests.push({
                                       partner: UW,
                                       time: 23.9 * 3600
                                   });
    return proposals;
}

describe('requestedHours', () => {
    it('should return the list of requested hours', () => {
        const proposals = defaultProposals();

        expect(statistics.requestedHours(proposals, AMNH))
                .toEqual([12.6, 22.0, 1.9, 25., 58.9, 31, 29.5, 7.8]);

        expect(statistics.requestedHours(proposals, RSA))
                .toEqual([78., 99.]);

        expect(statistics.requestedHours(proposals, UW))
                .toEqual([23.9]);
    });
});
