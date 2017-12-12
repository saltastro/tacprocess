import React from "react";
import propTypes from "prop-types";
import InputField from "../util/InputField";


const ProposalsTable = (proposals) => {

  const arrayOfProposals = proposals.proposals || []
  console.log("=====: ", proposals);
  return (
  <div className="scroldiv">
  <h1>Proposals Table</h1>
  <table>
    <thead>
      <tr>
        <th>Code</th>
        <th>Title</th>
        <th>Abstract</th>
        <th>PI</th>
        <th>Semester</th>
        <th>TAC comment</th>
        <th>Total Requested Time</th>
        <th>P0</th>
        <th>P1</th>
        <th>P2</th>
        <th>P3</th>
        <th>Total P0-P3</th>
        <th>P4</th>
        <th>Act on Alert</th>
        <th>Transparency</th>
        <th>Max seeing</th>
        <th>Hover Info</th>
        <th>Tech Report</th>
      </tr>
    </thead>
    <tbody>
      {
         arrayOfProposals.map( p => (

      <tr>
        <td><div Style="width:150px; padding:8px">{ p.proposalCode }</div></td>
        <td><div Style="width:300px; max-height:100px; overflow:auto;">{ p.title }</div></td>
        <td><div Style="width:400px; max-height:100px; overflow:auto;">{ p.abstract }</div></td>
        <td>{ p.pi }</td>
        <td>2017-1</td>
        <td>
              <textarea name="tac-comment" value={p.tacComment} Style="width:400px; height:100px; overflow:auto;" />

        </td>
        <td><div Style="width:100px; max-height:100px; overflow:auto;">{ p.totalRequestedTime }</div></td>
        <td>
            <input type="text" name="p0" value={ p.allocatedTime.p0 } />
        </td>
        <td>
            <input type="text" name="p1" value={ p.allocatedTime.p1 } />
        </td>
        <td>
            <input type="text" name="p2" value={ p.allocatedTime.p2 } />
        </td>
        <td>
            <input type="text" name="p3" value={ p.allocatedTime.p3 } />
        </td>
        <td><div Style="width:100px; max-height:100px; overflow:auto;">{ p.allocatedTime.p0 + p.allocatedTime.p1 + p.allocatedTime.p2 + p.allocatedTime.p3 }</div></td>
        <td>
            <input type="text" name="p4" value={ p.allocatedTime.p4 } />
        </td>
        <td><div Style="width:100px; max-height:100px; overflow:auto;">false</div></td>
        <td><div Style="width:100px; max-height:100px; overflow:auto;">{ p.transparency }</div></td>
        <td><div Style="width:100px; max-height:100px; overflow:auto;">{ p.maxSeeing }</div></td>
        <td><div Style="width:100px; max-height:100px; overflow:auto;">Hover Info</div></td>
        <td><div Style="width:400px; max-height:100px; overflow:auto;">{ p.report } </div></td>
      </tr>
        ))
      }

    </tbody>
    </table>
  </div>
  )}

  ProposalsTable.propTypes = {
    proposals: propTypes.array.isRequired
  }

export default ProposalsTable;
