import React from "react";
import propTypes from "prop-types";

const proposalsFilter = proposals => {
    const newProposals = []
    const longTermProposals = []
    proposals.map( p => {
      if (p.isNew){
        newProposals.push(p)
      }

      if (p.isLong) {
          longTermProposals.push(p)
      }
      return p
    })
    return {
      longTermProposals: longTermProposals,
      newProposals: newProposals
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

class ProposalTable extends React.Component {
  render() {
    const { proposals} = this.props
    const newAndLong = proposalsFilter(proposals)
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
              <td><h3>{proposals.length}</h3></td>
            </tr>
            <tr>
              <td><h3>New proposals </h3></td>
              <td><h3>{newAndLong.newProposals.length}</h3></td>
            </tr>
            <tr>
              <td><h3>Older Proposals </h3></td>
              <td><h3>{proposals.length - newAndLong.newProposals.length}</h3></td>
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
  }

  ProposalTable.propTypes = {
    proposals: propTypes.array.isRequired ,
  }

export default ProposalTable;
