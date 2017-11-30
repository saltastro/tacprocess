import React from "react";
import propTypes from "prop-types";

const ProposalsTable = (proposals) => {


  return (
    <div>
    <h1>Proposals Table</h1>
    <table className="table center-table proposals-table">
      <thead>
        <tr>
          <th styles="width:100px;" ><h2>Code</h2></th>
          <th><h2>Title</h2></th>
          <th><h2>PI</h2></th>
          <th><h2>Abstract</h2></th>
          <th><h2>Total Time</h2></th>
          <th><h2>Min Time</h2></th>
          <th><h2>Transparency</h2></th>
          <th><h2>Max seeing</h2></th>
          <th><h2>Tech Report</h2></th>
        </tr>
      </thead>
      <tbody>
        {
          proposals.proposals.map(p => (
              <tr key={ p.proposalId }>
                <td  >{ p.proposalCode }</td>
                <td>{ p.title }</td>
                <td>{ p.pi }</td>
                <td>{ p.abstract }</td>
                <td>{ p.totalRequestedTime }</td>
                <td>{ p.minTime }</td>
                <td>{ p.transparency }</td>
                <td>{ p.maxSeeing }</td>
                <td>{ p.report }</td>
              </tr>
            ))
        }

      </tbody>
      </table>
    </div>
  )
}

  ProposalsTable.propTypes = {
    proposals: propTypes.array.isRequired
  }

export default ProposalsTable;
