import MockDate from 'mockdate'
import {
	instrumentCount,
	observingTimeForSeeing,
	observingTimeForTransparency,
	proposalObservingTime,
	proposalObservingTimeForInstrument,
	partners,
	hasRole,
	canDo,
	isFloat,
	canUserWriteAllocations,
	canUserWriteTechReviews,
	canSubmitTimeAllocations,
	allocatedTimeTotals,
	currentSemester,
	defaultSemester
} from '../../util/index';

import * as types from '../../types';

const defaultProposals = () => [
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

describe('observing time in a proposal', () => {
    const proposal = {
        timeRequests: [
            {
                semester: '2017-1',
                totalTime: 2300,
                distribution: [
                    {partnerCode: 'RSA', time: 800},
                    {partnerCode: 'IUCAA', time: 1100},
                    {partnerCode: 'UNC', time: 400}
                ]
            },
            {
                semester: '2017-2',
                totalTime: 1000,
                distribution: [
                    {partnerCode: 'RSA', time: 600},
                    {partnerCode: 'IUCAA', time: 300},
                    {partnerCode: 'UNC', time: 100}
                ]
            }
        ]
    };

    it('should be calculated for a wrong semester', () => {
        expect(proposalObservingTime(proposal, '2018-1')).toBeCloseTo(0);
    });

    it('should be calculated for a correct semester and a partner', () => {
        expect(proposalObservingTime(proposal, '2017-2', 'IUCAA')).toBeCloseTo(300);
    });

    it('should be calculated for a correct semester and all partners', () => {
        expect(proposalObservingTime(proposal, '2017-1', 'All')).toBeCloseTo(2300);
        expect(proposalObservingTime(proposal, '2017-1')).toBeCloseTo(2300);
    });
});

describe('observing time for a transparency', () => {
    const proposals = defaultProposals()
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
        expect(observingTimeForTransparency(proposals, '2017-1', 'Clear', 'All')).toBeCloseTo(540);
        expect(observingTimeForTransparency(proposals, '2017-1', 'Thin cloud', 'All')).toBeCloseTo(350);
        expect(observingTimeForTransparency(proposals, '2017-1', 'Any', 'All')).toBeCloseTo(0);
    });
});

describe('observing time for a seeing', () => {
	const proposals = defaultProposals()
    it('should be calculated for a single partner', () => {
        expect(observingTimeForSeeing(proposals, '2017-1', [1, 2], 'RSA')).toBeCloseTo(0);
        expect(observingTimeForSeeing(proposals, '2017-1', [2, 3], 'RSA')).toBeCloseTo(460);
        expect(observingTimeForSeeing(proposals, '2017-2', [2, 3], 'RSA')).toBeCloseTo(950);
        expect(observingTimeForSeeing(proposals, '2017-2', [2.9, 3.1], 'RSA')).toBeCloseTo(0);
    });

    it('should be calculated for all partners', () => {
        expect(observingTimeForSeeing(proposals, '2017-1', [1, 2], 'All')).toBeCloseTo(0);
        expect(observingTimeForSeeing(proposals, '2017-1', [2, 3], 'All')).toBeCloseTo(700);
        expect(observingTimeForSeeing(proposals, '2017-2', [2, 3], 'All')).toBeCloseTo(1080);
        expect(observingTimeForSeeing(proposals, '2017-2', [2.9, 3.1], 'All')).toBeCloseTo(1150);
        expect(observingTimeForSeeing(proposals, '2017-1', [1, 2])).toBeCloseTo(0);
        expect(observingTimeForSeeing(proposals, '2017-1', [2, 3])).toBeCloseTo(700);
        expect(observingTimeForSeeing(proposals, '2017-2', [2, 3])).toBeCloseTo(1080);
        expect(observingTimeForSeeing(proposals, '2017-2', [2.9, 3.1])).toBeCloseTo(1150);

    })
});

