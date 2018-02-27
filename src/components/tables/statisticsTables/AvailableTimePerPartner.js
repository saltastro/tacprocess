import React from "react";
import propTypes from "prop-types";
import { areAllocatedTimesCorrect, allocatedTimeTotals }  from "../../../util";
import {badTime, goodTime} from "../../../types";

const AvailableTimePerPartner = ({partner, availableTime, proposals}) => {
	!!availableTime[partner] ? availableTime = availableTime[partner] : availableTime = {p0p1: 0, p2: 0, p3: 0};
	const correctAllocations = areAllocatedTimesCorrect(partner, availableTime, proposals);
	const allocatedTotals = allocatedTimeTotals(proposals, partner);
	return(
		<div className="table-space">
			<table className="table-half left-table table">
				<thead>
				<tr>
					<th><h2>{ partner }</h2></th>
					<th><h2>Available Time (hours)</h2></th>
					<th><h2>Allocated Time (hours)</h2></th>
				</tr>
				</thead>
				<tbody>
				<tr>
					<td><h3>Priority 0 & 1</h3></td>
					<td><h3>{ (availableTime.p0p1).toFixed(2) }</h3></td>
					<td style={correctAllocations.p0p1 ? goodTime : badTime }><label>{ (parseFloat(allocatedTotals.p0/(60*60)) + parseFloat(allocatedTotals.p1/(60*60))).toFixed(2) || 0 }</label></td>
				</tr>
				<tr>
					<td><h3>Priority 2  </h3></td>
					<td><h3>{ (availableTime.p2).toFixed(2) } </h3></td>
					<td style={correctAllocations.p2 ? goodTime : badTime }><label>{ parseFloat(allocatedTotals.p2/(60*60).toFixed(2)) || 0 }</label></td>
				</tr>
				<tr>
					<td><h3>Priority 3  </h3></td>
					<td><h3>{ (availableTime.p3).toFixed(2) } </h3></td>
					<td style={correctAllocations.p3 ? goodTime : badTime }><label>{ parseFloat(allocatedTotals.p3/(60*60).toFixed(2)) || 0 }</label></td>
				</tr>
				<tr>
					<td><h3>Priority 4 </h3></td>
					<td><h1> &infin; </h1></td>
					<td style={ goodTime }><h3>{ parseFloat(allocatedTotals.p4.toFixed(2)) }</h3></td>
				</tr>
				</tbody>
			</table>
		
		</div>
	)
};

AvailableTimePerPartner.propTypes = {
	partner : propTypes.string.isRequired,
	proposals: propTypes.array.isRequired,
	availableTime: propTypes.object.isRequired
};

export default AvailableTimePerPartner;