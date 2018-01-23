import React from "react";
import { connect } from "react-redux";
import InfoMessage from "../messages/InfoMessage";
import fetchSA from "../../actions/saltAstronomerActions";
import { updateLiaisonAstronomer, updateTechnicalReport } from "../../actions/technicalReviewActions";
import { SATable } from "../tables/TechReviewTable";

class TechReviewPage extends React.Component {

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
  techReportChange = (proposalCode, techReport) => {
    this.props.dispatch(updateTechnicalReport(proposalCode, this.props.semester, techReport));
  }

  // Assign an astronomer for the specific proposal
  techAssignAstronomer = (proposalCode, assignedAstronomer) => {
    // update astronomer to assigned astronomer
    console.log("Assigning Astronomer to a Proposal: ", proposalCode, " : ", assignedAstronomer);
  }

  render() {
    const proposals  = this.props.proposals.proposals || [];
    const SALTAstronomers = this.props.SALTAstronomers;
    const user  = this.props.user;
    return(
      <div>
        <InfoMessage page="Admin"/>
        <SATable
          user={user}
          proposals={proposals}
          SALTAstronomers={SALTAstronomers}
          techReportChange={ this.techReportChange }
          techAssignAstronomer={ this.techAssignAstronomer }
        />
        <button className="btn-success" onClick={ e => this.submitTechReview(e, proposals) }>Submit</button>
      </div>
    );

  }
}

export default connect(store => (
        {
            proposals: store.proposals,
            semester: store.filters.selectedSemester,
            user: store.user.user,
            SALTAstronomers : store.SALTAstronomers.SALTAstronomer
        }), null)(TechReviewPage);