describe('instrument count', () => {
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

    describe('for a single instrument', () => {
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

        it('should be calculated without a mode', () => {
            expect(proposalObservingTimeForInstrument(proposal,
                                                      '2017-1',
                                                      'RSS',
                                                      {partner: 'RSA'}))
                    .toBeCloseTo(1000);
        });

        it('should be calculated for a correct mode and all partners', () => {
            expect(proposalObservingTimeForInstrument(proposal,
                                                      '2017-1',
                                                      'RSS',
                                                      {field: 'mode', value: 'Polarimetry', partner: 'All'}))
                    .toBeCloseTo(1500);
            expect(proposalObservingTimeForInstrument(proposal,
                                                      '2017-1',
                                                      'RSS',
                                                      {field: 'mode', value: 'Polarimetry'}))
                    .toBeCloseTo(1500);
        });
    });

    describe('for multiple instruments', () => {
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
                                                      'RSS',
                                                      {field: 'mode', value: 'Polarimetry', partner: 'RSA'}))
                    .toBeCloseTo(2 * 1000 / 7);
        });

        it('should be calculated for an incorrect instrument', () => {
            expect(proposalObservingTimeForInstrument(proposal,
                                                      '2017-1',
                                                      'XYZ',
                                                      {field: 'mode', value: 'Polarimetry', partner: 'RSA'}))
                    .toBeCloseTo(0);
        });

        it('should be calculated for an incorrect mode', () => {
            expect(proposalObservingTimeForInstrument(proposal,
                                                      '2017-1',
                                                      'RSS',
                                                      {field: 'mode', value: 'Spectroscopy', partner: 'RSA'}))
                    .toBeCloseTo(0);
        });

        it('should be calculated without a mode', () => {
            expect(proposalObservingTimeForInstrument(proposal,
                                                      '2017-1',
                                                      'RSS',
                                                      {partner: 'RSA'}))
                    .toBeCloseTo(3 * 1000 / 7);
        });

        it('should be calculated for a correct mode and all partners', () => {
            expect(proposalObservingTimeForInstrument(proposal,
                                                      '2017-1',
                                                      'RSS',
                                                      {field: 'mode', value: 'Polarimetry'}))
                    .toBeCloseTo(2 * 1500 / 7);
            expect(proposalObservingTimeForInstrument(proposal,
                                                      '2017-1',
                                                      'RSS',
                                                      {field: 'mode', value: 'Polarimetry', partner: 'All'}))
                    .toBeCloseTo(2 * 1500 / 7);
        });
    });
});

describe('partners for a user', () => {
    it('should be calculated for a user without roles', () => {
        const user = {};

        expect(partners(user)).toEqual([]);

    });

    it('should be calculated for a user with a role without partners', () => {
        const user = {
            roles: [
                {}
            ]
        };

        expect(partners(user)).toEqual([]);
    });

    it('should be calculated for a user with roles', () => {
        const user = {
            roles: [
                {
                    partners: ['IUCAA', 'RSA']
                },
                {
                    partners: [],
                    type: 'ABC'
                },
                {
                    partners: ['AMNH']
                },
                {
                    partners: ['RSA', 'UKSC', 'DC']
                }
            ]
        };

        expect(partners(user)).toEqual(['AMNH', 'DC', 'IUCAA', 'RSA', 'UKSC']);
    });

    it('should include the partner "All" if the user is administrator', () => {
        const user = {
            roles: [
                {
                    type: types.TAC_MEMBER,
                    partners: ['DC']
                },
                {
                    type: types.ADMINISTRATOR,
                    partners: ['RSA', 'UKSC', 'DC']
                }
            ]
        };

        expect(partners(user)).toEqual([types.ALL_PARTNER, 'DC', 'RSA', 'UKSC']);
    });

    it('should include the partner "All" if the user is SALT Astronomer', () => {
        const user = {
            roles: [
                {
                    type: types.TAC_MEMBER,
                    partners: ['DC']
                },
                {
                    type: types.SALT_ASTRONOMER,
                    partners: ['RSA', 'UKSC', 'DC']
                }
            ]
        };

        expect(partners(user)).toEqual([types.ALL_PARTNER, 'DC', 'RSA', 'UKSC']);
    });
});

