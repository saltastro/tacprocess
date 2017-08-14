import {
    HrsMode, Instrument, RssDetectorMode, RssObservingMode, SalticamDetectorMode,
    Transparency
} from '../enumerations';
import * as statistics from './statistics';
import Partner from './partner';

const AMNH = Partner.partnerByCode('AMNH');
const RSA = Partner.partnerByCode('RSA');
const UW = Partner.partnerByCode('UW');

function defaultProposals() {
    return [
        {
            proposalCode: '2017-1-MLT-001',
            semester: '2017-1',
            timeRequests: [
                { partner: AMNH, semester: '2017-1', time: 4.5 * 3600 },
                { partner: AMNH, semester: '2017-2', time: 7.9 * 3600 },
                { partner: RSA, semester: '2017-1', time: 10.9 * 3600 }
            ],
            isP4: false,
            thesisProjects: [],
            maxSeeing: 3.2,
            transparency: Transparency.CLEAR,
            instrumentConfigurations: [
                {
                    instrument: Instrument.RSS,
                    detectorMode: RssDetectorMode.NORMAL,
                    observingMode: RssObservingMode.FABRY_PEROT
                },
                {
                    instrument: Instrument.RSS,
                    detectorMode: RssDetectorMode.NORMAL,
                    observingMode: RssObservingMode.SPECTROSCOPY
                }
            ]
        },

        {
            proposalCode: '2017-2-SCI-001',
            semester: '2017-2',
            timeRequests: [
                { partner: RSA, semester: '2017-2', time: 32 * 3600 }
            ],
            isP4: false,
            thesisProjects: [
                {},
                {}
            ],
            maxSeeing: 2.1,
            transparency: Transparency.THICK_CLOUD,
            instrumentConfigurations: [
                {
                    instrument: Instrument.SALTICAM,
                    detectorMode: SalticamDetectorMode.DRIFT_SCAN
                },
                {
                    instrument: Instrument.HRS,
                    hrsMode: HrsMode.MEDIUM_RESOLUTION
                }
            ]
        },

        {
            proposalCode: '2017-2-MLT-001',
            semester: '2017-2',
            timeRequests: [
                { partner: AMNH, semester: '2017-2', time: 11.1 * 3600 },
                { partner: UW, semester: '2018-1', time: 14.7 * 3600 }
            ],
            isP4: false,
            thesisProjects: [
                {},
                {},
                {}
            ],
            maxSeeing: 2.3,
            transparency: Transparency.ANY,
            instrumentConfigurations: [
                {
                    instrument: Instrument.RSS,
                    detectorMode: RssDetectorMode.DRIFT_SCAN,
                    observingMode: RssObservingMode.FABRY_PEROT
                }
            ]
        },

        {
            proposalCode: '2017-2-MLT-002',
            semester: '2017-2',
            timeRequests: [
                { partner: RSA, semester: '2017-2', time: 78.1 * 3600 },
                { partner: RSA, semester: '2018-1', time: 68.4 * 3600 },
                { partner: RSA, semester: '2018-2', time: 54.4 * 3600 },
            ],
            isP4: true,
            thesisProjects: [],
            maxSeeing: 1.7,
            transparency: Transparency.CLEAR,
            instrumentConfigurations: [
                {
                    instrument: Instrument.RSS,
                    detectorMode: RssDetectorMode.NORMAL,
                    observingMode: RssObservingMode.IMAGING
                }
            ]
        }
    ];
}

function defaultTargets() {
    const sortedData = [ // name, declination, right ascension, sidereal?
            ['Target 1', -65.7, 98.6, true],
            ['Target 2', -54.2, 14.5, true],
            ['Target 3', -54.1, 36.3, true],
            ['Target 4', -54.0, 14.4, true],
            ['Target 5', -53.9, 14.3, true],
            ['Target 6', -40.1, 226.3, true],
            ['Target 7', -23.7, 175.7, true],
            ['Target 8', -23.5, 175.8, true],
            ['Target 9', -23.4, 174.7, true],
            ['Target 10', 2.7, 114.9, true],
            ['Target 11', 2.8, 114.1, true],
            ['Target 12', 5.8, 359.5, true],
            ['Target 13', 7.8, 359.5, true],
            ['Target 14', 7.9, 201.8, false],
            ['Target 15', 7.9, 201.8, false]
    ];

    const data = [sortedData[0], sortedData[3], sortedData[6], sortedData[9], sortedData[12],
        sortedData[1], sortedData[4], sortedData[7], sortedData[10], sortedData[13],
        sortedData[2], sortedData[5], sortedData[8], sortedData[11], sortedData[14]];

    return data.map(d => (
            {
                name: d[0],
                ra: d[2],
                dec: d[1],
                isSidereal: d[3]
            }
                    )
    );
}

