import {
	FETCH_PROPOSALS_START, FETCH_PROPOSALS_PASS, FETCH_PROPOSALS_FAIL,
	UPDATE_SINGLE_PROPOSAL, UPDATING_PROPOSALS,
	UPDATE_LIAISON_ASTRONOMER,
	UPDATE_TECHNICAL_REPORT, SUBMIT_LIAISON_ASTRONOMERS_START, SUBMIT_LIAISON_ASTRONOMERS_PASS,
	SUBMIT_LIAISON_ASTRONOMERS_FAIL, SUBMIT_TECHNICAL_REPORTS_START, SUBMIT_TECHNICAL_REPORTS_PASS,
	SUBMIT_TECHNICAL_REPORTS_FAIL,
	UPDATE_TAC_COMMENT, UPDATE_ALLOCATED_PRIORITY,
	SUBMIT_TIME_ALLOCATIONS_START, SUBMIT_TIME_ALLOCATIONS_FAIL, SUBMIT_TIME_ALLOCATIONS_PASS
} from "../types";

const initialState = {
	fetching: false,
	fetched: false,
	submittingLiaisonAstronomers: false,
	submittedLiaisonAstronomers: false,
	submittingTechnicalReports: false,
	submittedTechnicalReports: false,
	submittingTimeAllocations: false,
	submittedTimeAllocations: {},
	unSubmittedTacChanges: false,
	proposals:[],
	errors: {
		fetchingError : null,
		submittingError : null,
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
				proposals: action.payload,
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
		case UPDATE_LIAISON_ASTRONOMER: {
			return {
				...state,
				submittedLiaisonAstronomers: false,
				proposals: state.proposals.map(p => {
					if (p.proposalCode === action.payload.proposalCode) {
						return {
							...p,
							liaisonAstronomer: action.payload.liaisonAstronomer
						}
					}
					else {
						return p;
					}
				})
			}
		}
		case UPDATE_TECHNICAL_REPORT: {
			return {
				...state,
				submittedTechnicalReports: false,
				proposals: state.proposals.map(p => {
					if (p.proposalCode === action.payload.proposalCode) {
						return {
							...p,
							techReport: action.payload.techReport
						}
					} else {
						return p;
					}
				})
			}
		}
		case SUBMIT_LIAISON_ASTRONOMERS_START: {
			return {
				...state,
				submittingLiaisonAstronomers: true,
				submittedLiaisonAstronomers: false,
			}
		}
		case SUBMIT_LIAISON_ASTRONOMERS_PASS: {
			return {
				...state,
				submittingLiaisonAstronomers: false,
				submittedLiaisonAstronomers: true,
				errors: {
					...state.errors,
					submittingError: null,
					
				}
			}
		}
		case SUBMIT_LIAISON_ASTRONOMERS_FAIL: {
			return {
				...state,
				submittingLiaisonAstronomers: false,
				submittedLiaisonAstronomers: false,
				errors: {
					...state.errors,
					submittingError: "Submitting the liaison astronomers failed.",
					
				}
			}
		}
		case SUBMIT_TECHNICAL_REPORTS_START: {
			return {
				...state,
				submittingTechnicalReports: true,
				submittedTechnicalReports: false,
			}
		}
		case SUBMIT_TECHNICAL_REPORTS_PASS: {
			return {
				...state,
				submittingTechnicalReports: false,
				submittedTechnicalReports: true,
				errors: {
					...state.errors,
					submittingError: null,
					
				}
			}
		}
		case SUBMIT_TECHNICAL_REPORTS_FAIL: {
			return {
				...state,
				submittingTechnicalReports: false,
				submittedTechnicalReports: false,
				errors: {
					...state.errors,
					submittingError: "Submitting the technical reports failed.",
					
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