describe('hasRole', () => {
    it('should return false for a user with no roles', () => {
        const user = {roles:[]};

        expect(hasRole(user, types.TAC_CHAIR, 'UKSC')).toBe(false);
    });

    it('should return false if the user does not have the role', () => {
        const user = {
            roles: [
                {
                    type: types.TAC_CHAIR,
                    partners: ['AMNH', 'RSA']
                },
                {
                    type: types.SALT_ASTRONOMER,
                    partners: ['UKSC']
                }
            ]
        };

        expect(hasRole(user, types.TAC_MEMBER, 'RSA')).toBe(false);
    });

    it('should return false if the user has the role for another partner', () => {
        const user = {
            roles: [
                {
	                type: types.TAC_MEMBER,
                    partners: ['UKSC', 'RSA']
                }
            ]
        };

        expect(hasRole(user, types.TAC_MEMBER, 'AMNH')).toBe(false);
    });

    it('should return true if the user has the role', () => {
        const user = {
            roles: [
                {
	                type: types.TAC_CHAIR,
                    partners: ['DC']
                }
            ]
        };

        expect(hasRole(user, types.TAC_CHAIR, 'DC')).toBe(true);
    });

    it('should return true irrespective of the partner if the user is a SALT Astronomer', () => {
        const user = {
            roles: [
                {
	                type: types.SALT_ASTRONOMER,
                    partners: ['DC']
                }
            ]
        };

        expect(hasRole(user, types.SALT_ASTRONOMER, 'RSA')).toBe(true);
        expect(hasRole(user, types.SALT_ASTRONOMER)).toBe(true);
    });

    it('should return true irrespective of the partner if the user is an administrator', () => {
        const user = {
            roles: [
                {
	                type: types.ADMINISTRATOR,
                    partners: ['DC']
                }
            ]
        };

        expect(hasRole(user, types.ADMINISTRATOR, 'RSA')).toBe(true);
        expect(hasRole(user, types.ADMINISTRATOR)).toBe(true);
    })
});

describe('canDo', () => {
    it('should work', () => {
        const user = {
            roles: [
                {
                    type: types.TAC_MEMBER,
                    partners: ['RSA']
                }
            ]
        };

        expect(canDo(user, types.VIEW_TIME_ALLOCATION_PAGE, 'RSA')).toBe(true);
        expect(canDo(user, types.VIEW_TIME_ALLOCATION_PAGE, 'UKSC')).toBe(false);
    })
});

describe('isFloat', () =>  {
	it('should return true if value can be a float', () => {
        expect(isFloat()).toBe(false);
        expect(isFloat("23")).toBe(true);
        expect(isFloat("23.1")).toBe(true);
        expect(isFloat("23.2.3.2")).toBe(false);
        expect(isFloat(63)).toBe(true);
        expect(isFloat(63.2)).toBe(true);
        expect(isFloat({name: 36.3})).toBe(false);
        expect(isFloat([2333.3])).toBe(false);
        expect(isFloat([23.3, 6, 3.1])).toBe(false);
        expect(isFloat({})).toBe(false);
        expect(isFloat([])).toBe(false);
        expect(isFloat("")).toBe(false);
        expect(isFloat(63+9.0)).toBe(true);
	});
});

