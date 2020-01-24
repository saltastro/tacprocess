import React from 'react'
import PropTypes from 'prop-types'

import Histogram from './Histogram'

const HrsModeDistribution = ({timeRequestedPerHrsExposure}) => {
  const resolutionModes = [
    'HIGH RESOLUTION',
    'HIGH STABILITY',
    'LOW RESOLUTION',
    'MEDIUM RESOLUTION',
    'INT CAL FIBRE'
  ]
  const {
    lowResolution,
    mediumResolution,
    highResolution,
    highStability,
    intCalFibre
  } = timeRequestedPerHrsExposure
	
  const datasets = [
    {
      className: 'all-partners',
      data: {
        'HIGH RESOLUTION': highResolution,
        'HIGH STABILITY': highStability,
        'LOW RESOLUTION': lowResolution,
        'MEDIUM RESOLUTION': mediumResolution,
        'INT CAL FIBRE': intCalFibre
      }
    }
  ]
	
  return <Histogram
    keys={ resolutionModes }
    datasets={ datasets }
    xLabel=''
    yLabel='Requested Time (hrs)'
    xTickLabelAttrs={
      {
        transform: 'rotate(-45)',
        'text-anchor': 'end',
        x: -10,
        y: 10
      }
    }
    margin={ {top: 20, bottom: 150, left: 65, right: 20} }
  />
}

HrsModeDistribution.propTypes = {
  timeRequestedPerHrsExposure: PropTypes.object.isRequired
}

export default HrsModeDistribution
