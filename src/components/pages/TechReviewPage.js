import React from "react";
import { connect } from "react-redux";
import fetchSA from "../../actions/saltAstronomerActions";
import {
	submitTechnicalReviewDetails,
	updateTechnicalReview,
	unAssignProposal
} from "../../actions/technicalReviewActions";
import TechReviewTable from "../tables/TechReviewTable";
import { getLiaisonUsername } from '../../util';
import { reduceProposalsPerAstronomer } from '../../util/filters';


class TechReviewPage extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchSA())
  }

  submitTechReview(proposals){
     this.props.dispatch(submitTechnicalReviewDetails(proposals, this.props.initProposals, this.props.semester));
  }

  // Updates the comment of the specific proposal
  onTechReviewChange = (proposalCode, techReview) => {
    this.props.dispatch(updateTechnicalReview(proposalCode, this.props.semester, techReview));
  };

  unAssign = (proposalCode) => {
      this.props.dispatch(unAssignProposal(proposalCode))
  }

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
        <TechReviewTable
          user={user}
          proposals={proposals}
          SALTAstronomers={SALTAstronomers}
          onTechReviewChange={ this.onTechReviewChange }
          semester={semester}
          unAssign={ this.unAssign}
          initProposals={ initProposals}
        />
          <button
              disabled={semester < "2018-1" || submitting}
              className="btn-success"
              onClick={ e => this.submitTechReview(proposals)
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
        submittedReportingAstronomers: store.proposals.submittedReportingAstronomers,
        loading: store.proposals.fetching,
        submittingReportingAstronomers: store.proposals.submittingReportingAstronomers,
        submittingTechnicalReports: store.proposals.submittingTechnicalReports,
        submittedTechnicalReports: store.proposals.submittedTechnicalReports,
        errors: store.proposals.errors,
        initProposals: store.proposals.initProposals,

    }
}, null)(TechReviewPage);
