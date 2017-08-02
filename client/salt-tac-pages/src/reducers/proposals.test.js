import C from '../constants';

import { proposals } from '../reducers';

describe('proposals reducer', () => {
    const p1 = { title: 'Proposal 1' };
    const p2 = { title: 'Proposal 2' };
    const p3 = { title: 'Proposal 3' };

    const e1 = {id: '99f389f2-77a8-4d5f-9387-d7ee1e4147b6', message: 'This is wrong.'};
    const e2 = {id: 'cbf3ecf5-ec9a-4167-92b7-80bc20713ef7', message: 'This is also wrong.'};
    const e3 = {id: '5afd29df-671f-4bfd-a8bd-cf9905430b9c', message: 'This is also wrong.'};

    it('should return the initial state', () => {
        expect(proposals(undefined, {}))
                .toEqual({
                             isLoading: false,
                             errors: [],
                             proposals: []
                         });
    });

    it('should handle FETCH_PROPOSALS_STARTED', () => {
        expect(proposals(
                {
                    isLoading: true,
                    errors: [],
                    proposals: []
                },
                {
                    type: C.FETCH_PROPOSALS_STARTED
                }
        )).toEqual(
                {
                    isLoading: true,
                    errors: [],
                    proposals: []
                }
        );

        expect(proposals(
                {
                    isLoading: false,
                    errors: [e1],
                    proposals: [p1, p2]
                },
                {
                    type: C.FETCH_PROPOSALS_STARTED
                }
        )).toEqual(
                {
                    isLoading: true,
                    errors: [],
                    proposals: []
                }
        );
    });

    it('should handle FETCH_PROPOSALS_SUCCEEDED', () => {
        expect(proposals(
                {
                    isLoading: false,
                    errors: [],
                    proposals: []
                },
                {
                    type: C.FETCH_PROPOSALS_SUCCEEDED,
                    payload: {
                        proposals: [p1, p2]
                    }
                }
        )).toEqual(
                {
                    isLoading: false,
                    errors: [],
                    proposals: [p1, p2]
                }
        );

        expect(proposals(
                {
                    isLoading: true,
                    errors: [e1, e2],
                    proposals: [p3]
                },
                {
                    type: C.FETCH_PROPOSALS_SUCCEEDED,
                    payload: {
                        proposals: [p1, p2]
                    }
                }
        )).toEqual(
                {
                    isLoading: false,
                    errors: [e1, e2],
                    proposals: [p1, p2]
                }
        );

    });

    it('should handle FETCH_PROPOSALS_FAILED', () => {
        expect(proposals(
                {
                    isLoading: false,
                    errors: [e1],
                    proposals: [p1]
                },
                {
                    type: C.FETCH_PROPOSALS_FAILED,
                    payload: { error: e2 }
                }
        )).toEqual(
                {
                    isLoading: false,
                    errors: [e1, e2],
                    proposals: [p1]
                }
        );

        expect(proposals(
                {
                    isLoading: true,
                    errors: [],
                    proposals: []
                },
                {
                    type: C.FETCH_PROPOSALS_FAILED,
                    payload: { error: e2 }
                }
        )).toEqual(
                {
                    isLoading: false,
                    errors: [e2],
                    proposals: []
                }
        );
    });

    it('should handle DELETE_PROPOSALS_ERROR', () => {
        expect(proposals(
                {
                    isLoading: false,
                    errors: [e1, e2, e3],
                    proposals: []
                },
                {
                    type: C.DELETE_PROPOSALS_ERROR,
                    payload: {
                        id: 'cbf3ecf5-ec9a-4167-92b7-80bc20713ef7'
                    }
                }
        )).toEqual(
                {
                    isLoading: false,
                    errors: [e1, e3],
                    proposals: []
                }
        );

        expect(proposals(
                {
                    isLoading: true,
                    errors: [e1, e2, e3],
                    proposals: [p2, p3]
                },
                {
                    type: C.DELETE_PROPOSALS_ERROR,
                    payload: {
                        id: '75edce7a-1d90-4167-8b16-c9aefdec2729'
                    }
                }
        )).toEqual(
                {
                    isLoading: true,
                    errors: [e1, e2, e3],
                    proposals: [p2, p3]
                }
        );

    })
});
