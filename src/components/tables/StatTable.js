import React from "react";
import propTypes from "prop-types";

import ProposalTable from "./ProposalTable";
import ObservingStatTable from "./ObservingStatTable";
import ConfigStats from "./ConfigStats";
import ProposalsTable from "./ProposalsTable";

class StatPropos extends React.Component {
  state = {};

  render() {
    const { proposals} = this.props
    return(
      <div>
        <ProposalTable proposals={proposals} />
        <ObservingStatTable proposals={proposals} />
        <ConfigStats proposals={proposals} />
        <ProposalsTable proposals={proposals} />
      </div>
      );
    }
  }

  StatPropos.propTypes = {
    proposals: propTypes.array.isRequired,
  }

export default StatPropos;
