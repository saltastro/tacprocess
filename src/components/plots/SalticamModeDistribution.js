import React from 'react'
import PropTypes from 'prop-types'

import Histogram from './Histogram'

const SalticamModeDistribution = ({timeRequestedPerSalticamDetector}) => {
  const detectorModes = [
    'DRIFTSCAN',
    'FRAME XFER',
    'NORMAL',
    'SLOT'
  ]
  const {
    driftScan,
    frameTransfer,
    normal,
    slotMode
  } = timeRequestedPerSalticamDetector

  const datasets = [
    {
      className: 'all-partners',
      data: {
        'DRIFTSCAN': driftScan,
        'FRAME XFER': frameTransfer,
        'NORMAL': normal,
        'SLOT': slotMode
      }
    }
  ]
	
  return <Histogram
    keys={ detectorModes }
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
    margin={ {top: 20, bottom: 100, left: 65, right: 20} }
  />
}

SalticamModeDistribution.propTypes = {
  timeRequestedPerSalticamDetector: PropTypes.object.isRequired
}

export default SalticamModeDistribution