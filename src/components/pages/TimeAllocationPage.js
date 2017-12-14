/* eslint-disable */
import React from "react";
import { connect } from "react-redux"
import propTypes from "prop-types";
import InfoMessage from "../messages/InfoMessage";
import AllocAvailTable from "../tables/AllocAvailTable";
import ProposalsTable from "../tables/ProposalsTable";


class TimeAllocationPage extends React.Component {
  render() {

    const { allocatedTime, proposals } = this.props
    return(
      <div>
        <AllocAvailTable allocatedTime={allocatedTime} />
        <ProposalsTable proposals={ proposals } />
        <input className="submit" type="submit" value="Submit" />
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
