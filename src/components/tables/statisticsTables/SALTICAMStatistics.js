import React from "react";
import propTypes from "prop-types";

function countSCAMDetector(proposals) {
	let expo = {
		dscan: 0,
		xfer: 0,
		normal: 0,
		shuffle: 0,
		slot: 0,
	};
	(proposals|| []).forEach(p => {
		p.instruments.rss.forEach( m => {
			if (m.detectorMode === "NORMAL") {expo.normal += 1}
			if (m.detectorMode === "SLOT") {expo.slot += 1}
			if (m.detectorMode === "DRIFTSCAN") {expo.dscan += 1}
			if (m.detectorMode === "FRAME XFER") {expo.xfer += 1}
		})
	});
	return expo
}

const SALTICAMStatistics = (proposals) => {
	const detectorMode = countSCAMDetector(proposals);
	return(
		<div>
			{/* Salticam table */}
			<h2>Salticam</h2>
			<table className="table center-table">
				<thead>
				<tr>
					<th><h2>Detector mode</h2></th>
					<th><h2>Number of Proposals</h2></th>
				</tr>
				</thead>
				<tbody>
				<tr>
					<td><h2>DRIFT SCAN</h2></td>
					<td><h2>{ detectorMode.dscan }</h2></td>
				</tr>
				<tr>
					<td><h2>FRAME XFER</h2></td>
					<td><h2>{ detectorMode.xfer }</h2></td>
				</tr>
				<tr>
					<td><h2>NORMAL</h2></td>
					<td><h2>{ detectorMode.normal }</h2></td>
				</tr>
				<tr>
					<td><h2>SLOT</h2></td>
					<td><h2>{ detectorMode.slot }</h2></td>
				</tr>
				</tbody>
			</table>
		</div>
	)
};

SALTICAMStatistics.propTypes = {
	proposals: propTypes.array.isRequired,
};

export default SALTICAMStatistics;