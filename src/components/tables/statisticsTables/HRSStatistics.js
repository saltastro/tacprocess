import React from "react";
import propTypes from "prop-types";

function countHRSExposure(proposals) {
	let expo = {
		hr: 0,
		hs: 0,
		icf: 0,
		lr: 0,
		mr: 0,
	};
	(proposals|| []).forEach(p => {
		p.instruments.hrs.forEach( m => {
			if (m.exposureMode === "HIGH RESOLUTION") {expo.hr += 1}
			if (m.exposureMode === "MEDIUM RESOLUTION") {expo.mr += 1}
			if (m.exposureMode === "LOW RESOLUTION") {expo.lr += 1}
			if (m.exposureMode === "HIGH STABILITY") {expo.hs += 1}
			if (m.exposureMode === "INT CAL FIBRE") {expo.icf += 1}
		})
	});
	return expo
}

const HRSStatistics = ({proposals}) => {


	const exposure = countHRSExposure(proposals);
	return(
		<div  className={"stat-item"} style={{textAlign: "center"}}>
			<table className="stat-table">
				<thead>
				<tr>
					<th>Exposure mode</th>
					<th>Number of configurations</th>
				</tr>
				</thead>
				<tbody>
				<tr>
					<td>HIGH RESOLUTION</td>
					<td>{ exposure.hr }</td>
				</tr>
				<tr>
					<td>HIGH STABILITY</td>
					<td>{ exposure.hs }</td>
				</tr>
				<tr>
					<td>INT CAL FIBRE</td>
					<td>{ exposure.icf }</td>
				</tr>
				<tr>
					<td>LOW RESOLUTION</td>
					<td>{ exposure.lr }</td>
				</tr>
				<tr>
					<td>MEDIUM RESOLUTION</td>
					<td>{ exposure.mr }</td>
				</tr>
				</tbody>
			</table>
		</div>
	)
};

HRSStatistics.propTypes = {
	proposals: propTypes.array.isRequired,
};

export default HRSStatistics;
