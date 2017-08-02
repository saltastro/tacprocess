import C from '../constants';

const initialProposalsState = {
    isLoading: false,
    errors: [],
    proposals: []
};

export function proposals(state=initialProposalsState, action) {
    switch (action.type) {
    case C.FETCH_PROPOSALS_STARTED:
        return {
            ...state,
            isLoading: true,
            errors: [],
            proposals: []
        };
    case C.FETCH_PROPOSALS_SUCCEEDED:
        return {
            ...state,
            isLoading: false,
            proposals: action.payload.proposals
        };
    case C.FETCH_PROPOSALS_FAILED:
        return {
                ...state,
            isLoading: false,
            errors: [...state.errors, action.payload.error]
        };
    case C.DELETE_PROPOSALS_ERROR:
        return {
            ...state,
            errors: state.errors.filter(error => error.id !== action.payload.id)
        };
    default:
        return state;
    }
}
