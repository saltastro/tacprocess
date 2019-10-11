import { queryTimeBreakdown } from '../api/graphQL'
import {
  FETCH_WEATHER_DOWN_TIME_START,
  FETCH_WEATHER_DOWN_TIME_PASS,
  FETCH_WEATHER_DOWN_TIME_FAIL
} from '../types'

function startFetchTimeBreakdown () {
  return (
    {
      type: FETCH_WEATHER_DOWN_TIME_START
    }
  )
}

function fetchTimeBreakdownFail (error) {
  return (
    {
      type: FETCH_WEATHER_DOWN_TIME_FAIL,
      payload: { error }
    }
  )
}

export function fetchTimeBreakdownPass (timeBreakdown) {
  return (
    {
      type: FETCH_WEATHER_DOWN_TIME_PASS,
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
