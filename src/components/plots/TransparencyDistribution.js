import React from 'react'
import PropTypes from 'prop-types'

import Histogram from './Histogram'

/**
 *
 */
const TransparencyDistribution = ({ observingConditionsClouds }) => {
  const transparencies = ['Clear', 'Thin cloud', 'Thick Cloud', 'Any']

  const datasets = [
    {
      className: 'all-partners',
      data: {
        'Clear': observingConditionsClouds.timeRequested.clear,
        'Thin cloud': observingConditionsClouds.timeRequested.thinCloud,
        'Thick Cloud': observingConditionsClouds.timeRequested.thickCloud,
        'Any': observingConditionsClouds.timeRequested.any
      }
    }
  ]

  return <Histogram
    keys={ transparencies }
    datasets={ datasets }
    xLabel='Transparency'
    yLabel='Requested Time (hrs)'/>
}

TransparencyDistribution.propTypes = {
  observingConditionsClouds: PropTypes.object.isRequired
}

export default TransparencyDistribution
