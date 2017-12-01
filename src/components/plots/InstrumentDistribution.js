import React from 'react';
import PropTypes from 'prop-types';

import { observingTimeForInstrument } from '../../util';
import Histogram from './Histogram';

const InstrumentDistribution = ({proposals, semester, partner}) => {
    const instruments = ['SCAM', 'RSS', 'HRS', 'BVIT'];

    const observingTimes = (partner) => {
        return instruments
                .reduce((prev, instrument) => {
                    return {
                            ...prev,
                        [instrument]: observingTimeForInstrument(proposals, semester, instrument, {partner}) / 3600
                    };
                }, {});
    };

    const datasets = [
        {
            className: 'all-partners',
            data: observingTimes()
        },
        {
            className: 'partner-only',
            data: observingTimes(partner)
        }
    ];

    return <Histogram
            keys={instruments}
            datasets={datasets}
            xLabel="Instrument"
            yLabel="Requested Time (hrs)"/>
};

InstrumentDistribution.propTypes = {
    proposals: PropTypes.array.isRequired,
    partner: PropTypes.string.isRequired,
    semester: PropTypes.string.isRequired
};

export default InstrumentDistribution;