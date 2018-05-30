import React from 'react'
import PropTypes from 'prop-types'

const LoadingOverlay = ({loading, children}) => {
  const style = loading ? {} : {display: 'none'}
  return (
    <div className='loading-overlay' style={ style }>
      {children}
    </div>
  )
}
LoadingOverlay.defaultProps = {
  children: undefined
}
LoadingOverlay.propTypes = {
  loading: PropTypes.bool.isRequired,
  children: PropTypes.string
}
