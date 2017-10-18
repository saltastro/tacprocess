import React from 'react';
import PropTypes from 'prop-types';
import { range as d3Range } from 'd3-array';
import { scaleLinear } from 'd3-scale';

import Axes from './axes';

/**
 * CategoryAxisHistogram is a histogram chart whose x axis an axis for a discrete set of categories.
 *
 * The following properties are supported:
 *
 * categoryDataSets: array
 *     An array of category data sets. Each array item is an object of the form { data, className } with data being an
 *     array of objects with category and value and className being the class name to add to the bars for the set.
 *
 * categories: array
 *     The array of categories to display. They will be rendered in the same order as they appear in the array.
 *
 * range: array of two numbers
 *     The range, i.e. the minimum and maximum y axis numbers.
 *
 * xTitle: string
 *     The title for the x axis. This is optional.
 *
 * yTitle: string
 *     The title for the y axisa. This is optional.
 *
 * width: number
 *     The width of the chart (including margins).
 *
 * height: number
 *     The height of the chart (including numbers).
 *
 * margins: object
 *     The plot margins around the axes, as an object with a top, right, bottom and left property. Default margins are
 *     used if this property isn't included.
 */

const defaultMargins = {
    top: 10,
    right: 10,
    bottom: 50,
    left: 50
};

const NumberAxisHistogram = ({categoryDataSets, categories, range, xTitle='', yTitle='', width, height, margins=defaultMargins}) => {
    const domain = [0, categories.length];

    const xScale = scaleLinear()
            .domain(domain)
            .range([margins.left, width - margins.right]);
    const yScale = scaleLinear()
            .domain(range)
            .range([height - margins.bottom, margins.top]);

    return (
            <g className="histogram">
                <Axes width={width}
                      height={height}
                      margins={margins}
                      domain={domain}
                      range={range}
                      xTickValues={d3Range(categories.length).map(d => d + 0.5)}
                      xTickFormat={(d, i) => categories[i]}
                      xAxisTitle={xTitle}
                      yAxisTitle={yTitle}/>
                {categoryDataSets.map((categoryDataSet) => {
                    return categories.map((category, i) => {
                        const categoryValue = categoryDataSet.data.find((d) => d.category === category);
                        return categoryValue ? (
                            <rect key={i}
                                  className={categoryDataSet.className}
                                  x={xScale(i + 0.1)}
                                  y={yScale(categoryValue.value)}
                                  width={xScale(i + 0.9) - xScale(i + 0.1)}
                                  height={height - margins.bottom - yScale(categoryValue.value)}/>
                        ) : (null)}
                    )})}
            </g>
    );
};

NumberAxisHistogram.propTypes = {
    categoryDataSets: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired,
    range: PropTypes.array.isRequired,
    xTitle: PropTypes.string,
    yTitle: PropTypes.string,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    margins: PropTypes.object
};

export default NumberAxisHistogram;