function defaultAvailableTimes() {
    return {
        scienceTime: {
            'p0AndP1': 45.9,
            'p2': 123.7,
            'p3': 201.8
        },
        allocationTime: {
            'p0AndP1': 56.0,
            'p2': 187.8,
            'p3': 194.5
        }
    };
}

describe('compareSemesters', () => {
    it('should compare two semesters', () => {
        expect(statistics.compareSemesters('2016-1', '2017-1')).toBe(-1);
        expect(statistics.compareSemesters('2016-2', '2017-1')).toBe(-1);
        expect(statistics.compareSemesters('2017-1', '2017-1')).toBe(0);
        expect(statistics.compareSemesters('2017-2', '2017-1')).toBe(1);
        expect(statistics.compareSemesters('2018-1', '2017-1')).toBe(1);
        expect(statistics.compareSemesters('2018-2', '2017-1')).toBe(1);

        expect(statistics.compareSemesters('2016-1', '2017-2')).toBe(-1);
        expect(statistics.compareSemesters('2016-2', '2017-2')).toBe(-1);
        expect(statistics.compareSemesters('2017-1', '2017-2')).toBe(-1);
        expect(statistics.compareSemesters('2017-2', '2017-2')).toBe(0);
        expect(statistics.compareSemesters('2018-1', '2017-1')).toBe(1);
        expect(statistics.compareSemesters('2018-2', '2017-1')).toBe(1);
    })
});

describe('proposalsCount', () => {
   it('should calculate the number of proposals', () => {
       expect(statistics.proposalsCount(defaultProposals())).toBe(4);
   });
});

describe('newProposalsCount', () => {
    it('should calculate the number of new proposals', () => {
        expect(statistics.newProposalsCount(defaultProposals(), '2017-1')).toBe(1);
        expect(statistics.newProposalsCount(defaultProposals(), '2017-2')).toBe(3);
    });
});

describe('resubmittedProposalsCount', () => {
    it('should calculate the number of resubmitted proposals', () => {
        expect(statistics.resubmittedProposalsCount(defaultProposals(), '2017-2')).toBe(1);
    });
});

describe('longtermProposalsCount', () => {
    it('should calculate the number of longterm proposals', () => {
        expect(statistics.longtermProposalsCount(defaultProposals())).toBe(3);
    });
});

describe('newLongtermProposalsCount', () => {
    it('should calculate the number of new longterm proposals', () => {
        expect(statistics.newLongtermProposalsCount(defaultProposals(), '2017-2')).toBe(2);
    });
});

describe('availableScienceTime', () => {
    it('should calculate the available science time', () => {
        expect(statistics.availableScienceTime(defaultAvailableTimes())).toBe(45.9 + 123.7 + 201.8);
    });
});

describe('availableAllocationTime', () => {
    it('should calculate the available allocation time', () => {
        expect(statistics.availableAllocationTime(defaultAvailableTimes())).toBe(56.0 + 187.8 + 194.5);
    });
});

describe('requestedTimes', () => {
    it('should give the list of requested times', () => {
        expect(statistics.requestedTimes(defaultProposals(), RSA, '2017-2')).toEqual([32]);
    });

    it('should include time requests for zero time', () => {
        const proposals = [
            {
                timeRequests: [
                    { partner: AMNH, semester: '2017-2', time: 56 * 3600 },
                ],
                isP4: false
            },
            {
                timeRequests: [
                    { partner: AMNH, semester: '2017-2', time: 0 },
                ],
                isP4: false
            },
            {
                timeRequests: [
                    { partner: AMNH, semester: '2017-2', time: 36 * 3600 },
                ],
                isP4: false
            }
        ];

        expect(statistics.requestedTimes(proposals, AMNH, '2017-2')).toEqual([56, 0, 36]);
    });
});

describe('totalRequestedTime', () => {
    it('should calculate the total requested time', () => {
        expect(statistics.totalRequestedTime(defaultProposals(), RSA, '2017-2')).toBe(32);
    });
});

