import React from 'react';
import PropTypes from 'prop-types';
import { histogram, max, range } from 'd3-array';
import { scaleLinear } from 'd3-scale';

import Axes from './axes';

/**
 * The TotalTimeDistribution is a histogram showing the number of proposals for bins of requested time for a partner.
 * The requested time is binned in bins of 10 hours each. Bins are shown from 0 to 100 hours.
 *
 * The following properties are supported:
 *
 * proposals:
 *     The array of proposals. Each proposal must have a timeRequests property, which is an array of time requests. Each
 *     of these time requests must have a partner and a time property. Times are given in seconds. For example:
 *
 *     const proposals = [
 *         {
 *             timeRequests: [
 *                 {
 *                     partner: AMNH,
 *                     time: 3.7
 *                 },
 *                 {
 *                     partner: RSA,
 *                     time: 5
 *                 }
 *             ]
 *         },
 *         {
 *             timeRequests: [
 *                 {
 *                     partner: AMNH,
 *                     time: 54.57
 *                 },
 *             ]
 *         }
 *     ]
 *
 * partner:
 *     The partner whose proposals are considered. This must be one of the partners defined in ../api/partners.js.
 *
 * width:
 *     The width of the plot, as a number.
 *
 * height:
 *     The height of the plot, as a number.
 *
 * margins:
 *     The plot margins around the axes, as an object with a top, right, bottom and left property.
 */

const defaultMargins = {
    top: 10,
    right: 10,
    bottom: 50,
    left: 50
};

const TotalTimeDistribution = ({proposals, partner, width, height, margins=defaultMargins}) => {
    const timeRequest = (proposal, partner) =>proposal.timeRequests.find(t => t.partner.code === partner.code);

    const requestedHours = proposals
            .filter(proposal => partner.requestsTimeFor(proposal))
            .reduce(
                    (a, proposal) => {
                        const req = timeRequest(proposal, partner);
                        return req ? [...a, req.time] : a
                    },
                    []
            )
            .map(t => t / 3600);

    const domain = [0, 100];

    const histogramChart = histogram();
    histogramChart
            .domain(domain)
            .thresholds(range(0, 100, 10))
            .value(d => d);
    const histogramData = histogramChart(requestedHours);

    const yRange = [0, Math.round(max(histogramData, d => d.length))];

    const xScale = scaleLinear()
            .domain(domain)
            .range([margins.left, width - margins.right]);
    const yScale = scaleLinear()
            .domain(yRange)
            .range([height - margins.bottom, margins.top]);

    return (
            <g className="histogram total-time-distribution">
                <Axes width={width}
                      height={height}
                      margins={margins}
                      domain={domain}
                      range={yRange}
                      xAxisTitle="Time (hrs)"
                      yAxisTitle="N"/>
                {histogramData.map((d, i) => (
                        <rect key={i}
                              x={xScale(d.x0)}
                              y={yScale(d.length)}
                              width={xScale(d.x1 - d.x0)}
                              height={height - margins.bottom - yScale(d.length)}/>
                ))}
            </g>
    );
};

TotalTimeDistribution.propTypes = {
    height: PropTypes.number.isRequired,
    margins: PropTypes.object,
    partner: PropTypes.object.isRequired,
    proposals: PropTypes.array.isRequired,
    width: PropTypes.number.isRequired
};

export default TotalTimeDistribution;

