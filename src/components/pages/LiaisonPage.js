import React from "react";
import { connect } from "react-redux";
import LiaisonTable from '../tables/LiaisonTable'
import {downloadSummary, getLiaisonUsername} from '../../util';
import {reduceProposalsPerAstronomer} from '../../util/filters'
import {ADMINISTRATOR} from '../../types'

class LiaisonPage extends React.Component {
  requestSummary = (event, proposalCode) => {
    event.preventDefault();
    const { semester } = this.props
    downloadSummary(proposalCode, semester)
  }
  render() {
    const {proposals, astronomers, user } = this.props
    const canAssign = (user.roles || [] ).some(r => r.type === ADMINISTRATOR)
    return (
      <div>
        <h1> Liaison page</h1>
        <LiaisonTable proposals={proposals} canAssign={canAssign} username={"this guy"} selectArray={astronomers} requestSummary={this.requestSummary} />
        <button>Submit</button>
      </div>
    )
  }

}

export default connect( store => {
  const astronomers = store.SALTAstronomers.SALTAstronomer;
  const selectedSA = store.filters.selectedLiaison;
  const semester = store.filters.selectedSemester;
  const saUser = selectedSA === "All" || selectedSA === "Not Assigned" || selectedSA === "Assigned" ? selectedSA : getLiaisonUsername(selectedSA, astronomers);
  const proposals = reduceProposalsPerAstronomer(store.proposals.proposals || [], saUser, semester);
  return {
    proposals,
    astronomers,
    initProposals: store.proposals.initProposals,
    semester: store.filters.selectedSemester,
    user: store.user.user
  }}, null
)(LiaisonPage);
