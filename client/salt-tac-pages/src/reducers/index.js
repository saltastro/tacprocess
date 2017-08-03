import C from '../constants';

const initialSemesterData = {
    semester: null,
    isLoading: false,
    errors: [],
    proposals: []
};

export function semesterData(state=initialSemesterData, action) {
    switch (action.type) {
    case C.FETCH_SEMESTER_DATA_STARTED:
        return {
            ...state,
            semester: action.payload.semester,
            isLoading: true,
            errors: [],
            proposals: []
        };
    case C.FETCH_SEMESTER_DATA_SUCCEEDED:
        return {
            ...state,
            isLoading: false,
            proposals: action.payload.proposals
        };
    case C.FETCH_SEMESTER_DATA_FAILED:
        return {
                ...state,
            isLoading: false,
            errors: [...state.errors, action.payload.error]
        };
    case C.DELETE_SEMESTER_DATA_ERROR:
        return {
            ...state,
            errors: state.errors.filter(error => error.id !== action.payload.id)
        };
    default:
        return state;
    }
}
