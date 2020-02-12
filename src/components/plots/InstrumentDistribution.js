import React from 'react'
import PropTypes from 'prop-types'

import Histogram from './Histogram'

const InstrumentDistribution = ({timeRequestedPerInstrument}) => {
  const instruments = ['SCAM', 'RSS', 'HRS', 'BVIT']
  const {salticam, rss, hrs, bvit} = timeRequestedPerInstrument

  const datasets = [
    {
      className: 'all-partners',
      data: {
        'SCAM': salticam,
        'RSS': rss,
        'HRS': hrs,
        'BVIT': bvit

      }
    }
  ]

  return <Histogram
    keys={ instruments }
    heading='Requested time per Instrument'
    datasets={ datasets }
    xLabel='Instrument'
    yLabel='Requested Time (hrs)'/>
}

InstrumentDistribution.propTypes = {
  timeRequestedPerInstrument: PropTypes.object.isRequired,
}

export default InstrumentDistribution