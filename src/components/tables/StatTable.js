import React from "react";
import propTypes from "prop-types";

class StatPropos extends React.Component {
  state = {};

  render() {
    return(
      <div>
      <h1>Title: {this.props.proposal.proposalCode}</h1>
      <h3> Id: {this.props.proposal.proposalId}</h3>
      </div>
      );
    }
  }

  StatPropos.propTypes = {
    proposal: propTypes.shape({
      proposalId : propTypes.string,
      proposalCode : propTypes.string
    }).isRequired
  }

export default StatPropos;
