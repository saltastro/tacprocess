import {
    instrumentCount,
    observingTimeForSeeing,
    observingTimeForTransparency,
    proposalObservingTimeForInstrument
} from './index';

const proposals = [
    {
        transparency: 'Clear',
        maxSeeing: 2,
        timeRequests: [
            {
                semester: '2017-1',
                distribution: [
                    {
                        partnerCode: 'RSA',
                        time: 150
                    },
                    {
                        partnerCode: 'UW',
                        time: 200
                    },
                ]
            },
            {
                semester: '2017-2',
                distribution: [
                    {
                        partnerCode: 'RSA',
                        time: 400
                    },
                    {
                        partnerCode: 'UW',
                        time: 50
                    },
                ]
            }
        ]
    },
    {
        transparency: 'Thin cloud',
        maxSeeing: 2.4,
        timeRequests: [
            {
                semester: '2017-1',
                distribution: [
                    {
                        partnerCode: 'RSA',
                        time: 310
                    },
                    {
                        partnerCode: 'UW',
                        time: 40
                    },
                ]
            },
            {
                semester: '2017-2',
                distribution: [
                    {
                        partnerCode: 'RSA',
                        time: 550
                    },
                    {
                        partnerCode: 'UKSC',
                        time: 80
                    },
                ]
            }
        ]
    },
    {
        transparency: 'Clear',
        maxSeeing: 3,
        timeRequests: [
            {
                semester: '2017-1',
                distribution: [
                    {
                        partnerCode: 'IUCAA',
                        time: 70
                    },
                    {
                        partnerCode: 'RSA',
                        time: 120
                    },
                ]
            },
            {
                semester: '2017-2',
                distribution: [
                    {
                        partnerCode: 'IUCAA',
                        time: 700
                    },
                    {
                        partnerCode: 'UNC',
                        time: 450
                    },
                ]
            }
        ]
    }
];

describe('observing times for a transparency', () => {
    it('should be calculated for a single partner', () => {
        expect(observingTimeForTransparency(proposals, '2017-1', 'Clear', 'RSA')).toBeCloseTo(270);
        expect(observingTimeForTransparency(proposals, '2017-2', 'Clear', 'RSA')).toBeCloseTo(400);
        expect(observingTimeForTransparency(proposals, '2017-1', 'Thin cloud', 'RSA')).toBeCloseTo(310);
        expect(observingTimeForTransparency(proposals, '2017-1', 'Any', 'RSA')).toBeCloseTo(0);
    });

    it('should be calculated for all partners', () => {
        expect(observingTimeForTransparency(proposals, '2017-1', 'Clear')).toBeCloseTo(540);
        expect(observingTimeForTransparency(proposals, '2017-1', 'Thin cloud')).toBeCloseTo(350);
        expect(observingTimeForTransparency(proposals, '2017-1', 'Any')).toBeCloseTo(0);
    });
});

describe('observing times for a seeing', () => {
    it('should be calculated for a single partner', () => {
        expect(observingTimeForSeeing(proposals, '2017-1', [1, 2], 'RSA')).toBeCloseTo(0);
        expect(observingTimeForSeeing(proposals, '2017-1', [2, 3], 'RSA')).toBeCloseTo(460);
        expect(observingTimeForSeeing(proposals, '2017-2', [2, 3], 'RSA')).toBeCloseTo(950);
        expect(observingTimeForSeeing(proposals, '2017-2', [2.9, 3.1], 'RSA')).toBeCloseTo(0);
    });

    it('should be calculated for all partners', () => {
        expect(observingTimeForSeeing(proposals, '2017-1', [1, 2])).toBeCloseTo(0);
        expect(observingTimeForSeeing(proposals, '2017-1', [2, 3])).toBeCloseTo(700);
        expect(observingTimeForSeeing(proposals, '2017-2', [2, 3])).toBeCloseTo(1080);
        expect(observingTimeForSeeing(proposals, '2017-2', [2.9, 3.1])).toBeCloseTo(1150);

    })
});

describe('instrument counts', () => {
    it('should be calculated for no instruments', () => {
        const proposal = {
            instruments: {}
        };

        expect(instrumentCount(proposal)).toBe(0);
    });

    it('should be calculated for a single instrument', () => {
        const proposal = {
            instruments: {
                rss: [
                    {
                        detectorMode: 'Normal'
                    }
                ]
            }
        };

        expect(instrumentCount(proposal)).toBe(1);
    });

    it('should be calculated for multiple instruments', () => {
        const proposal = {
            instruments: {
                salticam: [{}],
                rss: [{}, {}, {}],
                hrs:[]
            }
        };

        expect(instrumentCount(proposal)).toBe(4);
    });
});

