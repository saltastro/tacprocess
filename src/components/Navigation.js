import React from "react";
import { Link } from "react-router-dom"
import { connect } from "react-redux";
import Select from "react-select";
import * as actions from "../actions/auth";
import { fetchSelectorsData, partnerChange, semesterChange } from "../actions/selectorsActions";
import { fetchStatData } from "../actions/statisticsActions";



class Navigation extends React.Component {

  componentDidMount() {
    const data = fetchSelectorsData()
    this.props.dispatch(data)

    this.props.dispatch(fetchStatData("2017-2", "RSA"))

  }
  updateSemester(event){
    console.log("NAVI: ", event);
    this.props.dispatch(fetchStatData(event.value, this.props.selectors.selectedPartner))
  }
  updatePartner(event){
    console.log("NAVI: ", this.props);
    this.props.dispatch(fetchStatData(this.props.selectors.selectedSemester , event.value))
  }

  render() {
    const { selectors,  } = this.props
    const { selectedPartner, selectedSemester } = selectors

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
                clearable={false}
                focusedOption={selectedSemester}
                onChange={(event) => {
                  this.updateSemester(event)
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
                  clearable={false}
                  onChange={(event) => {
                    this.updatePartner(event)
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
  store => ({selectors: store.selectors, statistics:store.statistics }), null
)(Navigation);
