import React from "react";
import { connect } from "react-redux";
import  fetchSA  from "../../actions/saltAstronomerActions";
import { SATable } from "../tables/TechReviewTable";
import { updateLiaisonAstronomerForProposal, updateTechnicalCommentForProposal, getLiaisonUsername } from '../../util'

import {  updateProposals } from '../../actions/proposalsActions'

class TachReviewPage extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchSA())
  }

  submitTechReview(event, proposals){
    // const { dispatch } = this.props;
    // dispatch(startSubmitingTechReview(partner))
    // submitAllocations(query).then(p => p.data, dispatch(failSubmitingTechReview()))
    //    .then( d => {
    //        d.data.updateTechReview.success ?
    //            dispatch(passSubmitingTechReview()) :
    //            dispatch(failSubmitingTechReview())
    // });
    console.log("Submiting", proposals);
  }

  // Updates the comment of the specific proposal
  techReportChange = (proposalCode, techReportComment) => {
    // Update action
    console.log("Updating a Proposal Comment: ", proposalCode, " : ",techReportComment);
  }

  // Assign an astronomer for the specific proposal
  techAssignAstronomer = (proposalCode, assignedAstronomer) => {
    // update astronomer to assigned astronomer
    console.log("Assigning Astronomer to a Proposal: ", proposalCode, " : ", assignedAstronomer);
  }

  assignedAstronomerChange = (proposalCode, assignedAstronomer) => {
    // update astronomer to assigned astronomer
    const { SALTAstronomers, proposals, dispatch } = this.props
    const updatedProposals = updateLiaisonAstronomerForProposal(proposals, proposalCode, getLiaisonUsername(assignedAstronomer, SALTAstronomers));
    dispatch( updateProposals(updatedProposals))
  }
  technicalCommentChange = (proposalCode, comment) => {
    // update astronomer to assigned astronomer
    const { proposals, dispatch } = this.props
    const updatedProposals = updateTechnicalCommentForProposal(proposals, proposalCode, comment);
    dispatch( updateProposals(updatedProposals))
  }

  render() {
    const {proposals, SALTAstronomers, user, filters} = this.props

    return(
      <div>
        <SATable
          user={user}
          proposals={proposals}
          SALTAstronomers={SALTAstronomers}
          technicalCommentChange={ this.technicalCommentChange }
          assignedAstronomerChange={ this.assignedAstronomerChange }
          techAssignAstronomer={ this.techAssignAstronomer.bind(this) }
          proposalsFilter={ filters.selectedLiaison || "All" }
        />
        <button className="btn-success" onClick={ e => this.submitTechReview(e, proposals) }>Submit</button>
      </div>
    );

  }
}

export default connect(store => ({
  proposals: store.proposals.proposals,
  user: store.user.user,
  filters: store.filters,
  SALTAstronomers : store.SALTAstronomers.SALTAstronomer}),null)(TachReviewPage);
