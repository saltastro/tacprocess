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
import { semestersArray, getPartnerList, getAstronomersList } from "../util/filters";
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
  updateLiaison(value){
    //const { dispatch } = this.props
    console.log("Updating Liaison...");
  }
  loggingOut() {
    const { dispatch } = this.props
    dispatch(actions.logout())
  }

  render() {
    const { filters, user, SALTAstronomers  } = this.props
    const { selectedPartner, selectedSemester } = filters
    const partnerList = getPartnerList(user.roles)
    const astronomersList = ["All", "Assigned"].concat(getAstronomersList(SALTAstronomers)).concat(["Not Assigned"])

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
                  name="SALT Astronomer"
                  listToDisplay={astronomersList}
                  OnChange={this.updateLiaison.bind(this)}
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
    SALTAstronomers: store.SALTAstronomers.SALTAstronomer
   }), null
)(Navigation);
