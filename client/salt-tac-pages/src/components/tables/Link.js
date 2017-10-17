import React, { Component } from "react";

class Link extends Component {
  state = {};

  render() {
    return(
      <div>

        <div>{this.props.link.proposalcode.ProposalCode}</div>
        {console.log(this.props.link)}
      </div>
      );
    }
  }

export default Link;
