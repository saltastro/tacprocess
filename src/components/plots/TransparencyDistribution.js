import React from 'react';
import PropTypes from 'prop-types';

import Histogram from './Histogram';

/**
 *
 */
export default class TransparencyDistribution extends React.Component {
    observingTime = (transparency, limitToPartner) => {
        const proposals = this.props.proposals.slice(0, 10);
        return proposals
                .filter(p => p.transparency === transparency) // transparency is correct
                .reduce((allTimeRequests, p) => [...allTimeRequests, ...p.requestedTime], []) // collect time requests
                .filter(r => !limitToPartner || r.partner === this.props.partner) // partner is correct
                .filter(r => r.forSemester === this.props.semester) // semester is correct
                .reduce((sum, request) => sum + request.time, 0); // add up all time requests
    };

    render() {
        const proposals = this.props.proposals.slice(0, 10);
        const transparencies = ['Clear', 'Thin cloud', 'Thick Cloud', 'Any'];

        // generate an object of transparencies and observing times
        const observingTimes = (limitToPartner) => {
            return transparencies
                    .reduce((prev, t) =>
                            {
                                return {
                                    ...prev,
                                    [t]: this.observingTime(t, false)
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