describe('canUserWriteAllocations', () => {
	it('should be false for any unknown role', () => {
        const roles = [
	        {
		        type: "UNKNOWN",
		        partners: ["ABC"]
	        }
        ];
		expect(canUserWriteAllocations(roles)).toBe(false);
		expect(canUserWriteAllocations(roles, undefined)).toBe(false);
		expect(canUserWriteAllocations(roles, null)).toBe(false);
		expect(canUserWriteAllocations(roles,"RSA")).toBe(false);
		expect(canUserWriteAllocations()).toBe(false);
		expect(canUserWriteAllocations(roles, "ABC")).toBe(false);
	});
	it('should be true when ever the user is an administrator', () => {
        const roles = [
                {
                    type: types.ADMINISTRATOR,
                    partners: []
                }
            ];
        expect(canUserWriteAllocations(roles, "RSA")).toBe(true);
        expect(canUserWriteAllocations(roles)).toBe(true);
        expect(canUserWriteAllocations(roles, undefined)).toBe(true);
        expect(canUserWriteAllocations(roles, null)).toBe(true);
        expect(canUserWriteAllocations(roles, "ABC")).toBe(true);
	});
	it('should be true only when the user is a tac chair for a partner', () => {
		const roles = [
			{
				type: types.TAC_CHAIR,
				partners: ["ABC"]
			}
		];
		expect(canUserWriteAllocations(roles)).toBe(false);
		expect(canUserWriteAllocations(roles, undefined)).toBe(false);
		expect(canUserWriteAllocations(roles, null)).toBe(false);
		expect(canUserWriteAllocations(roles,"RSA")).toBe(false);
		expect(canUserWriteAllocations(roles, "ABC")).toBe(true);
	});
	it('should be false for any other role or no arguments', () => {
        const roles = [
	        {
		        type: types.TAC_MEMBER,
		        partners: ["ABC"]
	        },
	        {
		        type: types.SALT_ASTRONOMER,
		        partners: ["ABC"]
	        },
        ];
		expect(canUserWriteAllocations(roles)).toBe(false);
		expect(canUserWriteAllocations(roles, undefined)).toBe(false);
		expect(canUserWriteAllocations(roles, null)).toBe(false);
		expect(canUserWriteAllocations(roles,"RSA")).toBe(false);
		expect(canUserWriteAllocations(roles, "ABC")).toBe(false);
	});
	it('should be true if one of the roles match', () => {
		const roles1 = [
			{
				type: types.TAC_MEMBER,
				partners: ["ABC"]
			},
			{
				type: types.SALT_ASTRONOMER,
				partners: ["ABC"]
			},
			{
				type: types.TAC_CHAIR,
				partners: ["ABC"]
			},
		];
		const roles2 = [
			{
				type: types.TAC_MEMBER,
				partners: ["ABC"]
			},
			{
				type: types.SALT_ASTRONOMER,
				partners: ["ABC"]
			},
			{
				type: types.ADMINISTRATOR,
				partners: ["ABC"]
			},
		];
		expect(canUserWriteAllocations(roles1)).toBe(false);
		expect(canUserWriteAllocations(roles1, undefined)).toBe(false);
		expect(canUserWriteAllocations(roles1, null)).toBe(false);
		expect(canUserWriteAllocations(roles1,"RSA")).toBe(false);
		expect(canUserWriteAllocations(roles1, "ABC")).toBe(true);
		
		expect(canUserWriteAllocations(roles2)).toBe(true);
		expect(canUserWriteAllocations(roles2, undefined)).toBe(true);
		expect(canUserWriteAllocations(roles2, null)).toBe(true);
		expect(canUserWriteAllocations(roles2,"RSA")).toBe(true);
		expect(canUserWriteAllocations(roles2, "ABC")).toBe(true);
	});
});


