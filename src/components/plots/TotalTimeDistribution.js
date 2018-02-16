import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

import { proposalObservingTime } from '../../util';

/**
 * A component for displaying a histogram with the distribution of the total requested time.
 *
 * The following properties can be passed to this component.
 *
 * width: The width of the chart, including margins, in pixels. (optional)
 * height: The height of the chart, including margins, in pixels. (optional)
 * margin: The margin around the chart, with properties "top", "bottom", "left" and "right". (optional)
 * proposals: The list of proposals.
 *
 * The histogram contains bars for the time requested from all partners and for the time requested from a partner.
 * Their CSS classes are "total time" and "partner time".
 */
class TotalTimeDistribution extends React.Component {
    componentDidMount() {
        this.createPlot();
    }

    componentDidUpdate() {
        this.createPlot();
    }

    createPlot = () => {
        const svg = d3.select(this.target);

        // remove any existing plot content
        svg.selectAll('*').remove();

        // set up the geometry, using the margin pattern
        const width = svg.attr('width');
        const height = svg.attr('height');
        const margin = this.props.margin || {
            top: 20,
            bottom: 60,
            left: 65,
            right: 20
        };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;
        const g = svg.append('g')
                .attr('transform', `translate(${margin.left}, ${margin.top})`);

        // prepare the plot data
        const maxHours = 100;
        const binnedHours = 2;
        const thresholds = d3.range(0, maxHours + 1, binnedHours);
        const totalHoursHistogram = d3.histogram()
                .domain([0, maxHours])
                .value(proposal => proposalObservingTime(proposal, this.props.semester, this.props.partner) / 3600)
                .thresholds(thresholds);
        const totalHoursData = totalHoursHistogram(this.props.proposals);
        const partnerHoursHistogram = d3.histogram()
                .domain([0, maxHours])
                .value(proposal => proposalObservingTime(proposal, this.props.semester) / 3600)
                .thresholds(thresholds);
        const partnerHoursData = partnerHoursHistogram(this.props.proposals);

        // scales
        const xTicks = 6;
        const yTicks = 6;
        const maxCount = d3.max([...totalHoursData, ...partnerHoursData], d => d.length);
        const xScale = d3.scaleLinear()
                .domain([0, maxHours])
                .range([0, innerWidth])
                .nice(xTicks);
        const yScale = d3.scaleLinear()
                .domain([0, maxCount])
                .range([innerHeight, 0])
                .nice(yTicks);

        // axes
        const tickPadding = 10;
        const tickSizeInner = -5;
        const xAxisBottom = d3.axisBottom()
                .scale(xScale)
                .ticks(xTicks)
                .tickSizeInner(tickSizeInner)
                .tickSizeOuter(0)
                .tickPadding(tickPadding);
        const xAxisTop = d3.axisTop()
                .scale(xScale)
                .ticks(xTicks)
                .tickSizeInner(tickSizeInner)
                .tickSizeOuter(0)
                .tickPadding(tickPadding)
                .tickFormat('');
        const yAxisLeft = d3.axisLeft()
                .scale(yScale)
                .ticks(yTicks)
                .tickSizeInner(tickSizeInner)
                .tickSizeOuter(0)
                .tickPadding(tickPadding);
        const yAxisRight = d3.axisRight()
                .scale(yScale)
                .ticks(yTicks)
                .tickSizeInner(tickSizeInner)
                .tickSizeOuter(0)
                .tickPadding(tickPadding)
                .tickFormat('');

        // draw axes
        const xAxisBottomG = g.append('g')
                .attr('class', 'axis')
                .attr('transform', `translate(0, ${innerHeight})`);
        xAxisBottomG.call(xAxisBottom);
        const xAxisTopG = g.append('g')
                .attr('class', 'axis');
        xAxisTopG.call(xAxisTop);
        const yAxisLeftG = g.append('g')
                .attr('class', 'axis');
        yAxisLeftG.call(yAxisLeft);
        const yAxisRightG = g.append('g')
                .attr('class', 'axis')
                .attr('transform', `translate(${innerWidth}, 0)`);
        yAxisRightG.call(yAxisRight);

        // add axis labels
        xAxisBottomG.append('text')
                .attr('class', 'label')
                .attr('x', innerWidth / 2)
                .attr('y', 50)
                .text('Time (hrs)');
        yAxisLeftG.append('text')
                .attr('class', 'label')
                .attr('transform', 'rotate(-90)')
                .attr('x', -innerHeight / 2)
                .attr('y', -50)
                .attr('text-anchor', 'middle')
                .text('N');

        // plot total times
        const data = {
            'all-partners': totalHoursData,
            'partner-only': partnerHoursData
        };
        ['partner-only','all-partners' ].forEach(key => {
            g.append('g')
                    .classed(key, true)
                    .classed('time', true)
                    .selectAll(`rect`)
                    .data(data[key])
                    .enter()
                    .append('rect')
                    .style("opacity", .6)
                    .style('fill', key === 'partner-only' ? "green" : "purple")
                    .attr('x', d => xScale(d.x0))
                    .attr('y', d => yScale(d.length))
                    .attr('width', d => xScale(d.x1) - xScale(d.x0))
                    .attr('height', d => innerHeight - yScale(d.length));
        });
	
	    const legend = svg.append("g")
	    .attr("class", "legend")
	    .attr("x", 620)
	    .attr("y", 25)
	    .attr("height", 100)
	    .attr("width", 100);
	
	
	    [{color: "green", text: 'partner-only'}, {color: "purple", text: 'all-partners'}]
	    .forEach( (t, i) => {
		    console.log(t);
		    legend.append("rect")
		    .attr("x", 570)
		    .attr("y", 35 + 18*i)
		    .attr("width", 10)
		    .attr("height", 10)
		    .style("opacity", .6)
		    .style("fill", t.color);
		    legend.append("text")
		    .attr("x", 590)
		    .attr("y", 45 + 18*i)
		    .attr("width", 10)
		    .attr("height", 10)
		    .style("fill", "black")
		    .text(t.text);
	    });
    };

    render() {
        const width = this.props.width || 700;
        const height = this.props.height || 700;
        return (
            <div className={"stat-item"}>
	            <h2>Number of proposals vs Requested time</h2>
                <svg
                    className={"plot"}
                    width={width}
                    height={height}
                    ref={(svg) => this.target = svg}
                />
            </div>
        );
    }
}

TotalTimeDistribution.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    margin: PropTypes.object,
    proposals: PropTypes.array.isRequired,
    semester: PropTypes.string.isRequired,
    partner: PropTypes.string.isRequired
};

export default TotalTimeDistribution;
