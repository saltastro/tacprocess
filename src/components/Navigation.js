import React from "react";
import { Link } from "react-router-dom"
import { connect } from "react-redux";
import * as actions from "../actions/auth";
import { fetchStatData } from "../actions/statisticsActions";
import  fetchProposals  from "../actions/proposalsActions";
import  fetchTargets  from "../actions/targetsActions";
import { storePartnerAllocations  } from "../actions/timeAllocationActions";
import {
    HOME_PAGE,
    STATISTICS_PAGE,
    DOCUMENTATION_PAGE,
    TECHNICAL_PAGE,
    TAC_PAGE,
    ADMIN_PAGE
 } from "../types"

class Navigation extends React.Component {

  componentDidMount() {
    const selected = this.props.filters
    const {dispatch } = this.props

    dispatch(actions.fetchUserData())

    dispatch(fetchStatData(
      selected.selectedSemester,
      selected.selectedPartner
    ))
    dispatch(
      fetchTargets(
      selected.selectedSemester,
      selected.selectedPartner
    ))
    dispatch(
      fetchProposals(
      selected.selectedSemester,
      selected.selectedPartner
    ))

    dispatch(storePartnerAllocations(
      selected.selectedSemester,
      selected.selectedPartner
    ))
  }

  loggingOut() {
    const { dispatch } = this.props
    dispatch(actions.logout())
  }

  render() {
    const { filters  } = this.props

    return(
      <div>
        <ul className="nav">
          <li className={filters.currentPage === HOME_PAGE ? "active" : ""} ><Link to="/">HOME</Link></li>
          <li className={filters.currentPage === TECHNICAL_PAGE ? "active" : ""} ><Link to="/techreview">TECH REVIEW</Link></li>
          <li className={filters.currentPage === STATISTICS_PAGE ? "active" : ""} ><Link to="/statistics">STATISTICS</Link></li>
          <li className={filters.currentPage === TAC_PAGE ? "active" : ""} ><Link to="/timeallocation">TIME ALLOCATION</Link></li>
          <li className={filters.currentPage === DOCUMENTATION_PAGE ? "active" : ""} ><Link to="/documentation">DOCUMENTATION</Link></li>
          <li className={filters.currentPage === ADMIN_PAGE ? "active" : ""}><Link to="/admin">ADMIN</Link></li>
          <button className="logoutbtn"
          onClick={ this.loggingOut.bind(this) }> Logout</button>
        </ul>
        <ul className="bigNav">
           <h1>{ filters.currentPage }</h1>
        </ul>
      </div>
      );
    }
  }

export default connect(
  store => ({
    filters: store.filters,
    statistics:store.statistics,
    user:store.user.user,
    SALTAstronomers: store.SALTAstronomers.SALTAstronomer
   }), null
)(Navigation);
