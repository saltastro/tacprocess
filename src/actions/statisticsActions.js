import { queryStatistics } from '../api/graphQL'
import {
  FETCH_STATISTICS_START,
  FETCH_STATISTICS_PASS,
  FETCH_STATISTICS_FAIL
} from '../types'

function startFetchStatistics () {
  return (
    {
      type: FETCH_STATISTICS_START
    }
  )
}

function fetchStatisticsFail (error) {
  return (
    {
      type: FETCH_STATISTICS_FAIL,
      payload: { error }
    }
  )
}

export function fetchStatisticsPass (statistics) {
  return (
    {
      type: FETCH_STATISTICS_PASS,
      payload: {
        statistics
      }
    }
  )
}

export default function fetchStatistics (semester, partner) {
  return function disp (dispatch) {
    dispatch(startFetchStatistics())
    queryStatistics(semester, partner)
    .then(res => { dispatch(fetchStatisticsPass(res)) }
    )
    .catch((e) => {
      dispatch(fetchStatisticsFail(e.message))
    })
  }
}