import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

/**
 * A component for displaying a histogram chart.
 *
 * The following properties can be passed to this component.
 *
 * width: The width of the chart, including margins, in pixels. (optional)
 * height: The height of the chart, including margins, in pixels. (optional)
 * margin: The margin around the chart, with properties "top", "bottom", "left" and "right". (optional)
 * keys: The key values for the histogram data. (optional)
 * histogramData: The histogram data, as a dictionary of keys and values.
 * yTicks: Thew preferred number of y axis ticks. (optional)
 * xLabel: The label for the x axis.
 * yLabel: The label for the y axis.
 *
 * If you pass the keys property, it will be used to determine in what order to draw the histogram bars. It needs
 * to be consistent with the keys in the histogram data passed. If no keys property is passed, the order of bars is
 * not defined.
 */
class Histogram extends React.Component {
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

        // access to the x and y value
        const xValue = d => d;
        const yValue = d => this.props.histogramData[d];

        // scales
        const xScale = d3.scaleBand()
                .domain(this.props.keys)
                .range([0, innerWidth])
                .padding(0.3);
        const yTicks = this.props.yTicks || 5;
        const maxY = d3.max(this.props.keys, yValue);
        const yScale = d3.scaleLinear()
                .domain([0, maxY])
                .range([innerHeight, 0])
                .nice(yTicks);

        // axes
        const xAxisBottom = d3.axisBottom()
                .scale(xScale)
                .tickSize(0)
                .tickPadding(10);
        const xAxisTop = d3.axisTop()
                .scale(xScale)
                .tickSize(0)
                .tickFormat('');
        const yAxisLeft = d3.axisLeft()
                .scale(yScale)
                .tickSizeInner(-5)
                .tickSizeOuter(0)
                .tickPadding(10)
                .ticks(yTicks);
        const yAxisRight = d3.axisRight()
                .scale(yScale)
                .tickSizeInner(-5)
                .tickSizeOuter(0)
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
                .text(this.props.xLabel);
        yAxisLeftG.append('text')
                .attr('class', 'label')
                .attr('transform', 'rotate(-90)')
                .attr('x', -innerHeight / 2)
                .attr('y', -50)
                .attr('text-anchor', 'middle')
                .text(this.props.yLabel);

        // plot the data
        g.selectAll('rect')
                .data(this.props.keys)
                .enter()
                .append('rect')
                .attr('class', 'histogram count')
                .attr('x', d => xScale(xValue(d)))
                .attr('y', d => yScale(yValue(d)))
                .attr('width', xScale.bandwidth())
                .attr('height', d => innerHeight - yScale(yValue(d)));
    };

    render() {
        const width = this.props.width || 700;
        const height = this.props.height || 700;
        return (
                <svg
                    width={width}
                    height={height}
                    ref={svg => this.target = svg}
                />
        );
    }
}

Histogram.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    margin: PropTypes.object,
    yTicks: PropTypes.number,
    keys: PropTypes.array.isRequired,
    histogramData: PropTypes.func.isRequired,
    xLabel: PropTypes.string.isRequired,
    yLabel: PropTypes.string.isRequired
};

export default Histogram;
