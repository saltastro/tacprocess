import { queryWeatherDownTime } from '../api/graphQL'
import {
  FETCH_WEATHER_DOWN_TIME_START,
  FETCH_WEATHER_DOWN_TIME_PASS,
  FETCH_WEATHER_DOWN_TIME_FAIL
} from '../types'

function startFetchWeatherDownTime () {
  return (
    {
      type: FETCH_WEATHER_DOWN_TIME_START
    }
  )
}

function fetchWeatherDownTimeFail (error) {
  return (
    {
      type: FETCH_WEATHER_DOWN_TIME_FAIL,
      payload: { error }
    }
  )
}

export function fetchWeatherDownTimePass (weatherDownTime) {
  return (
    {
      type: FETCH_WEATHER_DOWN_TIME_PASS,
      payload: {
        weatherDownTime
      }
    }
  )
}

export default function fetchWeatherDownTime (semester) {
  return function disp (dispatch) {
    dispatch(startFetchWeatherDownTime())
    queryWeatherDownTime(semester)
    .then(res => { dispatch(fetchWeatherDownTimePass(res)) }
    )
    .catch((e) => {
      dispatch(fetchWeatherDownTimeFail(e.message))
    })
  }
}