describe('proposal observing time for an instrument', () => {
    it('should be calculated for a wrong semester', () => {
        const proposal = {
            timeRequests: [
                {
                    semester: '2017-1',
                    totalTime: 1500,
                    distribution: [
                        {partnerCode: 'RSA', time: 1000},
                        {partnerCode: 'UW', time: 500}
                    ]
                }
            ],
            instruments: {
                rss: [
                    {mode: 'Polarimetry'}
                ]
            }
        };

        expect(proposalObservingTimeForInstrument(proposal,
                                                  '2017-2',
                                                  'RSS',
                                                  {field: 'mode', value: 'Polarimetry', partner: 'RSA'}))
                .toBeCloseTo(0);
    });

    describe('single instrument', () => {
        const proposal = {
            timeRequests: [
                {
                    semester: '2017-1',
                    totalTime: 1500,
                    distribution: [
                        {partnerCode: 'RSA', time: 1000},
                        {partnerCode: 'UW', time: 500}
                    ]
                },
                {
                    semester: '2017-2',
                    totalTime: 300,
                    distribution: [
                        {partnerCode: 'RSA', time: 180},
                        {partnerCode: 'UW', time: 120}
                    ]
                }

            ],
            instruments: {
                rss: [
                    {mode: 'Polarimetry'}
                ]
            }
        };

        it('should be calculated for a correct mode and a partner', () => {
            expect(proposalObservingTimeForInstrument(proposal,
                                                      '2017-1',
                                                      'RSS',
                                                      {field: 'mode', value: 'Polarimetry', partner: 'RSA'}))
                    .toBeCloseTo(1000);
        });

        it('should be calculated for an incorrect instrument', () => {
            expect(proposalObservingTimeForInstrument(proposal,
                                                      '2017-1',
                                                      'Salticam',
                                                      {field: 'mode', value: 'Polarimetry'}))
                    .toBeCloseTo(0);
        });

        it('should be calculated for an incorrect mode', () => {
            expect(proposalObservingTimeForInstrument(proposal,
                                                      '2017-1',
                                                      'RSS',
                                                      {field: 'mode', value: 'Imaging', partner: 'RSA'}))
                    .toBeCloseTo(0);
        });

        it('should be calculated for a correct mode and all partners', () => {
            expect(proposalObservingTimeForInstrument(proposal,
                                                      '2017-1',
                                                      'RSS',
                                                      {field: 'mode', value: 'Polarimetry'}))
                    .toBeCloseTo(1500);
        });
    });

    describe('multiple instruments', () => {
        const proposal = {
            timeRequests: [
                {
                    semester: '2017-1',
                    totalTime: 1500,
                    distribution: [
                        {partnerCode: 'RSA', time: 1000},
                        {partnerCode: 'UW', time: 500}
                    ]
                },
                {
                    semester: '2017-2',
                    totalTime: 300,
                    distribution: [
                        {partnerCode: 'RSA', time: 180},
                        {partnerCode: 'UW', time: 120}
                    ]
                }

            ],
            instruments: {
                rss: [
                    {detectorMode: 'Normal', mode: 'Polarimetry'},
                    {detectorMode: 'Slotmode', mode: 'Imaging'},
                    {detectorMode: 'Drift Scan', mode: 'Polarimetry'}
                ],
                salticam: [
                    {detectorMode: 'Normal'},
                    {detectorMode: 'Normal'}
                ],
                hrs: [
                    {resolution: 'High Stability'},
                ],
                bvit: [
                    {type: 'whatever'}
                ]
            }
        };

        it('should be calculated for a correct mode and partner', () => {
            expect(proposalObservingTimeForInstrument(proposal,
                                                      '2017-1',
                                                      'rss',
                                                      {field: 'mode', value: 'Polarimetry', partner: 'RSA'}))
                    .toBeCloseTo(2 * 1000 / 7);
        });

        it('should be calculated for an incorrect instrument', () => {
            expect(proposalObservingTimeForInstrument(proposal,
                                                      '2017-1',
                                                      'xyz',
                                                      {field: 'mode', value: 'Polarimetry', partner: 'RSA'}))
                    .toBeCloseTo(0);
        });

        it('should be calculated for an incorrect mode', () => {
            expect(proposalObservingTimeForInstrument(proposal,
                                                      '2017-1',
                                                      'rss',
                                                      {field: 'mode', value: 'Spectroscopy', partner: 'RSA'}))
                    .toBeCloseTo(0);
        });

        it('should be calculated for a correct mode and all partners', () => {
            expect(proposalObservingTimeForInstrument(proposal,
                                                      '2017-1',
                                                      'rss',
                                                      {field: 'mode', value: 'Polarimetry'}))
                    .toBeCloseTo(2 * 1500 / 7);
        });
    });
});
