import React from 'react'
import PropTypes from 'prop-types'

import Histogram from './Histogram'

/**
 *
 */
const TransparencyDistributionHistogram = ({ transparencyDistribution }) => {
  const transparencies = ['Clear', 'Thin cloud', 'Thick Cloud', 'Any']
  const { clear, thinCloud, thickCloud, any } = transparencyDistribution.timeRequested

  const datasets = [
    {
      className: 'all-partners',
      data: {
        'Clear': clear,
        'Thin cloud': thinCloud,
        'Thick Cloud': thickCloud,
        'Any': any
      }
    }
  ]

  return <Histogram
    keys={ transparencies }
    datasets={ datasets }
    xLabel='Transparency'
    yLabel='Requested Time (hrs)'/>
}

TransparencyDistributionHistogram.propTypes = {
  transparencyDistribution: PropTypes.object.isRequired
}

export default TransparencyDistributionHistogram
