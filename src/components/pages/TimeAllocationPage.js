/* eslint-disable */
import React from "react";
import { connect } from "react-redux"
import propTypes from "prop-types";
import InfoMessage from "../messages/InfoMessage";
import AllocAvailTable from "../tables/AllocAvailTable";
import ProposalsTable from "../tables/ProposalsTable";
import {checkAllocatedTimes, getQuaryToAddAllocation } from "../../util/allocation";
import { submitAllocations } from "../../api/graphQL";


class TimeAllocationPage extends React.Component {
  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.submitProposals = this.submitProposals.bind(this);
  }

  submitProposals(e){
    const query = getQuaryToAddAllocation(this.props.proposals,
      this.props.filters.selectedPartner,
      this.props.filters.selectedSemester
    )
    submitAllocations(query)
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
      proposals: store.statistics.data.proposals,
      filters: store.filters,
    }),null
  )(TimeAllocationPage);
