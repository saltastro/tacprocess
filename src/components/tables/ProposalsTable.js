import React from "react";
import propTypes from "prop-types";

const ProposalsTable = (proposals) => {


  return (
    <div>
    <table className="table center-table proposals-table">
      <thead>
        <tr>
          <th><h2>Code</h2></th>
          <th><h2>Title</h2></th>
          <th><h2>PI</h2></th>
          <th><h2>Abstract</h2></th>

          <th><h2>Semester</h2></th>
          <th><h2>Total Time</h2></th>
          <th><h2>Min Time</h2></th>
          <th><h2>Transparency</h2></th>
          <th><h2>Max seeing</h2></th>
          <th><h2>Tech comment</h2></th>
        </tr>
      </thead>
      <tbody>
        {
          proposals.proposals.map(p => (
              <tr key={ p.proposalId } className="table-row">
                <td className="large-td" >{ p.proposalCode }</td>
                <td>{ p.title }</td>
                <td>{ p.pi }</td>
                <td className="large-td" ><div className="scrolable">{ p.abstract }</div></td>
                <td>{ p.semester }</td>
                <td>{ p.thisRequestedTime }</td>
                <td>{ p.minTime }</td>
                <td>{ p.transparency }</td>
                <td>{ p.maxSeeing }</td>
                <td>Tech Comment</td>
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
