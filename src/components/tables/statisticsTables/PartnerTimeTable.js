import React from "react";
import propTypes from "prop-types";
import {totalTimeRequestedPerPartner, totalTimeRequestedForP4} from "../../../util/filters";
import {ALL_PARTNER} from "../../../types";

const partnerAlloc = (allocatedTime, partner) => {
	let d = { p0p1: 0, p2: 0, p3:0 };
	if (partner === ALL_PARTNER){
		(Object.values(allocatedTime) || []).forEach( a => {
			d.p0p1 += a.p0p1;
			d.p2 += a.p2;
			d.p3 += a.p3;
		})
	} else {
		d = allocatedTime[partner] || d
	}

	return d
};

const PartnerTimeTable = ({proposals, partner, allocatedTime, semester}) => {
	const total = totalTimeRequestedPerPartner(proposals, semester, partner);
	const p4Total = totalTimeRequestedForP4(proposals, semester, partner);
	const partnerAllocation = partnerAlloc(allocatedTime, partner);
	const allocatedTimeSum = (partnerAllocation.p0p1 || 0) + (partnerAllocation.p2 || 0) + (partnerAllocation.p3 || 0);
	return(
		<div className={"stat-item"}>
			<h2>Time for Partner <strong>{partner}</strong></h2>
			<table className="stat-table"  style={ { height: "90%"}}>
				<thead>
				<tr>
					<th />
					<th>Total  (hours)</th>
				</tr>
				</thead>
				<tbody>
				<tr>
					<td>Time available</td>

					<td>{ allocatedTimeSum.toFixed(2) } </td>
				</tr>

				<tr>
					<td>Requested Time </td>
					<td>{(total/3600).toFixed(2)}</td>
				</tr>
				<tr>
					<td>Subscription rate </td>
					<td>{(((total/3600)/(allocatedTimeSum))*100).toFixed(2)} %</td>
				</tr>
				<tr>
					<td>Average per Proposal </td>
					<td>{((total/3600)/ (proposals.length)).toFixed(2) }</td>
				</tr>
				<tr>
					<td>P4 Requested Time </td>
					<td>{(p4Total/3600).toFixed(2) }</td>
				</tr>

				</tbody>
			</table>
		</div>
	)
};

PartnerTimeTable.propTypes = {
	proposals: propTypes.array.isRequired,
	allocatedTime: propTypes.object.isRequired,
	partner: propTypes.string.isRequired,
	semester: propTypes.string.isRequired,
};

export default PartnerTimeTable;
