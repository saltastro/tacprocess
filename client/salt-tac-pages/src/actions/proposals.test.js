import { v4 } from 'uuid';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import C from '../constants';
import * as actions from '../../src/actions';
import * as api from '../../src/api';

jest.mock('../api');
jest.mock('uuid');

const MOCK_UUID =  'cbf3ecf5-ec9a-4167-92b7-80bc20713ef7';

const MOCK_SERVER_ERROR = 'This is not a valid semester.';

v4.mockImplementation(() => MOCK_UUID);

const p1 = { title: 'Proposal 1' };
const p2 = { title: 'Proposal 2' };

api.fetchProposals.mockImplementation(semester => {
    if (semester === '2017-2') {
        return Promise.resolve([p1, p2]);
    } else {
        return Promise.reject(MOCK_SERVER_ERROR);
    }
});

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('fetchProposals', () => {
    it('should should fetch proposals', () => {
        const expectedActions = [
            {
                type: C.FETCH_PROPOSALS_STARTED
            },
            {
                type: C.FETCH_PROPOSALS_SUCCEEDED,
                payload: {
                    proposals: [p1, p2]
                }
            }
        ];

        const store = mockStore({
                                    proposals: {
                                        isLoading: false,
                                        errors: [],
                                        proposals: []
                                    }
                                });

        return store.dispatch(actions.fetchProposals('2017-2'))
                .then(() => expect(store.getActions()).toEqual(expectedActions));
    });

    it('should fail', () => {
        const message = 'The server is down';
        const expectedActions = [
            {
                type: C.FETCH_PROPOSALS_STARTED
            },
            {
                type: C.FETCH_PROPOSALS_FAILED,
                payload: {
                    error: {
                        id: MOCK_UUID,
                        message: MOCK_SERVER_ERROR
                    }
                }
            }
        ];

        const store = mockStore({
                                    proposals: {
                                        isLoading: false,
                                        errors: [],
                                        proposals: []
                                    }
                                });

        return store.dispatch(actions.fetchProposals('ABC'))
                .then(() => expect(store.getActions()).toEqual(expectedActions));
    })
});

describe('fetchProposalsSucceeded', () => {
    it('should create an action for fetching proposals successfully', () => {
        const proposals = [
            { title: 'Proposal 1' },
            { title: 'Proposal 2' }
        ];
        const expectedAction = {
            type: C.FETCH_PROPOSALS_SUCCEEDED,
            payload: {
                proposals
            }
        };

        expect(actions.fetchProposalsSucceeded(proposals)).toEqual(expectedAction);
    })
});

describe('fetchProposalsFailed', () => {
    it('should create an action for fetching proposals unsuccessfully', () => {
        const message = 'The server did not respond.';
        const expectedAction = {
            type: C.FETCH_PROPOSALS_FAILED,
            payload: {
                error: {
                    id: MOCK_UUID,
                    message
                }
            }
        };

        expect(actions.fetchProposalsFailed(message)).toEqual(expectedAction);
     });
});
