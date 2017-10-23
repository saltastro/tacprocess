import React from 'react';
import PropTypes from "prop-types";
import { Route }  from "react-router-dom";

import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import StatisticsPage from "./components/pages/StatisticsPage";
import TacReviewPage from "./components/pages/TacReviewPage";
import DocumentationPage from "./components/pages/DocumentationPage";
import AdminPage from "./components/pages/AdminPage";
import UserRoute from "./components/routes/UserRoute";
import GuestRoute from "./components/routes/GuestRoute";

const App = ({ location }) => (
  <div className="ui container">
    <Route location={location} path="/" exact component={HomePage} />
    <GuestRoute location={location} path="/login" exact component={LoginPage} />
    <Route location={location} path="/statistics" exact component={StatisticsPage} />
    <Route location={location} path="/tacreview" exact component={TacReviewPage} />
    <Route location={location} path="/documentation" exact component={DocumentationPage} />
    <Route location={location} path="/admin" exact component={AdminPage} />
  </div>
);

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
}

export default App;
