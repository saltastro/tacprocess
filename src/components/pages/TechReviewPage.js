import React from "react";
import { connect } from "react-redux";
import fetchSA from "../../actions/saltAstronomerActions";
import {
    updateLiaisonAstronomer,
    updateTechnicalReport,
    submitTechnicalReviewDetails
} from "../../actions/technicalReviewActions";
import { SATable } from "../tables/TechReviewTable";

class TechReviewPage extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchSA())
  }

  submitTechReview(event, proposals){
     this.props.dispatch(submitTechnicalReviewDetails(proposals, this.props.semester));
  }

  // Updates the comment of the specific proposal
  techReportChange = (proposalCode, techReport) => {
    this.props.dispatch(updateTechnicalReport(proposalCode, this.props.semester, techReport));
  };

  // Assign an astronomer for the specific proposal
  techAssignAstronomer = (proposalCode, liaisonAstronomer) => {
    this.props.dispatch(updateLiaisonAstronomer(proposalCode, liaisonAstronomer));
  };

  render() {
    const proposals  = this.props.proposals.proposals || [];
    const SALTAstronomers = this.props.SALTAstronomers;
    const user  = this.props.user;

      if (!user.roles || !proposals || proposals.length === 0 ){
          return (<div><h1>Loading...</h1></div>)
      }

      return(
      <div>
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
