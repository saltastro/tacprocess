import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

/**
 * A component for displaying a scatter plot with a target distribution.
 *
 * The following properties can be passed to this component.
 *
 * width: The width of the chart, including margins, in pixels. (optional)
 * height: The height of the chart, including margins, in pixels. (optional)
 * margin: The margin around the chart, with properties "top", "bottom", "left" and "right". (optional)
 * targets: The list of targets. Each target must have a property "ra" (with the right ascension in degrees),
 *          a property "dec" (with the declination in degrees) and a property "optional" (which is true for
 *          optional targets).
 *
 * Mandatory targets are represented by squares with a CSS class "mandatory target"; optional targets are
 * represented by circles with a CSS class "optional target".
 */
class TargetDistributionScatterPlot extends React.Component {
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

        // scales
        const xTicks = 5;
        const yTicks = 10;
        const xScale = d3.scaleLinear()
                .domain([0, 24])
                .range([0, innerWidth]);
        const yScale = d3.scaleLinear()
                .domain([-80, 12])
                .range([innerHeight, 0]);

        // axes
        const tickPadding = 10;
        const tickSizeInner = -5;
        const xAxisBottom = d3.axisBottom()
                .scale(xScale)
                .tickSizeInner(tickSizeInner)
                .tickSizeOuter(0)
                .tickPadding(tickPadding)
                .ticks(xTicks);
        const xAxisTop = d3.axisTop()
                .scale(xScale)
                .tickSizeInner(tickSizeInner)
                .tickSizeOuter(0)
                .tickPadding(tickPadding)
                .ticks(xTicks)
                .tickFormat('');
        const yAxisLeft = d3.axisLeft()
                .scale(yScale)
                .tickSizeInner(tickSizeInner)
                .tickSizeOuter(0)
                .tickPadding(tickPadding)
                .ticks(yTicks);
        const yAxisRight = d3.axisRight()
                .scale(yScale)
                .tickSizeInner(tickSizeInner)
                .tickSizeOuter(0)
                .tickPadding(tickPadding)
                .ticks(yTicks)
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
                .text('RA');
        yAxisLeftG.append('text')
                .attr('class', 'label')
                .attr('transform', 'rotate(-90)')
                .attr('x', -innerHeight / 2)
                .attr('y', -50)
                .attr('text-anchor', 'middle')
                .text('DEC');

        // plot mandatory targets
        const targets = this.props.targets;
        const mandatoryTargets = targets.filter(target => !target.optional);
        const squareWidth = 5;
        g.selectAll('rect')
                .data(mandatoryTargets)
                .enter()
                .append('rect')
                .attr('class', 'mandatory target')
                .attr('x', d => xScale(d.ra) - squareWidth / 2)
                .attr('y', d => yScale(d.dec) - squareWidth / 2)
                .attr('width', squareWidth)
                .attr('height', squareWidth);

        // plot optional targets
        const circleRadius = squareWidth / 2;
        const optionalTargets = targets.filter(target => target.optional);
        g.selectAll('circle')
                .data(optionalTargets)
                .enter()
                .append('circle')
                .attr('class', 'optional target')
                .attr('cx', d => xScale(d.ra))
                .attr('cy', d => yScale(d.dec))
                .attr('r', circleRadius);
    };

    render() {
        const width = this.props.width || 800;
        const height = this.props.height || 500;
        return (
                <svg
                    width={width}
                    height={height}
                    ref={svg => this.target = svg}
                />
        );
    }
}

TargetDistributionScatterPlot.propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    margin: PropTypes.object,
    targets: PropTypes.array.isRequired
};

export default TargetDistributionScatterPlot;
