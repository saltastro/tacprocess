import React from "react";
import { Link } from "react-router-dom"
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as actions from "../actions/auth";
import { fetchSelectorsData } from "../actions/selectorsActions";
import Selector from "./selectors/Selector";

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


class Navigation extends React.Component {
  state = {};
  // TODO
  // componentDidMount() {
  //   const data = fetchSelectorsData()
  //   this.props.dispatch(data)
  // }

  render() {
    const { selectors } = this.props
    return(
      <div>
        <ul className="nav">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/tacreview">Tac Review</Link></li>
          <li><Link to="/statistics">Statistics</Link></li>
          <li><Link to="/documentation">Documentation</Link></li>
          <li className="active"><Link to="/admin">Admin</Link></li>
          <button className="logoutbtn" onClick={this.props.logout}> Logout</button>
        </ul>
          <span className="left">
            <Selector
                name="Semester"
                options={["a","b","c","d"]} />
          </span>
          <span className="left">
            <Selector
                name="Partners"
                options={["a","b","c","d"]} />
                { /* options=  selectors.payload.partners} /> */ }
          </span>
      </div>
      );
    }
  }


  Navigation.propTypes = {
    logout: PropTypes.func.isRequired
  }
// TODO
// export default connect(
//   store => ({selectors: store.selectors, logout: actions.logout}),null
// )(Navigation);

export default connect(null, { logout: actions.logout })(Navigation);
