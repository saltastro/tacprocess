import React from "react";
import { Link } from "react-router-dom"
import { connect } from "react-redux";
import Select from "react-select";
import * as actions from "../actions/auth";
import { partnerChange, semesterChange, storeFilters } from "../actions/filtersActions";
import { fetchStatData } from "../actions/statisticsActions";
import  fetchTargets  from "../actions/targetsActions";
import { storePartnerAllocations  } from "../actions/timeAllocationActions";
import { userPartners, semesterFilter } from "../util/filters";



class Navigation extends React.Component {

  componentDidMount() {
    const selected = this.props.filters

    const semesters = semesterFilter()
    const partners = userPartners()
    const fills = storeFilters(semesters, partners)

    this.props.dispatch(fills)

    const user = actions.fetchUserData()
    this.props.dispatch(user)

    this.props.dispatch(fetchStatData(
      selected.selectedSemester,
      selected.selectedPartner
    ))
    this.props.dispatch(
      fetchTargets(
      selected.selectedSemester,
      selected.selectedPartner
    ))

    this.props.dispatch(storePartnerAllocations(
      selected.selectedSemester,
      selected.selectedPartner
    ))

  }
  updateSemester(event){
    this.props.dispatch(fetchStatData(event.value, this.props.filters.selectedPartner))
    this.props.dispatch(storePartnerAllocations(event.value, this.props.filters.selectedPartner))
  }
  updatePartner(event){
    this.props.dispatch(fetchStatData(this.props.filters.selectedSemester , event.value))
    this.props.dispatch(storePartnerAllocations(this.props.filters.selectedSemester , event.value))
  }

  render() {
    const { filters, user  } = this.props
    const { selectedPartner, selectedSemester } = filters
    const partnerList = userPartners(user)
    const sems = semesterFilter()

    return(
      <div>
        <ul className="nav">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/tacreview">Tac Review</Link></li>
          <li><Link to="/statistics">Statistics</Link></li>
          <li><Link to="/timeallocation">Time Allocation</Link></li>
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
                options={sems}
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
                  options={partnerList}
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
  store => ({filters: store.filters, statistics:store.statistics, user:store.user }), null
)(Navigation);
