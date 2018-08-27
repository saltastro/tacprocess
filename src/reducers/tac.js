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
  FETCHING_TAC_MEMBERS_START
} from '../types'

const initState = {
  data:{
    'NONE': {
      p0p1: 0,
      p2: 0,
      p3: 0
    }
  },
  fetchingTacs:false,
  fetchedTacs:false,
  fetchingusers:false,
  fetchedusers:false,
  errors: {},
  submiting: false,
  submited: true,
  newMembers: {},
  removedMembers: {},
  tacMembers: {},
  initTacMembers: {},
  saltUsers: []
}

export default function statistics(state=initState, action = {}) {
  switch (action.type) {
  case TIME_ALLOCATIONS_QUERY_START:{
    return {
      ...state,
      fetching: true,
      fetched: false,
      error: null
    }}
  case TIME_ALLOCATIONS_QUERY_FAIL: {
    return {
      ...state,
      fetching: false,
      fetched: false,
      error: action.payload.error }
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
    if (!state.newMembers[ action.payload.partner ]){
      state.newMembers[ action.payload.partner ] = []
    }
		if (!state.removedMembers[ action.payload.partner ]){
			state.removedMembers[ action.payload.partner ] = []
		}
    if (state.newMembers[ action.payload.partner ].some( p => (
      p.username === action.payload.member.username)) ||
						state.tacMembers[ action.payload.partner ].some( p => (
						  p.username === action.payload.member.username))
    ){
      return {...state}
    }
    if (
			state.initTacMembers[ action.payload.partner ].some( p => (
				p.username === action.payload.member.username))
    ){
			return {
				...state,
				tacMembers: {
					...state.tacMembers,
					[ action.payload.partner ] : [
						...state.tacMembers[ action.payload.partner ],
						action.payload.member
					]
				},
				removedMembers: {
					...state.removedMembers,
					[ action.payload.partner ]: [
						...state.removedMembers[ action.payload.partner ].filter( m => (action.payload.member.username !== m.username))
					]
				}
			}
    }

		return {
			...state,
			newMembers: {
				...state.newMembers,
				[ action.payload.partner ] : [
					...state.newMembers[ action.payload.partner ],
					action.payload.member
				]
			},
			removedMembers: {
				...state.removedMembers,
				[ action.payload.partner ]: [
					...state.removedMembers[ action.payload.partner ].filter( m => (action.payload.member.username !== m.username))
				]
			}
		}
  }
  case REMOVE_MEMBER: {
    if (!state.newMembers[ action.payload.partner ]){
      state.newMembers[ action.payload.partner ] = []
    }
		if (!state.removedMembers[ action.payload.partner ]){
			state.removedMembers[ action.payload.partner ] = []
		}
		if (
			state.initTacMembers[ action.payload.partner ].some( p => (
				p.username === action.payload.member.username))
		){
			return {
				...state,
				tacMembers: {
					...state.tacMembers,
					[ action.payload.partner ]: [
						...state.tacMembers[ action.payload.partner ].filter( m => (action.payload.member.username !== m.username))]
				},
				newMembers: {
					...state.newMembers,
					[ action.payload.partner ]: [
						...state.newMembers[ action.payload.partner ].filter( m => (action.payload.member.username !== m.username))]
				},
				removedMembers: {
					...state.removedMembers,
					[ action.payload.partner ]: [
						...state.removedMembers[ action.payload.partner ].filter( m => (action.payload.member.username !== m.username)),
						action.payload.member
					]
				}
			}
    }

    return {
      ...state,
      tacMembers: {
        ...state.tacMembers,
        [ action.payload.partner ]: [
          ...state.tacMembers[ action.payload.partner ].filter( m => (action.payload.member.username !== m.username))]
      },
      newMembers: {
        ...state.newMembers,
        [ action.payload.partner ]: [
          ...state.newMembers[ action.payload.partner ].filter( m => (action.payload.member.username !== m.username))]
      },
      removedMembers: {
				...state.removedMembers,
        [ action.payload.partner ]: [
					...state.removedMembers[ action.payload.partner ].filter( m => (action.payload.member.username !== m.username)),
        ]
      }
    }
  }
  case SAVE_MEMBERS: {
    return {
      ...state,
			removedMembers: {
				...state.removedMembers,
				[ action.payload.partner ]: []
			},
			newMembers: {
				...state.newMembers,
				[ action.payload.partner ]: []
			},
      unsavedMember: false
    }
  }
  case FAIL_TO_GET_TAC_MEMBERS: {
    return {
      ...state,
      fetchedTacs: false,
      fetchingTacs: false,
      errors:{
        ...state.errors,
        tacsError: 'Fail to get tac members'
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
        saltUsersError: 'Fail to get salt users'
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
      tacMembers: action.payload,
      initTacMembers: action.payload,
			removedMembers: {},
			newMembers: {}
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
	case USER_LOGGED_OUT: {
		  return initState
	  }
  default:{
    return state
  }

  }

}
