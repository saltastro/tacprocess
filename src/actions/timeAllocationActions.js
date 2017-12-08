import { queryPartnerAllocations } from "../api/graphQL"
import { TIME_ALLOCATIONS_QUERY_START,
TIME_ALLOCATIONS_QUERY_FAIL,
TIME_ALLOCATIONS_QUERY_PASS } from "../types";


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

const convertData = (data) => {
  const alloc = {
    p0p1: 0,
    p2: 0,
    p3: 0
  }
  data.partnerAllocations.forEach( a => {
    alloc.p0p1 += a.allocatedTime.AllocatedP0P1
    alloc.p2 += a.allocatedTime.AllocatedP2
    alloc.p3 += a.allocatedTime.AllocatedP3
  })
  console.log("*********", alloc);
  return data
}

export const storePartnerAllocations = (semester, partner="All") => {
  return function fits(dispatch) {
      dispatch(startQuery)
      queryPartnerAllocations(semester, partner).then( res => {
        dispatch(passQuery(convertData(res.data.data)))
      }).catch(() => {
        dispatch(failQuery())
      })

    }
  }
