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
		p.instruments.scam.forEach( m => {
			if (m.detectorMode === "NORMAL") {expo.normal += 1}
			if (m.detectorMode === "SLOT") {expo.slot += 1}
			if (m.detectorMode === "DRIFTSCAN") {expo.dscan += 1}
			if (m.detectorMode === "FRAME XFER") {expo.xfer += 1}
		})
	});
	return expo
}

const SALTICAMStatistics = ({proposals}) => {
	const detectorMode = countSCAMDetector(proposals);
	return(
		<div  className={"stat-item"} style={{textAlign: "center"}}>
			<table className="stat-table">
				<thead>
				<tr>
					<th>Detector mode</th>
					<th>Number of Proposals</th>
				</tr>
				</thead>
				<tbody>
				<tr>
					<td>DRIFT SCAN</td>
					<td>{ detectorMode.dscan }</td>
				</tr>
				<tr>
					<td>FRAME XFER</td>
					<td>{ detectorMode.xfer }</td>
				</tr>
				<tr>
					<td>NORMAL</td>
					<td>{ detectorMode.normal }</td>
				</tr>
				<tr>
					<td>SLOT</td>
					<td>{ detectorMode.slot }</td>
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