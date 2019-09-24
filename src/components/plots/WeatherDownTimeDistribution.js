import React from 'react'
import PropTypes from 'prop-types'
import Histogram from './Histogram'

/**
 *
 */
const WeatherDownTimeDistribution = ({weatherDownTime}) => {
  const downTimes = [
    'Science',
    'Engineering',
    'LostToWeather',
    'LostToProblems',
    'Idle'
  ]

  const data = {
    'Science': weatherDownTime.science / 3600,
    'Engineering': weatherDownTime.engineering / 3600,
    'LostToWeather': weatherDownTime.lostToWeather / 3600,
    'LostToProblems': weatherDownTime.lostToProblems / 3600,
    'Idle': weatherDownTime.idle / 3600
  }

  const dataset = [
    {
      className: 'all-partners',
      data
    }
  ]

  return <Histogram
    keys={ downTimes }
    datasets={ dataset }
    xLabel='Weather'
    yLabel='Down Time (hrs)'/>
}

WeatherDownTimeDistribution.propTypes = {
  weatherDownTime: PropTypes.object.isRequired
}

export default WeatherDownTimeDistribution
