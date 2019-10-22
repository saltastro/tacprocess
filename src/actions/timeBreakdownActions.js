import { queryTimeBreakdown } from '../api/graphQL'
import {
  FETCH_TIME_BREAKDOWN_START,
  FETCH_TIME_BREAKDOWN_PASS,
  FETCH_TIME_BREAKDOWN_FAIL
} from '../types'

function startFetchTimeBreakdown () {
  return (
    {
      type: FETCH_TIME_BREAKDOWN_START
    }
  )
}

function fetchTimeBreakdownFail (error) {
  return (
    {
      type: FETCH_TIME_BREAKDOWN_FAIL,
      payload: { error }
    }
  )
}

export function fetchTimeBreakdownPass (timeBreakdown) {
  return (
    {
      type: FETCH_TIME_BREAKDOWN_PASS,
      payload: {
        timeBreakdown
      }
    }
  )
}

export default function fetchTimeBreakdown (semester) {
  return function disp (dispatch) {
    dispatch(startFetchTimeBreakdown())
    queryTimeBreakdown(semester)
    .then(res => { dispatch(fetchTimeBreakdownPass(res)) }
    )
    .catch((e) => {
      dispatch(fetchTimeBreakdownFail(e.message))
    })
  }
}
