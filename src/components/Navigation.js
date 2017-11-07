import React from "react";
import { Link } from "react-router-dom"
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as actions from "../actions/auth";
// import Selector from "./selectors/Selector";

// const semesters = [
//     '2015-1',
//     '2015-2',
//     '2016-1',
//     '2016-2',
//     '2017-1',
//     '2017-2',
//     '2018-1',
//     '2018-2',
// ];

const Navigation = ({ logout }) => (
  <div>
    <ul className="nav">
      <li><Link to="/">Home</Link></li>
      <li><Link to="/tacreview">Tac Review</Link></li>
      <li><Link to="/statistics">Statistics</Link></li>
      <li><Link to="/documentation">Documentation</Link></li>
      <li className="active"><Link to="/admin">Admin</Link></li>
      <button className="logoutbtn" onClick={logout}> Logout</button>
    </ul>
     {/* <Selector key={1} options={semesters} name="Semester"/> */ }
  </div>

  )
  Navigation.propTypes = {
    logout: PropTypes.func.isRequired
  }

export default connect(null, { logout: actions.logout })(Navigation);
