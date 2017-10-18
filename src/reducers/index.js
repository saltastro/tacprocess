import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import apolloClient, { createNetworkInterface } from "apollo-client";

import C from '../constants';
import * as api from '../api';

const initialSemesterData = {
    semester: null,
    partner: null,
    isLoading: false,
    errors: [],
    proposals: [],
    targets: [],
    availableTime: {}
};

export function semesterData(state=initialSemesterData, action) {
    switch (action.type) {
    case C.FETCH_SEMESTER_DATA_STARTED:
        return {
            ...state,
            semester: action.payload.semester,
            partner: action.payload.partner,
            isLoading: true,
            errors: [],
            proposals: [],
            targets: [],
            availableTime: {}
        };
    case C.FETCH_SEMESTER_DATA_SUCCEEDED:
        const {proposals, targets, availableTime} = action.payload;
        return {
            ...state,
            isLoading: false,
            proposals,
            targets,
            availableTime
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

const initialUser = {
    isLoading: false,
    errors: [],
    user: api.loadUser()
};

export function user(state=initialUser, action) {
    switch (action.type) {
    case C.LOGIN_STARTED:
        return {
                ...state,
            isLoading: true,
            errors: [],
            user: {}
        };
    case C.LOGIN_SUCCEEDED:
        return {
                ...state,
            isLoading: false,
            user: action.payload.user
        };
    case C.LOGIN_FAILED:
        return {
                ...state,
            isLoading: false,
            errors: [...state.errors, action.payload.error]
        };
    case C.LOGOUT:
        return {
            ...state,
            user: null
        };
    case C.DELETE_LOGIN_ERROR:
        return {
            ...state,
            errors: state.errors.filter(error => error.id !== action.payload.id)
        };
    default:
        return state;
    }
}

const networkInterface = createNetworkInterface({ uri: 'http://127.0.0.1:5000:graphgl'});

networkInterface.use([{
  applyMiddleware(req, next){
    if (!req.options.headers){
      req.options.headers = {};
    }
    req.options.headers.authorization = localStorage.getItem('tacPageJWT', '');
    next();
  },
}]);

export const client = new ApolloClinet({
  networkInterface,
});

const rootReuducer = combineReducers({
  routing: routerReducer,
  apollo: client.reducer(),

});
