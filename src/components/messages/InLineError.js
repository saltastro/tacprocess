import React from 'react'
import propTypes  from 'prop-types'

const InLineError = ({ text }) => (
  <div className='inLineError'>
    <span>{text}</span>
  </div>
)

InLineError.propTypes = {
  text: propTypes.string.isRequired
}

export default InLineError
