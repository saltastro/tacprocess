import React from "react";
import propTypes from "prop-types";
import { areAllocatedTimesCorrect, allocatedTimeTotals }  from "../../util";
import { goodTime, badTime }  from "../../types";

const AvailableTimePerPartnerTable = (partner, proposals, availableTime) => {
  !!partner.availableTime[partner.partner] ? availableTime = partner.availableTime[partner.partner] : availableTime = {p0p1: 0, p2: 0, p3: 0}
  const correctAllocations = areAllocatedTimesCorrect(partner.partner, availableTime, partner.proposals)
  const allocatedTotals = allocatedTimeTotals(partner.proposals, partner.partner)

  return(
    <div className="stat-item">
      <table className="stat-table">
          <thead>
              <tr>
                  <th><h2>{ partner.partner }</h2></th>
                  <th><h2>Available Time</h2></th>
                  <th><h2>Allocated Time</h2></th>
              </tr>
          </thead>
          <tbody>
              <tr>
                <td>Priority 0 & 1</td>
                <td>{ (availableTime.p0p1).toFixed(2) }</td>
                <td style={correctAllocations.p0p1 ? goodTime : badTime }>{ (parseFloat(allocatedTotals.p0/(60*60)) + parseFloat(allocatedTotals.p1/(60*60))).toFixed(2) || 0 }</td>
              </tr>
              <tr>
                  <td>Priority 2  </td>
                  <td>{ (availableTime.p2).toFixed(2) } </td>
                  <td style={correctAllocations.p2 ? goodTime : badTime }>{ parseFloat(allocatedTotals.p2/(60*60).toFixed(2)) || 0 }</td>
              </tr>
              <tr>
                  <td>Priority 3  </td>
                  <td>{ (availableTime.p3).toFixed(2) } </td>
                  <td style={correctAllocations.p3 ? goodTime : badTime }>{ parseFloat(allocatedTotals.p3/(60*60).toFixed(2)) || 0 }</td>
              </tr>
              <tr>
                  <td>Priority 4 </td>
                  <td> <label style={{fontSize:"30px"}}>&infin;</label> </td>
                  <td style={ goodTime }>{ parseFloat(allocatedTotals.p4.toFixed(2)) }</td>
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
