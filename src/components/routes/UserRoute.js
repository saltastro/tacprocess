import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'

const UserRoute = ({ isAuthenticated, component: Component, ...rest }) => {
  if ( !isAuthenticated ) return <Redirect to='/login' />
  return(
    <Route
      { ...rest }
      render={ props => <Component { ...props } /> }
    />
  )}

UserRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated:  PropTypes.bool.isRequired
}

export default UserRoute
