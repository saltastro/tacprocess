import React from "react";
import propTypes from "prop-types";
import { totalTimeRequestedPerParner } from '../../util/filters';

const PartnerTable = (proposals) => {

  const total = totalTimeRequestedPerParner(proposals.proposals, proposals.semester, proposals.partner)
  const p0p1p2p3 = proposals.allocatedTime.p0p1 || 0 + proposals.allocatedTime.p2 || 0 + proposals.allocatedTime.p3 || 0

  return(
  <div>
    <h2>{proposals.partner}</h2>
    <table className="table left-table">
      <thead>
        <tr>
          <th />
          <th><h2>Total</h2></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><h3>Time available</h3></td>

          <td><h3>{ p0p1p2p3 }</h3></td>
        </tr>

        <tr>
          <td><h3>Requested Time </h3></td>
          <td><h3>{(total/3600).toFixed(2)}</h3></td>
        </tr>
        <tr>
          <td><h3>Subscription rate </h3></td>
          <td><h3>{((p0p1p2p3/(total/3600))*100).toFixed(2)} %</h3></td>
        </tr>
        <tr>
          <td><h3>Average per Proposal </h3></td>
          <td><h3>{((total/3600)/ (proposals.proposals.length)).toFixed(2) }</h3></td>
        </tr>

      </tbody>
    </table>
  </div>
  )}

PartnerTable.propTypes = {
  proposals: propTypes.array.isRequired,
}

export default PartnerTable;
