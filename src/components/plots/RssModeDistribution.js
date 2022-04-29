import React from 'react'
import PropTypes from 'prop-types'

import Histogram from './Histogram'

const RssModeDistribution = ({numberOfConfigurationsPerRssObservingMode}) => {
  const modes = [
    'Imaging',
    'Fabry Perot',
    'FP polarimetry',
    'Imaging',
    'MOS',
    'MOS polarimetry',
    'Spectropolarimetry',
    'Spectroscopy'
  ]
  const {
    fabryPerot,
    mos,
    mosPolarimetry,
    fabryPerotPolarimetry,
    spectroscopy,
    spectropolarimetry,
    imaging,
    polarimetricImaging
  } = numberOfConfigurationsPerRssObservingMode

  const datasets = [
    {
      className: 'all-partners',
      data: {
        'Imaging': imaging,
        'Fabry Perot': fabryPerot,
        'FP polarimetry': fabryPerotPolarimetry,
        'polarimetric imaging': polarimetricImaging,
        'MOS': mos,
        'MOS polarimetry': mosPolarimetry,
        'Spectropolarimetry': spectropolarimetry,
        'Spectroscopy': spectroscopy
      }
    }
  ]

  return <Histogram
    keys={ modes }
    datasets={ datasets }
    heading='RSS requested time per Observing Mode'
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
    margin={ {top: 20, bottom: 120, left: 65, right: 20} }
  />
}

RssModeDistribution.propTypes = {
  numberOfConfigurationsPerRssObservingMode: PropTypes.object.isRequired,
}

export default RssModeDistribution
