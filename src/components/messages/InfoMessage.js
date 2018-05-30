import React from 'react'
import propTypes from 'prop-types'

const InfoMessage = ({ page }) => (
  <div>
    <h2><strong>Info!</strong> <br />{ page } Page will be placed here.</h2>
  </div>
)

InfoMessage.propTypes = {
  page: propTypes.string.isRequired
}

export default InfoMessage
