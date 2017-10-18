import React, { Component } from 'react';
import * as d3Axis from 'd3-axis';
import { select } from 'd3-selection';
import PropTypes from 'prop-types';

/**
 * The Axis component is a D3 axis.
 *
 * The following properties are supported:
 *
 * orientation: string
 *     The plot orientation. This must be 'Top', 'Right', 'Bottom' or 'Left', and corresponds to D3's
 *     axisTop, axisRight, axisBottom and axisLeft functions.
 *
 * scale: scale
 *     The plot scale, which is used as the axis scale. This is a function from the d3-scale package.
 *
 * tickValues: array
 *     An array of tick values. Only these tick values are rendered. This property is optional.
 *
 *  tickFormat: function
 *     A function of a datum and index to use for generating the tick labels. This property is optional, and it is
 *     only used for a left and bottom axis.
 *
 *  transform: string
 *     The transformation to apply to the axis. This will generally be a translation in x or y direction. An example
 *     would be 'translate(100, 100)'.
 */

export default class Axis extends Component {
     componentDidMount() {
         this.renderAxis();
    }

    componentDidUpdate() {
         this.renderAxis();
    }

    renderAxis = () => {
        const node = this.node;

        // Create the axis.
         const axis = d3Axis[`axis${this.props.orientation}`](this.props.scale);
        axis.tickSizeInner(-6);
        axis.tickSizeOuter(0);
        if (this.props.tickValues) {
            axis.tickValues(this.props.tickValues);
        }
        if (this.props.orientation === 'Top' || this.props.orientation === 'Right') {
            axis.tickFormat('');
        } else if (this.props.tickFormat) {
            axis.tickFormat(this.props.tickFormat);
        }
        if (this.props.orientation === 'Bottom') {
            axis.tickPadding(8);
        }
        if (this.props.orientation === 'Left') {
            axis.tickPadding(6);
        }
         select(node).call(axis);
    };

    render() {
        return <g className="axis"
                  ref={el => { this.node = el }}
                  transform={this.props.transform}/>;
    }
}

Axis.propTypes = {
    orientation: PropTypes.string.isRequired,
    scale: PropTypes.func.isRequired,
    tickValues: PropTypes.array,
    tickFormat: PropTypes.func,
    transform: PropTypes.string.isRequired
};