describe('canUserWriteTechReviews', () => {
	it('should be false for any unknown role', () => {
		const roles = [
			{
				type: "UNKNOWN",
				partners: ["ABC"]
			}
		];
		expect(canUserWriteTechReviews(roles)).toBe(false);
		expect(canUserWriteTechReviews(roles, undefined)).toBe(false);
		expect(canUserWriteTechReviews(roles, null)).toBe(false);
		expect(canUserWriteTechReviews(roles,"RSA")).toBe(false);
		expect(canUserWriteTechReviews()).toBe(false);
		expect(canUserWriteTechReviews(roles, "ABC")).toBe(false);
	});
	it('should be true when ever the user is an administrator', () => {
		const roles = [
			{
				type: types.ADMINISTRATOR,
				partners: []
			}
		];
		expect(canUserWriteTechReviews(roles, "RSA")).toBe(true);
		expect(canUserWriteTechReviews(roles)).toBe(true);
		expect(canUserWriteTechReviews(roles, undefined)).toBe(true);
		expect(canUserWriteTechReviews(roles, null)).toBe(true);
		expect(canUserWriteTechReviews(roles, "ABC")).toBe(true);
	});
	it('should be true only when the user is a SALT astronomer', () => {
		const roles = [
			{
				type: types.SALT_ASTRONOMER,
				partners: ["ABC"]
			}
		];
		expect(canUserWriteTechReviews(roles)).toBe(true);
		expect(canUserWriteTechReviews(roles, undefined)).toBe(true);
		expect(canUserWriteTechReviews(roles, null)).toBe(true);
		expect(canUserWriteTechReviews(roles,"RSA")).toBe(true);
		expect(canUserWriteTechReviews(roles, "ABC")).toBe(true);
	});
	it('should be false for any other role', () => {
		const roles = [
			{
				type: types.TAC_MEMBER,
				partners: ["ABC"]
			},
			{
				type: types.TAC_CHAIR,
				partners: ["ABC"]
			},
		];
		expect(canUserWriteTechReviews(roles)).toBe(false);
		expect(canUserWriteTechReviews(roles, undefined)).toBe(false);
		expect(canUserWriteTechReviews(roles, null)).toBe(false);
		expect(canUserWriteTechReviews(roles,"RSA")).toBe(false);
		expect(canUserWriteTechReviews(roles, "ABC")).toBe(false);
	});
	it('should be true if one of the roles match', () => {
		const roles1 = [
			{
				type: types.TAC_MEMBER,
				partners: ["ABC"]
			},
			{
				type: types.SALT_ASTRONOMER,
				partners: ["ABC"]
			},
			{
				type: types.TAC_CHAIR,
				partners: ["ABC"]
			},
		];
		const roles2 = [
			{
				type: types.TAC_MEMBER,
				partners: ["ABC"]
			},
			{
				type: types.TAC_CHAIR,
				partners: ["ABC"]
			},
			{
				type: types.ADMINISTRATOR,
				partners: ["ABC"]
			},
		];
		expect(canUserWriteTechReviews(roles1)).toBe(true);
		expect(canUserWriteTechReviews(roles1, undefined)).toBe(true);
		expect(canUserWriteTechReviews(roles1, null)).toBe(true);
		expect(canUserWriteTechReviews(roles1,"RSA")).toBe(true);
		expect(canUserWriteTechReviews(roles1, "ABC")).toBe(true);
		
		expect(canUserWriteTechReviews(roles2)).toBe(true);
		expect(canUserWriteTechReviews(roles2, undefined)).toBe(true);
		expect(canUserWriteTechReviews(roles2, null)).toBe(true);
		expect(canUserWriteTechReviews(roles2,"RSA")).toBe(true);
		expect(canUserWriteTechReviews(roles2, "ABC")).toBe(true);
	});
});

