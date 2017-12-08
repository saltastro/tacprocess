/* eslint-disable */
import React from "react";
import { connect } from "react-redux"
import propTypes from "prop-types";
import InfoMessage from "../messages/InfoMessage";
import AllocAvailTable from "../tables/AllocAvailTable";
import ProposalsTable from "../tables/ProposalsTable";


class TimeAllocationPage extends React.Component {

  render() {
    const { allocatedTime } = this.props
    return(
      <div>
        <InfoMessage page="Time Allocation"/>
        <AllocAvailTable allocatedTime={allocatedTime} />
        <ProposalsTable proposals={[]} />
      </div>
      );
    }
  }

  export default connect(
    store => ({
      allocatedTime:store.tac.data,
    }),null
  )(TimeAllocationPage);