describe('oversubscriptionRate', () => {
    it('should calculate the oversubscription rate', () => {
        expect(statistics.oversubscriptionRate(defaultProposals(), RSA, '2017-2', defaultAvailableTimes()))
                .toBe((32) / (45.9 + 123.7 + 201.8));
    });
});

describe('averageRequestedTime', () => {
    it('should calculate the average requested time', () => {
        expect(statistics.averageRequestedTime(defaultProposals(), RSA, '2017-2'), defaultAvailableTimes())
                .toBe((32) / 4);
    });
});

describe('thesisProjectCount', () => {
    it('should give the number of thesis projects associated with the proposals', () => {
        expect(statistics.thesisProjectsCount(defaultProposals())).toBe(5);
    });
});

describe('p4ProposalsCount', () => {
    it('should give the number of P4 proposals', () => {
        expect(statistics.p4ProposalsCount(defaultProposals())).toBe(1);
    });
});

describe('proposalsForSeeing', () => {
    it('should give the list of proposals for a seeing', () => {
        const proposalCodesForSeeing = seeing =>
                statistics.proposalsForSeeing(defaultProposals(), seeing).map(proposal => proposal.proposalCode);

        expect(proposalCodesForSeeing(6))
                .toEqual([]);
        expect(proposalCodesForSeeing(3.2))
                .toEqual(['2017-1-MLT-001']);
        expect(proposalCodesForSeeing(3.1))
                .toEqual(['2017-1-MLT-001']);
        expect(proposalCodesForSeeing(2.3))
                .toEqual(['2017-1-MLT-001', '2017-2-MLT-001']);
        expect(proposalCodesForSeeing(2.11))
                .toEqual(['2017-1-MLT-001', '2017-2-MLT-001']);
        expect(proposalCodesForSeeing(2.1))
                .toEqual(['2017-1-MLT-001', '2017-2-SCI-001', '2017-2-MLT-001']);
        expect(proposalCodesForSeeing(1.8))
                .toEqual(['2017-1-MLT-001', '2017-2-SCI-001', '2017-2-MLT-001']);
        expect(proposalCodesForSeeing(1.7))
                .toEqual(['2017-1-MLT-001', '2017-2-SCI-001', '2017-2-MLT-001', '2017-2-MLT-002']);
    });
});

describe('proposalsForTransparency', () => {
    it('should give the list of proposals for a transparency', () => {
        const proposalCodesForTransparency = transparency =>
                statistics.proposalsForTransparency(defaultProposals(), transparency)
                        . map(proposal => proposal.proposalCode);

        expect(proposalCodesForTransparency(Transparency.THICK_CLOUD))
                .toEqual(['2017-2-SCI-001']);

        expect(proposalCodesForTransparency(Transparency.CLEAR))
                .toEqual(['2017-1-MLT-001', '2017-2-MLT-002']);

        expect(proposalCodesForTransparency(Transparency.THIN_CLOUD))
                .toEqual([]);
    });
});

describe('proposalsWithInstrumentConfig', () => {
    it('should give the list of proposals with an instrument configuration', () => {
        const proposalCodesWithInstrumentConfig = instrumentConfiguration =>
                statistics.proposalsWithInstrumentConfig(defaultProposals(), instrumentConfiguration)
                        .map(proposal => proposal.proposalCode);

        expect(proposalCodesWithInstrumentConfig(
                {
                    instrument: Instrument.SALTICAM,
                    detectorMode: SalticamDetectorMode.DRIFT_SCAN
                }
        )).toEqual(['2017-2-SCI-001']);

        expect(proposalCodesWithInstrumentConfig(
                {
                    instrument: Instrument.SALTICAM,
                    detectorMode: SalticamDetectorMode.NORMAL
                }
        )).toEqual([]);

        expect(proposalCodesWithInstrumentConfig(
                {
                    instrument: Instrument.RSS,
                    detectorMode: RssDetectorMode.NORMAL
                }
        )).toEqual(['2017-1-MLT-001', '2017-2-MLT-002']);

        expect(proposalCodesWithInstrumentConfig(
                {
                    instrument: Instrument.RSS,
                    detectorMode: RssDetectorMode.DRIFT_SCAN
                }
        )).toEqual(['2017-2-MLT-001']);

        expect(proposalCodesWithInstrumentConfig(
                {
                    instrument: Instrument.RSS,
                    observingMode: RssObservingMode.FABRY_PEROT
                }
        )).toEqual(['2017-1-MLT-001', '2017-2-MLT-001']);

        expect(proposalCodesWithInstrumentConfig(
                {
                    instrument: Instrument.RSS,
                    observingMode: RssObservingMode.SPECTROSCOPY
                }
        )).toEqual(['2017-1-MLT-001']);

        expect(proposalCodesWithInstrumentConfig(
                {
                    instrument: Instrument.RSS,
                    detectorMode: RssDetectorMode.NORMAL,
                    observingMode: RssObservingMode.FABRY_PEROT
                }
        )).toEqual(['2017-1-MLT-001']);
    });
});

