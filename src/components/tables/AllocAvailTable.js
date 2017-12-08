import React from "react";
import propTypes from "prop-types";

const AllocAvailTable = (allocatedTime) => {
  return (
  <div>
    <table className="table left-table">
      <thead>
        <tr>
          <th />
          <th><h2>Available Time</h2></th>
          <th><h2>Allocated Time</h2></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><h3>Priority 0 & 1</h3></td>

          <td><h3>{ allocatedTime.allocatedTime.p0p1.toFixed(2) }</h3></td>
          <td><h3>{ 0 }</h3></td>
        </tr>

        <tr>
          <td><h3>Priority 2  </h3></td>

          <td><h3>{ allocatedTime.allocatedTime.p2.toFixed(2) } </h3></td>
          <td><h3>{ 0 }</h3></td>
        </tr>
        <tr>
          <td><h3>Priority 3  </h3></td>
          <td><h3>{ allocatedTime.allocatedTime.p3.toFixed(2) } </h3></td>
          <td><h3>{ 0 } </h3></td>
        </tr>
        <tr>
          <td><h3>Priority 4 </h3></td>
          <td><h3> &infin; </h3></td>
          <td><h3>{ 0 }</h3></td>
        </tr>

      </tbody>
  </table>

  </div>
  )}

  AllocAvailTable.propTypes = {
    allocatedTime: propTypes.object.isRequired
  }

export default AllocAvailTable;
