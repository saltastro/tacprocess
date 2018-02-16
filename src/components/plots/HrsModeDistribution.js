import React from 'react';
import PropTypes from 'prop-types';

import { observingTimeForInstrument } from '../../util';
import Histogram from './Histogram';

const HrsModeDistribution = ({proposals, semester, partner}) => {
    const exposureModes = [
        'HIGH RESOLUTION',
        'HIGH STABILITY',
        'LOW RESOLUTION',
        'MEDIUM RESOLUTION'
    ];

    const observingTimes = (partner) => {
        return exposureModes
                .reduce((prev, exposureMode) => {
                    return {
                        ...prev,
                        [exposureMode]: observingTimeForInstrument(proposals,
                                                                   semester,
                                                                   'HRS',
                                                                   {
                                                                       field: 'exposureMode',
                                                                       value: exposureMode,
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
            keys={exposureModes}
            datasets={datasets}
            heading={"HRS requested time per Exposure Mode"}
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
            margin={{top: 20, bottom: 150, left: 65, right: 20}}
    />
};

HrsModeDistribution.propTypes = {
    proposals: PropTypes.array.isRequired,
    partner: PropTypes.string.isRequired,
    semester: PropTypes.string.isRequired
};

export default HrsModeDistribution;
