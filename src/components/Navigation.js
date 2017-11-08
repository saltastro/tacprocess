import React from "react";
import { Link } from "react-router-dom"
import { connect } from "react-redux";
import Select from "react-select";
import * as actions from "../actions/auth";
import { fetchSelectorsData, partnerChange, semesterChange } from "../actions/selectorsActions";



class Navigation extends React.Component {

  componentDidMount() {
    const data = fetchSelectorsData()
    this.props.dispatch(data)
  }

  handleChange(event) {
   // this.props.dispatch(partnerChange(event.target.value));
   console.log("Event:", this.value);
   //console.log("value:", event.target.value);

 }

  render() {
    const { selectors,  } = this.props
    const { selectedPartner, selectedSemester } = selectors

    console.log("Props", this.props );
    console.log("SELECTED", selectedSemester );
    return(
      <div>
        <ul className="nav">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/tacreview">Tac Review</Link></li>
          <li><Link to="/statistics">Statistics</Link></li>
          <li><Link to="/documentation">Documentation</Link></li>
          <li className="active"><Link to="/admin">Admin</Link></li>
          <button className="logoutbtn"
          onClick={() => this.props.dispatch(actions.logout())}> Logout</button>
        </ul>
        <div className="selector-div">
          <div className="left">
            <h2>Semesters</h2>
            <Select
                className ="selector"
                name="Semester"
                options={selectors.payload.semesters}
                value={selectedSemester}
                focusedOption={selectedSemester}
                onChange={(event) => {
                  this.props.dispatch(semesterChange(event.value))
                }}
                />
            </div>
            <div className="left-2">
              <h2> Partners </h2>
              <Select
                  className ="selector"
                  name="Partner"
                  options={selectors.payload.partners}
                  value={selectedPartner}
                  onChange={(event) => {
                    this.props.dispatch(partnerChange(event.value))
                  }}
                  />
          </div>
        </div>
      </div>
      );
    }
  }

export default connect(
  store => ({selectors: store.selectors, }), null
)(Navigation);
