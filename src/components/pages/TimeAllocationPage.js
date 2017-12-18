/* eslint-disable */
import React from "react";
import { connect } from "react-redux"
import propTypes from "prop-types";
import InfoMessage from "../messages/InfoMessage";
import AllocAvailTable from "../tables/AllocAvailTable";
import ProposalsTable from "../tables/ProposalsTable";
import checkAllocatedTimes from "../../util/checkAllocation";


class TimeAllocationPage extends React.Component {
  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.submitProposals = this.submitProposals.bind(this);
  }

  submitProposals(e){
    checkAllocatedTimes(this.props.proposals)
  }
  render() {

    const { allocatedTime, proposals } = this.props
    return(
      <div>
        <AllocAvailTable allocatedTime={allocatedTime} />
        <ProposalsTable proposals={ proposals } />
        <button className="btn-success" onClick={ this.submitProposals }>Submit</button>
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
      );
    }
  }

  export default connect(
    store => ({
      allocatedTime:store.tac.data,
      proposals: store.statistics.data.proposals
    }),null
  )(TimeAllocationPage);
