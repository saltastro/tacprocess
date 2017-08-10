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

function defaultAvailableTimes() {
    return {
        scienceTime: {
            'p0and1': 45.9,
            'p2': 123.7,
            'p3': 201.8
        },
        allocationTime: {
            'p0and1': 56.0,
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

