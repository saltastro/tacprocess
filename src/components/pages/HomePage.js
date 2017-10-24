import React from "react";
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions/auth";
import Navigation from "../Navigation"
import InfoMessage from "../messages/InfoMessage"
import Selector from "../selectors/Selector";

const semesters = [
    '2015-1',
    '2015-2',
    '2016-1',
    '2016-2',
    '2017-1',
    '2017-2',
    '2018-1',
    '2018-2',
];

const HomePage = ({ isAuthenticated }) => (
  <div>

    {isAuthenticated ? (
      <div>
        <Navigation />
        <Selector options={semesters} name="Semester"/>
        <InfoMessage page="Home Page"/>
      </div>

    ) : (
      <div>
        <h1>Home Page</h1>
        <Link to="/login"> <button className="loginbtn">Login</button> </Link>
      </div>

    )}
  </div>
);

HomePage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
}

function mapStateToProps() { /* state in params */
  return{
    isAuthenticated: !!localStorage.tacPageJWT
  };
}

export default connect(mapStateToProps, { logout: actions.logout })(HomePage);
