import React from "react";
import propTypes from "prop-types";
import { areAllocatedTimesCorrect, allocatedTimeTotals }  from "../../util";
import { goodTime, badTime }  from "../../types";

const AvailableTimePerPartnerTable = (partner, proposals, availableTime) => {
  !!partner.availableTime[partner.partner] ? availableTime = partner.availableTime[partner.partner] : availableTime = {p0p1: 0, p2: 0, p3: 0}
  const correctAllocations = areAllocatedTimesCorrect(partner.partner, availableTime, partner.proposals)
  const allocatedTotals = allocatedTimeTotals(partner.proposals, partner.partner)

  return(
    <div className="table-space">
      <table className="table-half left-table table">
          <thead>
              <tr>
                  <th><h2>{ partner.partner }</h2></th>
                  <th><h2>Available Time</h2></th>
                  <th><h2>Allocated Time</h2></th>
              </tr>
          </thead>
          <tbody>
              <tr>
                <td><h3>Priority 0 & 1</h3></td>
                <td><h3>{ (availableTime.p0p1).toFixed(2) }</h3></td>
                <td style={correctAllocations.p0p1 ? goodTime : badTime }><h3>{ (parseFloat(allocatedTotals.p0/(60*60)) + parseFloat(allocatedTotals.p1/(60*60))).toFixed(2) || 0 }</h3></td>
              </tr>
              <tr>
                  <td><h3>Priority 2  </h3></td>
                  <td><h3>{ (availableTime.p2).toFixed(2) } </h3></td>
                  <td style={correctAllocations.p2 ? goodTime : badTime }><h3>{ parseFloat(allocatedTotals.p2/(60*60).toFixed(2)) || 0 }</h3></td>
              </tr>
              <tr>
                  <td><h3>Priority 3  </h3></td>
                  <td><h3>{ (availableTime.p3).toFixed(2) } </h3></td>
                  <td style={correctAllocations.p3 ? goodTime : badTime }><h3>{ parseFloat(allocatedTotals.p3/(60*60).toFixed(2)) || 0 }</h3></td>
              </tr>
              <tr>
                  <td><h3>Priority 4 </h3></td>
                  <td><h1> &infin; </h1></td>
                  <td style={ goodTime }><h3>{ parseFloat(allocatedTotals.p4.toFixed(2)) }</h3></td>
              </tr>
        </tbody>
    </table>

    </div>
)};

AvailableTimePerPartnerTable.propTypes = {
  partner: propTypes.string.isRequired,
  proposals: propTypes.array.isRequired,
  availableTime: propTypes.object.isRequired,
}

export default AvailableTimePerPartnerTable;
