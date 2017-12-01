import React from 'react';
import PropTypes from 'prop-types';

import { observingTimeForInstrument } from '../../util';
import Histogram from './Histogram';

const RssModeDistributionPlot = ({proposals, semester, partner}) => {
    const detectorModes = [
            'DRIFT SCAN',
            'FRAME XFER',
            'NORMAL',
            'SLOT'
    ];

    const observingTimes = (partner) => {
        return detectorModes
                .reduce((prev, detectorMode) => {
                    return {
                        ...prev,
                        [detectorMode]: observingTimeForInstrument(proposals,
                                                                   semester,
                                                                   'SCAM',
                                                                   {
                                                                       field: 'dictatorMode',
                                                                       value: detectorMode,
                                                                       partner
                                                                   }) / 3600
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
            keys={detectorModes}
            datasets={datasets}
            xLabel=""
            yLabel="Requested Time (hrs)"
            xTickLabelAttrs={
                {
                    transform: 'rotate(-45)',
                    'text-anchor': 'end',
                    x: -10,
                    y: 10
                }
            }
            margin={{top: 20, bottom: 100, left: 65, right: 20}}
    />
};

RssModeDistributionPlot.propTypes = {
    proposals: PropTypes.array.isRequired,
    partner: PropTypes.string.isRequired,
    semester: PropTypes.string.isRequired
};

export default RssModeDistributionPlot;