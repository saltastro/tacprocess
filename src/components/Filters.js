import React from "react";
import { connect } from "react-redux";
import DropDown from '../components/tables/DropDown'
import { partnerChange, semesterChange, astronomerChange } from "../actions/filtersActions";
import  fetchProposals  from "../actions/proposalsActions";
import  fetchTargets  from "../actions/targetsActions";
import { storePartnerAllocations  } from "../actions/timeAllocationActions";
import { semestersArray, getPartnerList, getAstronomersList } from "../util/filters";
import {
    TECHNICAL_PAGE,
 } from "../types"

class filters extends React.Component {
  updateSemester = value => {
    const {dispatch, filters} = this.props
    dispatch(fetchProposals( value, filters.selectedPartner))
    dispatch(fetchTargets(value, filters.selectedPartner))
    dispatch(storePartnerAllocations(value, filters.selectedPartner))
    dispatch(semesterChange(value))
  }
  updatePartner = value => {
    const { dispatch, filters } = this.props
    dispatch(fetchProposals( filters.selectedSemester, value))
    dispatch(fetchTargets(filters.selectedSemester, value))
    dispatch(storePartnerAllocations(filters.selectedSemester, value))
    dispatch(partnerChange(value))
  }
  updateLiaison = value => {
    const { dispatch } = this.props
    dispatch(astronomerChange(value));
  }

  render() {
    const { filters, user, SALTAstronomers  } = this.props
    const { selectedPartner, selectedSemester, selectedLiaison } = filters
    const partnerList = getPartnerList(user.roles)
    const astronomersList = ["All", "Assigned"].concat(getAstronomersList(SALTAstronomers)).concat(["Not Assigned"])
    return(
      <div className="selector-div">
        <div className="left">
          <DropDown
              className={"left"}
              name="Semester"
              listToDisplay={semestersArray()}
              OnChange={this.updateSemester}
              value={selectedSemester}/>
            </div>
      {filters.currentPage !== TECHNICAL_PAGE ?
        <div className="left-2">
          <DropDown
              name="Partner"
              listToDisplay={partnerList}
              OnChange={this.updatePartner}
              value={selectedPartner}/>
        </div>
        :
        <div className="left-2">
          <DropDown
              name="SALT Astronomer"
              listToDisplay={astronomersList}
              OnChange={this.updateLiaison}
              value={selectedLiaison}/>
        </div>}
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
   }) ,null
)(filters);