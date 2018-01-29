import React from 'react';
import PropTypes from 'prop-types';

const LoadingOverlay = ({loading, children}) => {
    const style = loading ? {} : {display: 'none'};
    return (
            <div className="loading-overlay" style={style}>
                {children}
            </div>
    );
};

LoadingOverlay.propTypes = {
    loading: PropTypes.bool.isRequired()
};
