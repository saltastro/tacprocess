import {
	FETCH_PROPOSALS_START, FETCH_PROPOSALS_PASS, FETCH_PROPOSALS_FAIL,
	UPDATE_SINGLE_PROPOSAL, UPDATING_PROPOSALS,
	UPDATE_TECHNICAL_REVIEW,
	SUBMIT_TECHNICAL_REVIEWS_START, SUBMIT_TECHNICAL_REVIEWS_PASS, SUBMIT_TECHNICAL_REVIEWS_FAIL,
	UPDATE_TAC_COMMENT, UPDATE_ALLOCATED_PRIORITY,
	SUBMIT_TIME_ALLOCATIONS_START, SUBMIT_TIME_ALLOCATIONS_FAIL, SUBMIT_TIME_ALLOCATIONS_PASS
} from "../types";
import {setDefaultTechReviews} from "../util/filters";

const initialState = {
	fetching: false,
	fetched: false,
	submittingTechnicalReviews: false,
	submittedTechnicalReviews: false,
	submittingTimeAllocations: false,
	submittedTimeAllocations: {},
	unSubmittedTacChanges: false,
	proposals:[],
	initProposals: [],
	updatedProposals: [],
	errors: {
		fetchingError : null,
		submittingError : null,
		submittingReviewsError : null,
	},
};

export default function proposals(state = initialState, action = {}) {
	switch (action.type) {
		case FETCH_PROPOSALS_START:{
			return {
				...state,
				fetching: true,
				fetched: false,
			};}
		case FETCH_PROPOSALS_FAIL: {
			return {
				...state,
				fetching: false,
				fetched: false,
				proposals: [],
				initProposals: [],
				errors: {
					...state.errors,
					fetchingError: "Fail to get proposals from api"
				}
			}
		}
		case FETCH_PROPOSALS_PASS: {
			return {
				...state,
				fetching: false,
				fetched: true,
				errors: {
					...state.errors,
					fetchingError: null
				},
				proposals: setDefaultTechReviews(action.payload.proposals, action.payload.semester),
				initProposals: JSON.parse(JSON.stringify(setDefaultTechReviews(action.payload.proposals, action.payload.semester)))
			}
		}
		case UPDATE_SINGLE_PROPOSAL: {
			return {
				...state,
				fetching: false,
				fetched: true,
				proposals: action.payload,
			}
		}
		case UPDATING_PROPOSALS: {
			return {
				...state,
				fetching: false,
				fetched: true,
				proposals: action.payload,
			}
		}
		case UPDATE_TECHNICAL_REVIEW: {
			const updatedProposals = state.updatedProposals.indexOf(action.payload.proposalCode) === -1 ?
					[...state.updatedProposals, action.payload.proposalCode] : state.updatedProposals;

			return {
				...state,
				submittedTechnicalReports: false,
				proposals: state.proposals.map(p => {
					if (p.proposalCode === action.payload.proposalCode) {
						return {
							...p,
							techReviews: {
								...p.techReviews,
								[action.payload.semester]: action.payload.techReview
							}
						}
					} else {
						return p;
					}
				}),
				updatedProposals
			}
		}
		case SUBMIT_TECHNICAL_REVIEWS_START: {
			return {
				...state,
				submittingTechnicalReviews: true,
				submittedTechnicalReviews: false,
				errors: {
					...state.errors,
					submittingReviewsError: null
				}
			}
		}
		case SUBMIT_TECHNICAL_REVIEWS_PASS: {
			return {
				...state,
				submittingTechnicalReviews: false,
				submittedTechnicalReviews: true,
			}
		}
		case SUBMIT_TECHNICAL_REVIEWS_FAIL: {
			return {
				...state,
				submittingTechnicalReviews: false,
				submittedTechnicalReviews: false,
				errors: {
					...state.errors,
					submittingReviewsError: "Submitting the reviews failed.",

				}
			}
		}
		case UPDATE_TAC_COMMENT: {
			const commentForPartner = { [action.payload.partner]: {"comment": action.payload.tacComment }};
			return {
				...state,
				unSubmittedTacChanges: {
					...state.unSubmittedTacChanges,
					[action.payload.partner]: true
				},
				proposals: state.proposals.map(p => {
					if (p.proposalCode === action.payload.proposalCode) {
						return {
							...p,
							tacComment: commentForPartner
						}
					} else {
						return p;
					}
				})
			}
		}
		case UPDATE_ALLOCATED_PRIORITY: {
			const partner = action.payload.partner;
			return {
				...state,
				unSubmittedTacChanges: { [partner]: true},
				proposals: state.proposals.map(p => {
					if (p.proposalCode === action.payload.proposalCode) {
						return {
							...p,
							allocatedTime: {
								...p.allocatedTime,
								[partner]: {
									...p.allocatedTime[partner],
									[action.payload.priority]: action.payload.time
								}
							}
						}
					} else {
						return p;
					}
				})
			}
		}
		case SUBMIT_TIME_ALLOCATIONS_START: {
			return {
				...state,
				submittingTimeAllocations: true,
				submittedTimeAllocations: {},
			}
		}
		case SUBMIT_TIME_ALLOCATIONS_FAIL: {
			return {
				...state,
				submittingTimeAllocations: false,
				submittedTimeAllocations: {
					results: false,
					partner: action.payload.partner
				},
				errors: {
					...state.errors,
					submittingError: "Fail to submit time allocations",

				}
			}
		}
		case SUBMIT_TIME_ALLOCATIONS_PASS: {
			return {
				...state,
				submittingTimeAllocations: false,
				submittedTimeAllocations: {
					results: true,
					partner: action.payload.partner
				},
				unSubmittedTacChanges: false,
				errors: {
					...state.errors,
					submittingError: null,

				}
			}
		}
		default: {
			return state;
		}

	}

}