describe('sameTargets', () => {
    it('should return the pairs of same targets', () => {
        const areSameTarget = (target1, target2) =>
                Math.abs(target2.ra - target1.ra) < 1 && Math.abs(target2.dec - target1.dec) < 1;

        const sameTargetsNames = statistics.sameTargets(defaultTargets(), areSameTarget, 1)
                .map(pair => [pair[0].name, pair[1].name]);
        const actualPairs = new Set(sameTargetsNames);
        const expectedPairs = new Set(
                [[2, 4], [4,2], [2, 5], [5, 2], [4, 5], [5, 4], [7, 8], [8, 7], [10, 11], [11, 10]]
                        .map(pair => [`Target ${pair[0]}`, `Target ${pair[1]}`])
        );

        expect(actualPairs).toEqual(expectedPairs);
    });
});

describe('areSameTarget', () => {
    it('should check whether two targets are the same', () => {
        const target = (ra, dec) => ({ra, dec});

        const r = 0.0005;

        // take cosine of declination into account (cos(60 deg) = 0.5)
        expect(statistics.areSameTarget(target(130, 60), target(130 - 2 * 0.99 * r, 60), r))
                .toBe(true);
        expect(statistics.areSameTarget(target(130, 60), target(130 + 2 * 0.99 * r, 60), r))
                .toBe(true);
        expect(statistics.areSameTarget(target(130, 60), target(130 - 2 * 1.01 * r, 60), r))
                .toBe(false);
        expect(statistics.areSameTarget(target(130, 60), target(130 + 2 * 1.01 * r, 60), r))
                .toBe(false);

        expect(statistics.areSameTarget(target(130, 60), target(130, 60 - 0.99 * r), r))
                .toBe(true);
        expect(statistics.areSameTarget(target(130, 60), target(130, 60 + 0.992 * r), r))
                .toBe(true);
        expect(statistics.areSameTarget(target(130, 60), target(130, 60 - 1.01 * r), r))
                .toBe(false);
        expect(statistics.areSameTarget(target(130, 60), target(130, 60 + 1.01 * r), r))
                .toBe(false);

        // take cosine of declination into account (cos(60 deg) = 0.5)
        expect(statistics.areSameTarget(target(130, 60),
                                        target(130 - 2 * 0.99 * r / Math.sqrt(2), 60 + 0.99 * r / Math.sqrt(2)),
                                        r))
                .toBe(true);
        expect(statistics.areSameTarget(target(130, 60),
                                        target(130 + 2 * 0.99 * r / Math.sqrt(2), 60 - 0.99 * r / Math.sqrt(2)),
                                        r))
                .toBe(true);
        expect(statistics.areSameTarget(target(130, 60),
                                        target(130 - 2 * 1.01 * r / Math.sqrt(2), 60 + 1.01 * r / Math.sqrt(2)),
                                        r))
                .toBe(false);
        expect(statistics.areSameTarget(target(130, 60),
                                        target(130 + 2 * 1.01 * r / Math.sqrt(2), 60 - 1.01 * r / Math.sqrt(2)),
                                        r))
                .toBe(false);

        // take into account that for the right ascension 0 deg = 360 deg
        // take cosine of declination into account (cos(60 deg) = 0.5)
        const epsilon = r / 2;
        expect(statistics.areSameTarget(target(0.99 * r / Math.sqrt(2), 60),
                                        target(360 - 0.99 * r / Math.sqrt(2), 60 + 0.99 * r / Math.sqrt(2)),
                                        r))
                .toBe(true);
        expect(statistics.areSameTarget(target(1.01 * r / Math.sqrt(2), 60),
                                        target(360 - 1.01 * r / Math.sqrt(2), 60 + 1.01 * r / Math.sqrt(2)),
                                        r))
                .toBe(false);
    });
});
