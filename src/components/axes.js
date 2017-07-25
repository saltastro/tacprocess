import React from 'react';
import PropTypes from 'prop-types';
import { scaleLinear } from 'd3-scale';

import Axis from './axis';

/**
 * The Axes component includes four axes (top, right, bottom and left). All axes have ticks, but only the bottom and
 * left axis have tick labels and an (optional) title.
 *
 * The following properties are supported:
 *
 * xDomain:
 *     The domain of x values. This is an array of two numbers.
 *
 * yDomain:
 *     The domain of y values. This is an array of two numbers.
 *
 * width:
 *     The width of the plot (including margins).
 *
 * height:
 *     The height of the plot (including margins).
 *
 * margins:
 *     The margins around the axes. This is an object with keys top, right, bottom and left.
 *
 * xTickValues:
 *     The array of tick values to use for the x axis. This is optional.
 *
 * yTickValues:
 *     The array of tick values to use for the x axis. This is optional.
 *
 * xAxisTitle:
 *     The title for the x axis. This is optional.
 *
 * yAxisTitle:
 *     The title for the y axis. This is optional.
 */

const Title = ({title, x, y, className='', rotationAngle=0}) =>
        <text x={x}
              y={y}
              transform={`rotate(${rotationAngle}, ${x}, ${y})`}
              textAnchor="middle"
              className={className}>
            {title}
        </text>;

Title.propTypes = {
    title: PropTypes.string.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    rotationAngle: PropTypes.number
};

const Axes = ({xDomain, yDomain, width, height, margins, xTickValues=null, yTickValues=null, xAxisTitle='', yAxisTitle=''}) => {
    // scales
    const xScale = scaleLinear().domain(xDomain).range([0, width - margins.left - margins.right]);
    const yScale = scaleLinear().domain(yDomain).range([height - margins.top - margins.bottom, 0]);

    // axis positions
    const transformTop = `translate(${margins.left}, ${margins.top})`;
    const transformRight = `translate(${margins.left}, ${margins.top})`;
    const transformBottom = `translate(${margins.left}, ${height - margins.bottom})`;
    const transformLeft = `translate(${width - margins.right}, ${margins.top})`;

    // distance between title and border
    const xAxisTitlePadding = 10;
    const yAxisTitlePadding = 20;

    // Note that the orientation of the right axis is *left*, and that of the left axis is *right*.
    return (
            <g className="axes">
                <Axis orientation="Top" scale={xScale} tickValues={xTickValues} transform={transformTop}/>
                <Axis orientation="Left" scale={yScale} tickValues={yTickValues} transform={transformRight}/>
                <Axis orientation="Bottom" scale={xScale} tickValues={xTickValues} transform={transformBottom}/>
                <Axis orientation="Right" scale={yScale} tickValues={yTickValues} transform={transformLeft}/>
                {xAxisTitle &&
                <Title title={xAxisTitle}
                       x={margins.left + (width - margins.left - margins.right) / 2}
                       y={height - xAxisTitlePadding}
                       className="x axis title"/>}
                {yAxisTitle &&
                <Title title={yAxisTitle}
                       x={yAxisTitlePadding}
                       y={margins.top + (height - margins.top - margins.bottom) / 2}
                       rotationAngle={-90}
                       className="y axis title"/>}
            </g>
    );
};

Axes.propTypes = {
    height: PropTypes.number.isRequired,
    margins: PropTypes.object.isRequired,
    width: PropTypes.number.isRequired,
    xDomain: PropTypes.array.isRequired,
    xTickValues: PropTypes.array,
    xTitle: PropTypes.string,
    yDomain: PropTypes.array.isRequired,
    yTickValues: PropTypes.array,
    yTitle: PropTypes.string,
};

export default Axes;
