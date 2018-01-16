/* eslint-disable */
import React from "react";
import { connect } from "react-redux"
import propTypes from "prop-types";
import InfoMessage from "../messages/InfoMessage";
import AllocAvailTable from "../tables/AllocAvailTable";
import ProposalsTable from "../tables/ProposalsTable";
import ProposalsPerPartner from "../tables/ProposalsPerPartner";
import {checkAllocatedTimes, getQuaryToAddAllocation } from "../../util/allocation";
import { canUserWriteAllocations, canUserWriteTechComments }  from "../../util";
import PartnerProposals  from "../../util/proposal";
import { submitAllocations } from "../../api/graphQL";
import { updateProposals } from "../../actions/proposalsActions";
import { startSubmition, passSubmition, failSubmition } from "../../actions/timeAllocationActions";
import { ALL_PARTNER } from "../../types";


class TimeAllocationPage extends React.Component {
  constructor(props) {
    super(props);

    this.submitProposals = this.submitProposals.bind(this);
  }

  submitProposals(event, partner){
    const ppp = PartnerProposals(this.props.proposals.proposals, this.props.user.user.partners);
    const { dispatch } = this.props
    const query = getQuaryToAddAllocation(ppp[partner],
      partner,
      this.props.filters.selectedSemester
    )
    dispatch(startSubmition(partner))
    const submited = submitAllocations(query)
    const {rst} =submited.then(p => p.data).then( d => {
      d.data.updateTimeAllocations.success ? dispatch(passSubmition()) : dispatch(failSubmition())
    }).catch(this.props.dispatch(failSubmition()));
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
  tacCommentChange(event, proposalCode, partner) {
    const data = this.props
    const value = event.target.value;
    const updatedProposals = data.proposals.proposals.map( p => {
      if (p.proposalCode === proposalCode) {
          p.tacComment[partner].comment = value
      }
      return p
    })
    data.dispatch(updateProposals(updatedProposals))
  }

  render() {

    const { allocatedTime, filters, user, tac} = this.props
    const  proposals  = this.props.proposals.proposals || []
    let  partners  = this.props.user.user.partners || []


    if (filters.selectedPartner !== ALL_PARTNER){
      partners = filters.selectedPartner ? [{value: filters.selectedPartner, label: filters.selectedPartner}] : []
    }
    const ppp = PartnerProposals(proposals, partners);
    // if (tac.submiting)  return (<div><h1>Submiting</h1></div>); else
    return(
      <div>
        <AllocAvailTable allocatedTime={allocatedTime} />
      {
        tac.submiting ? (<div><h1>Submiting...</h1></div>) : partners.map( part => (
          <ProposalsPerPartner
                proposals={ ppp[part.value] || [] }
                partner={part.value}
                tacCommentChange={ this.tacCommentChange.bind(this) }
                allocationChange={ this.allocationChange.bind(this) }
                submitForParner={ this.submitProposals.bind(this) }
                canAllocate = { canUserWriteAllocations(user.user, part.value) }
                canComment = { canUserWriteTechComments(user.user, part.value) }
                submited = { tac }

          />
        ))
       }
      </div>
      );
    }
  }

  export default connect(
    store => ({
      tac: store.tac,
      allocatedTime:store.tac.data,
      proposals: store.proposals,
      filters: store.filters,
      user: store.user,
    }),null
  )(TimeAllocationPage);
