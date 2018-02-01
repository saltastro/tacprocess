import React from 'react';
import PropTypes from "prop-types";
import { Route }  from "react-router-dom";
import { connect } from "react-redux";

import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import StatisticsPage from "./components/pages/StatisticsPage";
import TechReviewPage from "./components/pages/TechReviewPage";
import TimeAllocationPage from "./components/pages/TimeAllocationPage";
import DocumentationPage from "./components/pages/DocumentationPage";
import AdminPage from "./components/pages/AdminPage";
import UserRoute from "./components/routes/UserRoute";
import GuestRoute from "./components/routes/GuestRoute";
import Navigation from "./components/Navigation";
import Filters from "./components/Filters";

const App = ({ location, isAuthenticated }) => (
	<div className="root-main">
		{isAuthenticated ? (
			<div>
				<Navigation />
			</div>
		
		) : (
			<div>
				<h1 className="login-txt">Please Login</h1>
			</div>
		
		)}
		<div className="Bananas">
			{isAuthenticated ? <Filters /> : <div />}
			<div className="main-div">
				<Route location={location} path="/" exact component={HomePage} />
				<GuestRoute location={location} path="/login" exact component={LoginPage} />
				<UserRoute location={location} path="/statistics" exact component={StatisticsPage} />
				<UserRoute location={location} path="/timeallocation" exact component={TimeAllocationPage} />
				<UserRoute location={location} path="/techreview" exact component={TechReviewPage} />
				<UserRoute location={location} path="/documentation" exact component={DocumentationPage} />
				<UserRoute location={location} path="/admin" exact component={AdminPage} />
			</div>
			<div className="footer">
				<p>Copyright © 2018 TAC</p>
			</div>
		</div>
	</div>
);

App.propTypes = {
	location: PropTypes.shape({
		pathname: PropTypes.string.isRequired
	}).isRequired,
	isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps() { /* state in params */
	return{
		isAuthenticated: !!localStorage.tacPageJWT
	};
}

export default connect(mapStateToProps,null)(App);
