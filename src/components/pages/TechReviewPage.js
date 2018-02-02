import React from "react";
import { connect } from "react-redux";
import fetchSA from "../../actions/saltAstronomerActions";
import {
	submitTechnicalReviewDetails,
	updateTechnicalReport,
	updateTechnicalReviewer
} from "../../actions/technicalReviewActions";
import { SATable } from "../tables/TechReviewTable";
import { getLiaisonUsername } from '../../util';
import { reduceProposalsPerAstronomer, getOnlyUpdatedProposals } from '../../util/filters';


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
  technicalReviewer = (proposalCode, reviewer) => {
      this.props.dispatch(updateTechnicalReviewer(proposalCode, reviewer));
  };

  render() {
    const {
        proposals,
        initProposals,
	    SALTAstronomers,
	    user,
	    submittingLiaisonAstronomers,
	    submittingTechnicalReports,
	    submittedTechnicalReports,
	    submittedLiaisonAstronomers,
	    semester,
        loading
    }= this.props;
    const submitting = submittingLiaisonAstronomers || submittingTechnicalReports;
    const submitted = submittedLiaisonAstronomers && submittedTechnicalReports;
    const errors = this.props.errors.submittingError;

      if (loading ){
          return ( <div className='spinner'>
                        <div className ='dot1'/>
                        <div className='dot2'/>
                   </div>)
      }

      return(

      <div>
        <SATable
          user={user}
          proposals={proposals}
          SALTAstronomers={SALTAstronomers}
          techReportChange={ this.techReportChange }
          technicalReviewer={ this.technicalReviewer }
          semester={semester}
        />
          <button
              disabled={semester < "2018-1" || submitting}
              className="btn-success"
              onClick={ e => this.submitTechReview(e,
                  getOnlyUpdatedProposals(proposals, initProposals))
              }>Submit</button>
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
    const saUser = selectedSA === "All" || selectedSA === "Not Assigned" || selectedSA === "Assigned"? selectedSA : getLiaisonUsername(selectedSA, SALTAstronomers);
    const proposals = reduceProposalsPerAstronomer(store.proposals.proposals || [], saUser);

    return {
        proposals,
	    updatedProposals: store.proposals.updatedProposals,
        semester: store.filters.selectedSemester,
        user: store.user.user,
        SALTAstronomers: store.SALTAstronomers.SALTAstronomer,
        submittedLiaisonAstronomers: store.proposals.submittedLiaisonAstronomers,
        loading: store.proposals.fetching,
        submittingLiaisonAstronomers: store.proposals.submittingLiaisonAstronomers,
        submittingTechnicalReports: store.proposals.submittingTechnicalReports,
        submittedTechnicalReports: store.proposals.submittedTechnicalReports,
        errors: store.proposals.errors,
        initProposals: store.proposals.initProposals,
        
    }
}, null)(TechReviewPage);
