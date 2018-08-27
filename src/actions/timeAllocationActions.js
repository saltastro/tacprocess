import { queryPartnerAllocations } from '../api/graphQL'
import {
	TIME_ALLOCATIONS_QUERY_START,
	TIME_ALLOCATIONS_QUERY_FAIL,
	TIME_ALLOCATIONS_QUERY_PASS,
	SUBMIT_TIME_ALLOCATIONS_START,
	SUBMIT_TIME_ALLOCATIONS_PASS,
	SUBMIT_TIME_ALLOCATIONS_FAIL,
	ADD_NEW_MEMBER,
	REMOVE_MEMBER,
	ALL_PARTNER,
	SAVE_MEMBERS
} from '../types'

const startQuery = () => ({
  type: TIME_ALLOCATIONS_QUERY_START
})

const failQuery = (error) => ({
  type: TIME_ALLOCATIONS_QUERY_FAIL,
  payload: { error }
})

export const passQuery = data => ({
  type: TIME_ALLOCATIONS_QUERY_PASS,
  timeallocation: data
})

export const startSubmittingTimeAllocations = () => ({
  type: SUBMIT_TIME_ALLOCATIONS_START,

})

export const fetchAllocationsPass = partner => ({
  type: SUBMIT_TIME_ALLOCATIONS_PASS,
  payload: { partner }
})

export const failToSubmitTimeAllocations = (partner, error) => ({
  type: SUBMIT_TIME_ALLOCATIONS_FAIL,
  payload: {
    partner,
    error}
})

export const addNewMember = (member, partner) => ({
  type: ADD_NEW_MEMBER,
  payload: {
    member: { ...member, isTacChair: false },
    partner
  }
})
export const removeMember = (member, partner) => ({
  type: REMOVE_MEMBER,
  payload: {
    member,
    partner}
})
export const saveMembers = (partner) => ({
	type: SAVE_MEMBERS,
	payload: {
		partner}
})

export const convertPartnerAllocations = (data) => {
  let availableTime = {
    [ ALL_PARTNER ] :{
      p0p1: 0,
      p2: 0,
      p3: 0
    }}
  data.partnerAllocations.forEach( a => {
    const partner = a.code
    availableTime[ ALL_PARTNER ].p0p1 += a.timeAllocation.allocatedTime.p0Andp1
    availableTime[ ALL_PARTNER ].p2 += a.timeAllocation.allocatedTime.p2
    availableTime[ ALL_PARTNER ].p3 += a.timeAllocation.allocatedTime.p3

    availableTime = {
      ...availableTime,
        [ partner ]: {
				  p0p1: a.timeAllocation.allocatedTime.p0Andp1,
					p2: a.timeAllocation.allocatedTime.p2,
					p3: a.timeAllocation.allocatedTime.p3
			}
    }
  })
  return availableTime
}

export const storePartnerAllocations = (semester) => function fits(dispatch) {
  dispatch(startQuery())
  queryPartnerAllocations(semester).then( res => {
    dispatch(passQuery(res))
  }).catch((e) => {
    dispatch(failQuery(e.message))
  })

}
