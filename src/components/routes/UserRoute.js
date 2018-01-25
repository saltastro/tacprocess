import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import {loadedPage} from "../../util/filters"
import { pageChange } from "../../actions/filtersActions"

const UserRoute = ({ isAuthenticated, component: Component, ...rest }) => {
  rest.dispatch(pageChange(loadedPage(rest.location.pathname)))

  return(
  <Route
    { ...rest }
    render={ props =>
      isAuthenticated ? <Component { ...props } /> : <Redirect to="/login" /> }
  />
)};

UserRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated:  PropTypes.bool.isRequired
};

function mapStateToProps() {/* state on params */
  return {
    // isAuthenticated: !!state.user.token
    /* TODO: some I lose my state for now I will be checking for a localStorage
    tacPageJWT at UserRoute and GuestRoute to confirm if the user had logged in
    or not */
    isAuthenticated: !!localStorage.tacPageJWT
  };
}

export default connect(mapStateToProps)(UserRoute);
