import React from 'react';
import PropTypes from 'prop-types';

/**
 * A component containing a plot caption. The caption may contain html.
 *
 * The following property is supported:
 *
 * caption: Text of the caption. (required)
 */
const PlotCaption = ({caption}) => (
        <div className="plot-caption"
             dangerouslySetInnerHTML={{__html: caption}}
        />
);

PlotCaption.propTypes = {
    caption: PropTypes.string.isRequired
};

export default PlotCaption;
