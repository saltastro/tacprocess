/* eslint-disable */
import React from "react";
import { connect } from "react-redux"
import propTypes from "prop-types";
import InfoMessage from "../messages/InfoMessage";
import AllocAvailTable from "../tables/AllocAvailTable";
import ProposalsTable from "../tables/ProposalsTable";
import ProposalsPerPartner from "../tables/ProposalsPerPartner";
import {checkAllocatedTimes, getQuaryToAddAllocation } from "../../util/allocation";
import  PartnerProposals  from "../../util/proposal";
import { submitAllocations } from "../../api/graphQL";
import { updateProposals } from "../../actions/proposalsActions";


class TimeAllocationPage extends React.Component {
  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.submitProposals = this.submitProposals.bind(this);
  }

  submitProposals(event, partner){
    const query = getQuaryToAddAllocation(this.props.proposals.proposals,
      partner,
      this.props.filters.selectedSemester
    )
    submitAllocations(query)
  }
  allocationChange(event, proposalCode, priority, partner) {

    const data = this.props
    const value = event.target.value;
    const updatedProposals = data.proposals.proposals.map( p => {
      if (p.proposalCode === proposalCode) {
          p.allocatedTime[partner][priority] = value
      }
      return p
    })
    data.dispatch(updateProposals(updatedProposals))
  }
  tacCommentChange(event, proposalCode) {
    const data = this.props
    const value = event.target.value;
    const updatedProposals = data.proposals.proposals.map( p => {
      if (p.proposalCode === proposalCode) {
          p.tacComment = value
      }
      return p
    })
    data.dispatch(updateProposals(updatedProposals))
  }

  render() {

    const { allocatedTime } = this.props
    const  proposals  = this.props.proposals.proposals || []
    const  partners  = this.props.user.user.partners || []
    const ppp = PartnerProposals(proposals, partners);
    return(
      <div>
        <AllocAvailTable allocatedTime={allocatedTime} />
      {
        partners.map( part => (
          <ProposalsPerPartner
                proposals={ ppp[part.value] || [] }
                partner={part.value}
                tacCommentChange={this.tacCommentChange.bind(this)}
                allocationChange={this.allocationChange.bind(this)}
                submitForParner={ this.submitProposals.bind(this) }
          />
        ))
       }


      </div>
      );
    }
  }

  export default connect(
    store => ({
      allocatedTime:store.tac.data,
      proposals: store.proposals,
      filters: store.filters,
      user: store.user,
    }),null
  )(TimeAllocationPage);
