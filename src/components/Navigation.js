import React from "react";
import { Link } from "react-router-dom"
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as actions from "../actions/auth";

const Navigation = ({ logout }) => (
  <div>
    <ul className="nav">
      <li><Link to="/">Home</Link></li>
      <li><Link to="/tacreview">Tac Review</Link></li>
      <li><Link to="/Statistics">Statistics</Link></li>
      <li><Link to="/documentation">Documentation</Link></li>
      <li className="active"><Link to="/admin">Admin</Link></li>
      <button className="logoutbtn" onClick={logout}> Logout</button>
    </ul>

  </div>

  )
  Navigation.propTypes = {
    logout: PropTypes.func.isRequired
  }

export default connect(null, { logout: actions.logout })(Navigation);
