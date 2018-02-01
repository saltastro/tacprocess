import React from "react";
import { connect } from "react-redux";
import fetchSA from "../../actions/saltAstronomerActions";
import {
    updateLiaisonAstronomer,
    updateTechnicalReport,
    submitTechnicalReviewDetails
} from "../../actions/technicalReviewActions";
import { SATable } from "../tables/TechReviewTable";
import { getLiaisonUsername } from '../../util';
import { reduceProposalsPerAstronomer } from '../../util/filters';

class TechReviewPage extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchSA())
  }

  submitTechReview(event, proposals){
     this.props.dispatch(submitTechnicalReviewDetails(proposals, this.props.semester));
  }

  // Updates the comment of the specific proposal
  techReportChange = (proposalCode, techReport, field) => {
    this.props.dispatch(updateTechnicalReport(proposalCode, this.props.semester, techReport, field));
  };

  // Assign an astronomer for the specific proposal

  techAssignAstronomer = (proposalCode, liaisonAstronomer) => {
    this.props.dispatch(updateLiaisonAstronomer(proposalCode, liaisonAstronomer));
  };

  render() {
    const proposals = this.props.proposals;
    const SALTAstronomers = this.props.SALTAstronomers;
    const user  = this.props.user;
    const submitting = this.props.submittingLiaisonAstronomers || this.props.submittingTechnicalReports;
    const submitted = this.props.submittedLiaisonAstronomers && this.props.submittedTechnicalReports;
    const errors = this.props.errors.submittingError;
    const semester  = this.props.semester;

      if (!user.roles || !proposals || proposals.length === 0 ){
          return ( <div className='spinner'>
                        <div className ='dot1'></div>
                        <div className='dot2'></div>
                   </div>)
      }

      return(

      <div>
        <SATable
          user={user}
          proposals={proposals}
          SALTAstronomers={SALTAstronomers}
          techReportChange={ this.techReportChange }
          techAssignAstronomer={ this.techAssignAstronomer }
          semester={semester}
        />
          <button
              disabled={semester < "2018-1"}
              className="btn-success"
              onClick={ e => this.submitTechReview(e, proposals) }>Submit</button>
          <div style={{fontWeight: 'bold', fontSize: 20, textAlign: 'right', marginTop: 70 }}>
              {submitting && <span>Submitting...</span>}
              {submitted && <span style={{color: 'green'}}>Submission successful</span>}
              {errors && <span style={{color: 'red'}}>Oops. The submission has failed.</span>}
          </div>
      </div>
    );

  }
}

export default connect(store => {
    const SALTAstronomers = store.SALTAstronomers.SALTAstronomer;
    const selectedSA = store.filters.selectedLiaison;
    const saUser = selectedSA === "All" || selectedSA === "Not Assigned" || selectedSA === "Assigned"? selectedSA : getLiaisonUsername(selectedSA, SALTAstronomers)
    const proposals = reduceProposalsPerAstronomer(store.proposals.proposals || [], saUser);

    return {
        proposals,
        semester: store.filters.selectedSemester,
        user: store.user.user,
        SALTAstronomers: store.SALTAstronomers.SALTAstronomer,
        submittedLiaisonAstronomers: store.proposals.submittedLiaisonAstronomers,
        loading: store.proposals.fetching,
        submittingLiaisonAstronomers: store.proposals.submittingLiaisonAstronomers,
        submittingTechnicalReports: store.proposals.submittingTechnicalReports,
        submittedTechnicalReports: store.proposals.submittedTechnicalReports,
        errors: store.proposals.errors,
        
    }
}, null)(TechReviewPage);
