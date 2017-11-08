import React from "react";
import propTypes from "prop-types";

const proposalsFilter = proposals => {
    const newProposals = []
    const oldProposals = []
    const unkProposals = []
    proposals.map( p => {
      if (p.status === "New"){
        newProposals.push(p)
      } else if (p.status === "Old"){
          newProposals.push(p)
        } else {
          unkProposals.push(p)
        }
      // console.log("N", newProposals);
      // console.log("O", oldProposals);
      // console.log("U", unkProposals);
      return {
      newProposals,
      oldProposals,
      unkProposals
    }
    })

  }

class ProposalTable extends React.Component {
  render() {
    const { proposals} = this.props
    return(
      <div> hello... { proposalsFilter(proposals)  }</div>
      );
    }
  }

  ProposalTable.propTypes = {
    proposals: propTypes.array.isRequired ,
  }

export default ProposalTable;
