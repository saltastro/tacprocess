import React from 'react';
import PropTypes from 'prop-types';

import { observingTimeForTransparency } from '../../util';
import Histogram from './Histogram';

/**
 *
 */
const TransparencyDistribution = ({proposals, semester, partner}) => {
    const transparencies = ['Clear', 'Thin cloud', 'Thick Cloud', 'Any'];

    // generate an object of transparencies and observing times
    const observingTimes = (partner) => {
        return transparencies
                .reduce((prev, transparency) =>
                        {
                            return {
                                ...prev,
                                [transparency]: observingTimeForTransparency(proposals,
                                                                             semester,
                                                                             transparency,
                                                                             partner) / 3600
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
            keys={transparencies}
            datasets={datasets}
            xLabel="Transparency"
            yLabel="Requested Time (hrs)"/>
};

TransparencyDistribution.propTypes = {
    proposals: PropTypes.array.isRequired,
    partner: PropTypes.string.isRequired,
    semester: PropTypes.string.isRequired
};

export default TransparencyDistribution;
