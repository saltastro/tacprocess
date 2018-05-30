import React from 'react'
import PropTypes from 'prop-types'

import { observingTimeForInstrument } from '../../util'
import Histogram from './Histogram'

const InstrumentDistribution = ({proposals, semester, partner}) => {
  const instruments = ['SCAM', 'RSS', 'HRS', 'BVIT']

  const observingTimes = (part) => instruments
    .reduce((prev, instrument) => ({
      ...prev,
      [ instrument ]: observingTimeForInstrument(proposals, semester, instrument, {partner: part}) / 3600
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
    keys={ instruments }
    heading='Requested time per Instrument'
    datasets={ datasets }
    xLabel='Instrument'
    yLabel='Requested Time (hrs)'/>
}

InstrumentDistribution.propTypes = {
  proposals: PropTypes.array.isRequired,
  partner: PropTypes.string.isRequired,
  semester: PropTypes.string.isRequired
}

export default InstrumentDistribution