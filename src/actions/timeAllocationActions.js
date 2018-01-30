import { queryPartnerAllocations } from "../api/graphQL"
import { TIME_ALLOCATIONS_QUERY_START,
TIME_ALLOCATIONS_QUERY_FAIL,
TIME_ALLOCATIONS_QUERY_PASS,
SUBMIT_TIME_ALLOCATIONS_START,
SUBMIT_TIME_ALLOCATIONS_PASS,
SUBMIT_TIME_ALLOCATIONS_FAIL,
 } from "../types";


const startQuery = () => ({
    type: TIME_ALLOCATIONS_QUERY_START
  })

const failQuery = () => ({
    type: TIME_ALLOCATIONS_QUERY_FAIL
  })

export const passQuery = data => ({
    type: TIME_ALLOCATIONS_QUERY_PASS,
    timeallocation: data
  })

export const startSubmittingTimeAllocations = () => ({
      type: SUBMIT_TIME_ALLOCATIONS_START,
      
    })

export const TimeAllocationSubmittedSuccessfully = partner => ({
    type: SUBMIT_TIME_ALLOCATIONS_PASS,
	payload: {partner: partner}
    })

export const failToSubmitTimeAllocations = partner => ({
    type: SUBMIT_TIME_ALLOCATIONS_FAIL,
	payload: {partner: partner}
})

const convertData = (data) => {
  let availableTime = {}
  data.partnerAllocations.forEach( a => {
    availableTime[a.code] = {
      p0p1: a.allocatedTime.AllocatedP0P1,
      p2: a.allocatedTime.AllocatedP2,
      p3: a.allocatedTime.AllocatedP3
    }
  })
  return availableTime
}

export const storePartnerAllocations = (semester, partner="All") => function fits(dispatch) {
      dispatch(startQuery)
      queryPartnerAllocations(semester, partner).then( res => {
        dispatch(passQuery(convertData(res.data.data)))
      }).catch(() => {
        dispatch(failQuery())
      })

    }