describe('canSubmitTimeAllocations', () => {
	it('should be false for any unknown role', () => {
		const roles = [
			{
				type: "UNKNOWN",
				partners: ["ABC"]
			}
		];
		expect(canSubmitTimeAllocations(roles)).toBe(false);
		expect(canSubmitTimeAllocations(roles, undefined)).toBe(false);
		expect(canSubmitTimeAllocations(roles, null)).toBe(false);
		expect(canSubmitTimeAllocations(roles,"RSA")).toBe(false);
		expect(canSubmitTimeAllocations()).toBe(false);
		expect(canSubmitTimeAllocations(roles, "ABC")).toBe(false);
	});
	it('should be true when ever the user is an administrator', () => {
		const roles = [
			{
				type: types.ADMINISTRATOR,
				partners: []
			}
		];
		expect(canSubmitTimeAllocations(roles, "RSA")).toBe(true);
		expect(canSubmitTimeAllocations(roles)).toBe(true);
		expect(canSubmitTimeAllocations(roles, undefined)).toBe(true);
		expect(canSubmitTimeAllocations(roles, null)).toBe(true);
		expect(canSubmitTimeAllocations(roles, "ABC")).toBe(true);
	});
	it('should be true only when the user is a tac chair for a partner', () => {
		const roles = [
			{
				type: types.TAC_CHAIR,
				partners: ["ABC"]
			}
		];
		expect(canSubmitTimeAllocations(roles)).toBe(false);
		expect(canSubmitTimeAllocations(roles, undefined)).toBe(false);
		expect(canSubmitTimeAllocations(roles, null)).toBe(false);
		expect(canSubmitTimeAllocations(roles,"RSA")).toBe(false);
		expect(canSubmitTimeAllocations(roles, "ABC")).toBe(true);
	});
	it('should be false for any other role or no arguments', () => {
		const roles = [
			{
				type: types.TAC_MEMBER,
				partners: ["ABC"]
			},
			{
				type: types.SALT_ASTRONOMER,
				partners: ["ABC"]
			},
		];
		expect(canSubmitTimeAllocations(roles)).toBe(false);
		expect(canSubmitTimeAllocations(roles, undefined)).toBe(false);
		expect(canSubmitTimeAllocations(roles, null)).toBe(false);
		expect(canSubmitTimeAllocations(roles,"RSA")).toBe(false);
		expect(canSubmitTimeAllocations(roles, "ABC")).toBe(false);
	});
	it('should be true if one of the roles match', () => {
		const roles1 = [
			{
				type: types.TAC_MEMBER,
				partners: ["ABC"]
			},
			{
				type: types.SALT_ASTRONOMER,
				partners: ["ABC"]
			},
			{
				type: types.TAC_CHAIR,
				partners: ["ABC"]
			},
		];
		const roles2 = [
			{
				type: types.TAC_MEMBER,
				partners: ["ABC"]
			},
			{
				type: types.SALT_ASTRONOMER,
				partners: ["ABC"]
			},
			{
				type: types.ADMINISTRATOR,
				partners: ["ABC"]
			},
		];
		expect(canSubmitTimeAllocations(roles1)).toBe(false);
		expect(canSubmitTimeAllocations(roles1, undefined)).toBe(false);
		expect(canSubmitTimeAllocations(roles1, null)).toBe(false);
		expect(canSubmitTimeAllocations(roles1,"RSA")).toBe(false);
		expect(canSubmitTimeAllocations(roles1, "ABC")).toBe(true);
		
		expect(canSubmitTimeAllocations(roles2)).toBe(true);
		expect(canSubmitTimeAllocations(roles2, undefined)).toBe(true);
		expect(canSubmitTimeAllocations(roles2, null)).toBe(true);
		expect(canSubmitTimeAllocations(roles2,"RSA")).toBe(true);
		expect(canSubmitTimeAllocations(roles2, "ABC")).toBe(true);
	});
});

