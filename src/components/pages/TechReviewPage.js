import React from "react";
import { connect } from "react-redux";
import InfoMessage from "../messages/InfoMessage";
import  fetchSA  from "../../actions/saltAstronomerActions";
import { SATable } from "../tables/TechReviewTable";

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

  render() {
    const proposals  = this.props.proposals.proposals || [];
    const SALTAstronomers = this.props.SALTAstronomers;
    const user  = this.props.user;
    return(
      <div>
      <InfoMessage page="Admin"/>
      <SATable user={user } proposals={proposals} SALTAstronomers={SALTAstronomers} />
      <button className="btn-success" onClick={ e => this.submitTechReview(e, proposals) }>Submit</button>

      </div>
    );

  }
}

export default connect(store => ({proposals: store.proposals, user: store.user.user, SALTAstronomers : store.SALTAstronomers.SALTAstronomer}),null)(TachReviewPage);
