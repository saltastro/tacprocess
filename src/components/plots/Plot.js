import React from 'react';
import PropTypes from 'prop-types';

import PlotCaption from './PlotCaption';

/**
 * A component for wrapping a plot in a <div> element with class "plot".
 * If the caption property is included, a <PlotCaption> element is added below the plot.
 *
 * The following property is supported:
 *
 * caption: A plot caption, which may contain html markup. (optional)
 */
const Plot = ({caption, children}) =>
{
    return <div  className={"stat-item"}>
        {children}
        <div>{caption && <PlotCaption caption={caption}/>}</div>
    </div>
};

Plot.propTypes = {
    caption: PropTypes.string
};

export default Plot;

