import React from "react";
import propTypes from "prop-types";

const proposalsFilter = proposals => {
    const newProposals = []
    const longTermProposals = []
    proposals
    .forEach( p => {
      if (p.isNew){
        newProposals.push(p)
      }

      if (p.isLong) {
          longTermProposals.push(p)
      }
      return p
    })
    return {
      longTermProposals,
      newProposals
    };
  }

const getMatch = (a, b) => {
      const matches = [];

      for ( let i = 0; i < a.length; i++ ) {
          for ( let e = 0; e < b.length; e++ ) {
              if ( a[i] === b[e] ) matches.push( a[i] );
          }
      }
      return matches;
  }

const ProposalTable = (proposals) => {
  const propos = proposals.proposals

    const newAndLong = proposalsFilter(propos)
    return(
      <div>
        <table className="table left-table">
          <thead>
            <tr>
              <th />
              <th><h2>Total</h2></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><h3>New proposals plus older proposals</h3></td>
              <td><h3>{propos.length}</h3></td>
            </tr>
            <tr>
              <td><h3>New proposals </h3></td>
              <td><h3>{newAndLong.newProposals.length}</h3></td>
            </tr>
            <tr>
              <td><h3>Older Proposals </h3></td>
              <td><h3>{propos.length - newAndLong.newProposals.length}</h3></td>
            </tr>
            <tr>
              <td><h3>All long term proposals </h3></td>
              <td><h3>{newAndLong.longTermProposals.length}</h3></td>
            </tr>
            <tr>
              <td><h3>New long term proposals </h3></td>
              <td><h3>{getMatch(newAndLong.longTermProposals, newAndLong.newProposals).length}</h3></td>
            </tr>
          </tbody>
        </table>
      </div>
      );
    }


  ProposalTable.propTypes = {
    proposals: propTypes.array.isRequired ,
  }

export default ProposalTable;
