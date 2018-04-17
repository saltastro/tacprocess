import React from "react";
import { connect } from "react-redux";
import LiaisonTable from '../tables/LiaisonTable'
import { downloadSummary } from "../../util";

class LiaisonPage extends React.Component {
  requestSummary = (event, proposalCode) => {
    event.preventDefault();
    const { semester } = this.props
    downloadSummary(proposalCode, semester)
  }
  render() {
    const {proposals, astronomers, user } = this.props
    return (
      <div>
        <h1> Liaison page</h1>
        <LiaisonTable proposals={proposals} canAssign={false} username={"this guy"} selectArray={astronomers} requestSummary={this.requestSummary} />
        <button>Submit</button>
      </div>
    )
  }

}

export default connect(
  store => ({
    proposals: store.proposals.proposals,
    astronomers: store.SALTAstronomers.SALTAstronomer,
    initProposals: store.proposals.initProposals,
    semester: store.filters.selectedSemester,
    user: store.user.user
  }), null
)(LiaisonPage);
