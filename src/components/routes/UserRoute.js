import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

const UserRoute = ({ isAuthenticated, component: Component, ...rest }) => {
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

export default UserRoute;
