import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'

const GuestRoute = ({ isAuthenticated, component: Component, ...rest }) => (
  <Route
    { ...rest }
    render={ props =>
      !isAuthenticated ? (
        <Component { ...props } />
      ) : (
        <Redirect to='/' />
      ) }
  />
)

GuestRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
}

export default GuestRoute
