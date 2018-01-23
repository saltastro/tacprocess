import React from "react";
import { Link } from "react-router-dom"
import { connect } from "react-redux";
import DropDown from '../components/tables/DropDown'
import * as actions from "../actions/auth";
import { partnerChange, semesterChange } from "../actions/filtersActions";
import { fetchStatData } from "../actions/statisticsActions";
import  fetchProposals  from "../actions/proposalsActions";
import  fetchTargets  from "../actions/targetsActions";
import { storePartnerAllocations  } from "../actions/timeAllocationActions";
import { semestersArray, getPartnerList, getLieisonList } from "../util/filters";
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

    this.props.dispatch(actions.fetchUserData())

    this.props.dispatch(fetchStatData(
      selected.selectedSemester,
      selected.selectedPartner
    ))
    this.props.dispatch(
      fetchTargets(
      selected.selectedSemester,
      selected.selectedPartner
    ))
    this.props.dispatch(
      fetchProposals(
      selected.selectedSemester,
      selected.selectedPartner
    ))

    this.props.dispatch(storePartnerAllocations(
      selected.selectedSemester,
      selected.selectedPartner
    ))
  }
  updateSemester(value){
    const {dispatch, filters} = this.props
    dispatch(fetchProposals( value, filters.selectedPartner))
    dispatch(fetchTargets(value, filters.selectedPartner))
    dispatch(storePartnerAllocations(value, filters.selectedPartner))
    dispatch(semesterChange(value))
  }
  updatePartner(value){
    const { dispatch, filters } = this.props
    dispatch(fetchProposals( filters.selectedSemester, value))
    dispatch(fetchTargets(filters.selectedSemester, value))
    dispatch(storePartnerAllocations(filters.selectedSemester, value))
    dispatch(partnerChange(value))
  }
  updateLieison(value){
    //const { dispatch } = this.props
    console.log("Updating Lieison...");
  }
  loggingOut() {
    const { dispatch } = this.props
    dispatch(actions.logout())
  }

  render() {
    const { filters, user, lieisonAstronomers  } = this.props
    const { selectedPartner, selectedSemester } = filters
    const partnerList = getPartnerList(user.roles)
    const lieisonList = ["All", "Assigned"].concat(getLieisonList(lieisonAstronomers)).concat(["Not Assigned"])

    return(
      <div>
        <ul className="nav">
          <li className={filters.currentPage === HOME_PAGE ? "active" : ""} ><Link to="/">Home</Link></li>
          <li className={filters.currentPage === TECHNICAL_PAGE ? "active" : ""} ><Link to="/techreview">Tech Review</Link></li>
          <li className={filters.currentPage === STATISTICS_PAGE ? "active" : ""} ><Link to="/statistics">Statistics</Link></li>
          <li className={filters.currentPage === TAC_PAGE ? "active" : ""} ><Link to="/timeallocation">Time Allocation</Link></li>
          <li className={filters.currentPage === DOCUMENTATION_PAGE ? "active" : ""} ><Link to="/documentation">Documentation</Link></li>
          <li className={filters.currentPage === ADMIN_PAGE ? "active" : ""}><Link to="/admin">Admin</Link></li>
          <button className="logoutbtn"
          onClick={ this.loggingOut.bind(this) }> Logout</button>
        </ul>
        <div className="selector-div">
        <DropDown
              className={"left"}
              name="Semester"
              listToDisplay={semestersArray()}
              OnChange={this.updateSemester.bind(this)}
              value={selectedSemester}/>

          {filters.currentPage !== TECHNICAL_PAGE ?
              <DropDown
                  className={"left-2"}
                  name="Partner"
                  listToDisplay={partnerList}
                  OnChange={this.updatePartner.bind(this)}
                  value={selectedPartner}/> :
              <DropDown
                  className={"left-2"}
                  name="Lieison Astronomer"
                  listToDisplay={lieisonList}
                  OnChange={this.updateLieison.bind(this)}
                  value={"All"}/>}
        </div>

      </div>
      );
    }
  }

export default connect(
  store => ({
    filters: store.filters,
    statistics:store.statistics,
    user:store.user.user,
    lieisonAstronomers: store.lieisonAstronomers.lieisonAstronomer
   }), null
)(Navigation);
