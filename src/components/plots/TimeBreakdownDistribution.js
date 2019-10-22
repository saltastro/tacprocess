import React from 'react'
import PropTypes from 'prop-types'
import Histogram from './Histogram'

/**
 *
 */
const TimeBreakdownDistribution = ({timeBreakdown}) => {
  const categories = [
    'Science',
    'Engineering',
    'LostToWeather',
    'LostToProblems',
    'Idle'
  ]

  const data = {
    'Science': timeBreakdown.science / 3600,
    'Engineering': timeBreakdown.engineering / 3600,
    'LostToWeather': timeBreakdown.lostToWeather / 3600,
    'LostToProblems': timeBreakdown.lostToProblems / 3600,
    'Idle': timeBreakdown.idle / 3600
  }

  const dataset = [
    {
      className: 'all-partners',
      data
    }
  ]

  return <Histogram
    keys={ categories }
    datasets={ dataset }
    xLabel='Category'
    yLabel='Time (hrs)'/>
}

TimeBreakdownDistribution.propTypes = {
  timeBreakdown: PropTypes.object.isRequired
}

export default TimeBreakdownDistribution
