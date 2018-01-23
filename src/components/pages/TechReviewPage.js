import React from "react";
import { connect } from "react-redux";
import InfoMessage from "../messages/InfoMessage";
import  fetchSA  from "../../actions/saltAstronomerActions";
import { SATable } from "../tables/TechReviewTable";
import { getAstronomersList } from '../../util/filters'

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

  techAssignAstronomer = (proposalCode, assignedAstronomer) => {
    // update astronomer to assigned astronomer
    console.log("Assigning Astronomer to a Proposal: ", proposalCode, " : ", assignedAstronomer);
  }

  render() {
    const {proposals, SALTAstronomers, user} = this.props
    const AstronomersList = ["Not Assigned"].concat(getAstronomersList(SALTAstronomers))
    return(
      <div>
        <InfoMessage page="Admin"/>
        <SATable
          user={user}
          proposals={proposals}
          SALTAstronomers={AstronomersList}
          techReportChange={ this.techReportChange }
          assignedAstronomerChange={ this.techReportChange }
          techAssignAstronomer={ this.techAssignAstronomer.bind(this) }
        />
        <button className="btn-success" onClick={ e => this.submitTechReview(e, proposals) }>Submit</button>
      </div>
    );

  }
}

export default connect(store => ({
  proposals: store.proposals.proposals,
  user: store.user.user,
  SALTAstronomers : store.SALTAstronomers.SALTAstronomer}),null)(TachReviewPage);
