import React from "react";
import { connect } from "react-redux";
import InfoMessage from "../messages/InfoMessage";

class TachReviewPage extends React.Component {

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
    const  proposals  = this.props.proposals.proposals || []
    return(
      <div>
      <InfoMessage page="Admin"/>
      <button className="btn-success" onClick={ e => this.submitTechReview(e, proposals) }>Submit</button>

      </div>
    );

  }
}

export default connect(store => ({proposals: store.proposals}),null)(TachReviewPage);
