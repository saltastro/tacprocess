import React from "react";
import { connect } from "react-redux";
import LiaisonTable from '../tables/LiaisonTable'

class LiaisonPage extends React.Component {
  requestSummary = (papa) => {
    console.log(papa)
  }
  render() {
    const {proposals, astronomers, user, } = this.props
    return (
      <div>
        <h1> Liaison page</h1>
        <LiaisonTable proposals={proposals} canAssign={true} selectArray={astronomers} requestSummary={this.requestSummary} />
      </div>
    )
  }

}

export default connect(
  store => ({
    proposals: store.proposals.proposals,
    astronomers: store.SALTAstronomers.SALTAstronomer,
    initProposals: store.proposals.initProposals,
    user: store.user.user
  }), null
)(LiaisonPage);
