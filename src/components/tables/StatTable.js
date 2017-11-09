import React from "react";
import propTypes from "prop-types";

import ProposalTable from "./ProposalTable";
import ObservingStatTable from "./ObservingStatTable";

class StatPropos extends React.Component {
  state = {};

  render() {
    const { proposals, semester} = this.props
    return(
      <div>
        <ProposalTable proposals={proposals} />
        <ObservingStatTable proposals={proposals} semester={semester} />
      </div>
      );
    }
  }

  StatPropos.propTypes = {
    proposals: propTypes.array.isRequired ,
    semester: propTypes.string.isRequired ,
  }

export default StatPropos;
