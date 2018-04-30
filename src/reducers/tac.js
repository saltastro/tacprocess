import {
  TIME_ALLOCATIONS_QUERY_START,
  TIME_ALLOCATIONS_QUERY_PASS,
  TIME_ALLOCATIONS_QUERY_FAIL,
  USER_LOGGED_OUT,
  REMOVE_MEMBER,
  SAVE_MEMBERS,
  ADD_NEW_MEMBER,
  FAIL_TO_GET_SALT_USERS,
  FAIL_TO_GET_TAC_MEMBERS,
  SALT_USERS_QUERY_PASS,
  TAC_MEMBERS_QUERY_PASS,
  FETCHING_SALT_USERS_START,
  FETCHING_TAC_MEMBERS_START, SUBMIT_NEW_TAC_FAIL, SUBMIT_NEW_TAC_START, SUBMIT_NEW_TAC_PASS
} from '../types';

const initState = {
	data:{
		"NONE": {
			p0p1: 0,
			p2: 0,
			p3: 0
		}
	},
	fetchingTacs:false,
	fetchedTacs:false,
	fetchingusers:false,
	fetchedusers:false,
	submiting: false,
	submited: true,
	newMembers: {},
	removedMembers: {},
	tacMembers: {},
	saltUsers: [],
  submittingNewMembers: false,
  submittedNewMembers: false,
  errors: {
    submittingNewMembersError: null,
    timeAllocationQueryError: null
  }
};

export default function tac(state=initState, action = {}) {
  switch (action.type) {
    case TIME_ALLOCATIONS_QUERY_START:{
      return {
        ...state,
        fetching: true,
        fetched: false,
          error: {
            ...state.errors,
          timeAllocationQueryError: null
          }
      };}
      case TIME_ALLOCATIONS_QUERY_FAIL: {
        return {
          ...state,
          fetching: false,
          fetched: false,
          error: {
            ...state.errors,
            timeAllocationQueryError: action.payload.error
          }
        }
      }
      case TIME_ALLOCATIONS_QUERY_PASS: {
        return {
          ...state,
          fetching: false,
          fetched: true,
          data: action.timeallocation,
        }
      }
			case ADD_NEW_MEMBER: {
				if (!state.newMembers[action.payload.partner]){
					state.newMembers[action.payload.partner] = []
				}
        if (!state.removedMembers[action.payload.partner]){
          state.removedMembers[action.payload.partner] = []
        }
				if (state.newMembers[action.payload.partner].some( p => ( p.username === action.payload.member.username)) ||
          state.tacMembers[action.payload.partner].some( p => ( p.username === action.payload.member.username))){
					return {...state}
				}
        if (state.initMembers[action.payload.partner]
					.some( p => ( p.username === action.payload.member.username))
        ){
          return {
          	...state,
						tacMembers: {
							...state.tacMembers,
              [action.payload.partner] : [
                ...state.tacMembers[action.payload.partner],
                action.payload.member
              ]
						},
            removedMembers: {
              ...state.removedMembers,
              [action.payload.partner] : [
                ...state.removedMembers[action.payload.partner]
									.filter(m => m.username !== action.payload.member.username)

              ]
            }
					}
        }
				return {
					...state,
					newMembers: {
						...state.newMembers,
						[action.payload.partner] : [
								...state.newMembers[action.payload.partner],
								action.payload.member
							]
					}
				}
			}
			case REMOVE_MEMBER: {

				if (!state.removedMembers[action.payload.partner]){
					state.removedMembers[action.payload.partner] = []
				}
        if (!state.newMembers[action.payload.partner]){
          state.newMembers[action.payload.partner] = []
        }
        let removedMembers = []
				if ( !state.removedMembers[action.payload.partner].some( m => action.payload.member.username === m.username) &&
				state.initMembers[action.payload.partner].some(m => action.payload.member.username === m.username)) {
          removedMembers = [
          	...state.removedMembers[action.payload.partner],
						action.payload.member
					]
				} else {
          removedMembers = [...state.removedMembers[action.payload.partner]]
				}

				return {
					...state,
					tacMembers: {
						...state.tacMembers,
						[action.payload.partner]: [
							...state.tacMembers[action.payload.partner].filter( m => (action.payload.member.username !== m.username))]
						},
          removedMembers: {
						[action.payload.partner]: removedMembers
					},
          newMembers: {
            ...state.newMembers,
            [action.payload.partner]: [
              ...state.newMembers[action.payload.partner].filter( m => (action.payload.member.username !== m.username))]
          }

				}
			}
			case SAVE_MEMBERS: {
				return {
					...state,
					unsavedMember: false,
				newMembers: [],
				removedMembers: [],
				}
			}
			case FAIL_TO_GET_TAC_MEMBERS: {
				return {
					...state,
					fetchedTacs: false,
					fetchingTacs: false,
					errors:{
						...state.errors,
						tacsError: "Fail to get tac members"
					}
				}
			}
			case FAIL_TO_GET_SALT_USERS: {
				return {
					...state,
					fetchedSaltUsers: false,
					fetchingSaltUsers: false,
					errors:{
						...state.errors,
						saltUsersError: "Fail to get salt users"
					}
				}
			}
			case FETCHING_TAC_MEMBERS_START: {
				return {
					...state,
					fetchingTacs: true,
					errors:{
						...state.errors,
						tacsError: undefined
					},
					tacMembers: {}
				}
			}
			case FETCHING_SALT_USERS_START: {
				return {
					...state,
					fetchingSaltUsers: true,
					errors: {
						...state.errors,
						saltUsersError: undefined
					}
				}
			}
			case TAC_MEMBERS_QUERY_PASS: {
				return {
					...state,
					fetchingTacs: true,
					errors:{
						...state.errors,
						tacsError: undefined
					},
					initMembers: action.payload,
					tacMembers: action.payload
				}
			}
			case SALT_USERS_QUERY_PASS: {
				return {
					...state,
					fetchingSaltUsers: true,
					errors:{
						...state.errors,
						saltUsersError: undefined
					},
					saltUsers: action.payload
				}
			}
    case SUBMIT_NEW_TAC_START: {
      return {
        ...state,
        submittingNewMembers: true,
        submittedNewMembers: false,
        errors: {
          ...state.errors,
          submittingNewMembersError: null,

        }
      }
    }
    case SUBMIT_NEW_TAC_PASS: {
      return {

        ...state,
        submittingNewMembers: false,
        submittedNewMembers: true,
				newMembers: {
					...state.newMembers,
					[action.payload.partner]: []
				},
				removedMembers: {
					...state.removedMembers,
					[action.payload.partner]: []
				}
      }
    }
    case SUBMIT_NEW_TAC_FAIL: {
      return {
        ...state,
        submittingNewMembers: false,
        submittedNewMembers: false,
        errors: {
          ...state.errors,
          submittingNewMembersError: action.payload.error,

        }
      }
    }
	  case USER_LOGGED_OUT: {
		  return initState
	  }
      default:{
        return state;
      }

    }

}
