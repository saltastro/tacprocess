import React from 'react';
import PropTypes from 'prop-types';

import { observingTimeForTransparency } from '../../util';
import Histogram from './Histogram';

/**
 *
 */
export default class TransparencyDistribution extends React.Component {
    render() {
        const transparencies = ['Clear', 'Thin cloud', 'Thick Cloud', 'Any'];

        // generate an object of transparencies and observing times
        const observingTimes = (partner) => {
            return transparencies
                    .reduce((prev, transparency) =>
                            {
                                return {
                                    ...prev,
                                    [transparency]: observingTimeForTransparency(this.props.proposals,
                                                                                 this.props.semester,
                                                                                 transparency,
                                                                                 partner)
                                };
                            }, {});
        };

        const datasets = [
            {
                className: 'all-partners',
                data: observingTimes(false)
            },
            {
                className: 'partner-only',
                data: observingTimes(true)
            }
        ];
        console.log(datasets);

        return <Histogram
                keys={transparencies}
                datasets={datasets}
                xLabel="Transparency"
                yLabel="Requested Time"/>

    }
}

TransparencyDistribution.propTypes = {
    proposals: PropTypes.array.isRequired,
    partner: PropTypes.string.isRequired,
    semester: PropTypes.string.isRequired
};