describe('allocatedTimeTotals', () => {
	it('should return the sum of allocated time pre priority', () => {
		const proposals = [
			{
				allocatedTime: {
					"ABC" :{
						p0: 1,
						p1: 1,
						p2: 1,
						p3: 1,
						p4: 1,
					},
					"DEF" : {
						p0: 2,
						p1: 2,
						p2: 2,
						p3: 2,
						p4: 2,
                    },
					"GHI" : {
						p0: 3,
						p1: 3,
						p2: 3,
						p3: 3,
						p4: 3,
					}
				}
    
			},
			{
				allocatedTime: {
					"ABC" :{
						p0: 1,
						p1: 1,
						p2: 1,
						p3: 1,
						p4: 1,
					},
					"GHI" : {
						p0: 3,
						p1: 3,
						p2: 3,
						p3: 3,
						p4: 3,
					}
				}
				
			},
			{
				allocatedTime: {
					"XYZ" :{
						p0: 4,
						p1: 4,
						p2: 4,
						p3: 4,
						p4: 4,
					},
				}
				
			},
			{
				allocatedTime: {
					"ABC" :{
						p0: 1,
						p1: 1,
						p2: 1,
						p3: 1,
						p4: 1,
					},
					"DEF" : undefined,
					"JKL" : { }
				}
				
			},
		];
		expect(allocatedTimeTotals(proposals, "XYZ")).toEqual({ p0: 4, p1: 4, p2: 4, p3: 4, p4: 4 });
		expect(allocatedTimeTotals(proposals, "ABC")).toEqual({ p0: 3, p1: 3, p2: 3, p3: 3, p4: 3 });
		expect(allocatedTimeTotals(proposals, "DEF")).toEqual({ p0: 2, p1: 2, p2: 2, p3: 2, p4: 2 });
		expect(allocatedTimeTotals(proposals, "JKL")).toEqual({ p0: 0, p1: 0, p2: 0, p3: 0, p4: 0 });
  
	});
	it('should return all priority to be zero if no allocation to proposals', () => {
		const proposals = [
			{
				somethingElse: {
					"ABC" :{
						p0: 4,
						p1: 4,
						p2: 4,
						p3: 4,
						p4: 4,
					},
				}
				
			},
			{
				somethingElse: {
					"ABC" :{
						p0: 1,
						p1: 1,
						p2: 1,
						p3: 1,
						p4: 1,
					}
				}
				
			},
		];
		expect(allocatedTimeTotals(proposals, "ABC")).toEqual({ p0: 0, p1: 0, p2: 0, p3: 0, p4: 0 });
		expect(allocatedTimeTotals(proposals, "ABC")).not.toEqual({ p0: 5, p1: 5, p2: 5, p3: 5, p4: 5 });
	});
});

describe('Current semester should be set set correctly ', () => {
	
	it('should be 2018-1 for date 01/05/2018', () => {
		MockDate.set('05/01/2018');
		expect(currentSemester()).toBe('2018-1');
	});
	it('should be 2018-1 for date 10/31/2018', () => {
		MockDate.set('10/31/2018');
		expect(currentSemester()).toBe('2018-1');
	});
	it('should be 2018-1 for date between 01/05/2018 and 10/31/2018', () => {
		MockDate.set('07/11/2018');
		expect(currentSemester()).toBe('2018-1');
	});
	
	it('should be 2018-2 for date 11/01/2018', () => {
		MockDate.set('11/01/2018');
		expect(currentSemester()).toBe('2018-2');
	});
	it('should be 2018-2 for date 04/30/2019', () => {
		MockDate.set('04/30/2019');
		expect(currentSemester()).toBe('2018-2');
	});
	it('should be 2018-2 for date between 11/01/2018 and  04/30/2019', () => {
		MockDate.set('01/01/2019');
		expect(currentSemester()).toBe('2018-2');
	});
	
	afterEach(() => {
		MockDate.reset();
	});
});

describe('Default semester should be set set correctly ', () => {
	
	it('should be 2018-1 for date 02/01/2018', () => {
		MockDate.set('02/01/2018');
		expect(defaultSemester()).toBe('2018-1');
	});
	it('should be 2018-1 for date 07/31/2018', () => {
		MockDate.set('07/31/2018');
		expect(defaultSemester()).toBe('2018-1');
	});
	it('should be 2018-2 for date 08/01/2018', () => {
		MockDate.set('08/01/2018');
		expect(defaultSemester()).toBe('2018-2');
	});
	it('should be 2017-2 for date 01/31/2018', () => {
		MockDate.set('01/31/2018');
		expect(defaultSemester()).toBe('2017-2');
	});
	it('should be 2018-1 for date 05/01/2018', () => {
		MockDate.set('05/01/2018');
		expect(defaultSemester()).toBe('2018-1');
	});
	it('should be 2018-2 for date 10/31/2018', () => {
		MockDate.set('10/31/2018');
		expect(defaultSemester()).toBe('2018-2');
	});
	
	it('should be 2018-2 for date 11/01/2018', () => {
		MockDate.set('11/01/2018');
		expect(defaultSemester()).toBe('2018-2');
	});
	it('should be 2019-1 for date 04/30/2019', () => {
		MockDate.set('04/30/2019');
		expect(defaultSemester()).toBe('2019-1');
	});
	
	afterEach(() => {
		MockDate.reset();
	});
});