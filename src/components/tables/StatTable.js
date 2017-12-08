import React from "react";
import propTypes from "prop-types";

import ProposalTable from "./ProposalTable";
import ObservingStatTable from "./ObservingStatTable";
import ConfigStats from "./ConfigStats";
import ProposalsTable from "./ProposalsTable";
import PartnerTable from "./PartnerTable";

class StatPropos extends React.Component {
  state = {};

  render() {
    const { proposals, semester, allocatedTime, partner} = this.props
    return(
      <div>
        <ProposalTable proposals={proposals} />
        <PartnerTable
            proposals={proposals}
            semester={semester}
            partner={partner}
            allocatedTime={allocatedTime}
         />
        <ObservingStatTable proposals={proposals} />
        <ConfigStats proposals={proposals} />
      </div>
      );
    }
  }

  StatPropos.propTypes = {
    proposals: propTypes.array.isRequired,
    allocatedTime: propTypes.object.isRequired,
    semester: propTypes.string.isRequired,
    partner: propTypes.string.isRequired,
  }

export default StatPropos;
