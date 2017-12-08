import React from "react";
import propTypes from "prop-types";

const ProposalsTable = (proposals) => {


  return (
    <div className="scroldiv">
    <h1>Proposals Table</h1>
    <table>
      <thead>
        <tr>
          <th><h2>Code</h2></th>
          <th><h2>Title</h2></th>
          <th><h2>PI</h2></th>
          <th><h2>Semester</h2></th>
          <th><h2>TAC comment</h2></th>
          <th><h2>Total Requested Time</h2></th>
          <th><h2>P0</h2></th>
          <th><h2>P1</h2></th>
          <th><h2>P2</h2></th>
          <th><h2>P3</h2></th>
          <th><h2>Total P0-P3</h2></th>
          <th><h2>P4</h2></th>
          <th><h2>Act on Alert</h2></th>
          <th><h2>Transparency</h2></th>
          <th><h2>Max seeing</h2></th>
          <th><h2>Hover Info</h2></th>
          <th><h2>Tech Report</h2></th>
        </tr>
      </thead>
      <tbody>
         { /*
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
        / */ }
        <tr>
          <td>code</td>
          <td>title</td>
          <td>prince Invest</td>
          <td>2017-1</td>
          <td>
              <textarea rows="4" cols="50">
                this is a test text. this field can be empty
              </textarea>
          </td>
          <td>{ 0 }</td>
          <td>
              <input type="number" name="p0" value="0" />
          </td>
          <td>
              <input type="number" name="p1" value="0" />
          </td>
          <td>
              <input type="number" name="p2" value="0" />
          </td>
          <td>
              <input type="number" name="p3" value="0" />
          </td>
          <td>{ 0 }</td>
          <td>
              <input type="number" name="p4" value="0" />
          </td>
          <td>false</td>
          <td>{ 0 }</td>
          <td>{ 0 }</td>
          <td>Hover Info</td>
          <td>Tech Report</td>
        </tr>

      </tbody>
      </table>
    </div>
  )
}

  ProposalsTable.propTypes = {
    proposals: propTypes.array.isRequired
  }

export default ProposalsTable;
