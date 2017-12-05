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
    const { proposals} = this.props
    const partner = this.props.partner
    const semester = this.props.semester
    return(
      <div>
        <ProposalTable proposals={proposals} />
        <PartnerTable proposals={proposals} partner={partner} semester={semester} />
        <ObservingStatTable proposals={proposals} />
        <ConfigStats proposals={proposals} />
        <ProposalsTable proposals={proposals} />
      </div>
      );
    }
  }

  StatPropos.propTypes = {
    proposals: propTypes.array.isRequired,
    partner: propTypes.string.isRequired,
    semester: propTypes.string.isRequired
  }

export default StatPropos;
