import React from 'react'
import PropTypes from 'prop-types'

import { observingTimeForInstrument } from '../../util'
import Histogram from './Histogram'

const RssModeDistribution = ({proposals, semester, partner}) => {
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

  const observingTimes = (part) => modes
    .reduce((prev, mode) => ({
      ...prev,
      [ mode ]: observingTimeForInstrument(proposals,
        semester,
        'RSS',
        {
          field: 'mode',
          value: mode,
          partner: part
        }) / 3600
    }), {})

  const datasets = [
    {
      className: 'all-partners',
      data: observingTimes()
    },
    {
      className: 'partner-only',
      data: observingTimes(partner)
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
  proposals: PropTypes.array.isRequired,
  partner: PropTypes.string.isRequired,
  semester: PropTypes.string.isRequired
}

export default RssModeDistribution