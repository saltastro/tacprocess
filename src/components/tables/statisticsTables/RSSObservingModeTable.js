import React from "react";
import propTypes from "prop-types";

function countRSSDetector(proposals) {
	let obz = {
		fp: 0,
		fpp: 0,
		im: 0,
		mosp: 0,
		mos: 0,
		pi: 0,
		sp: 0,
		spec: 0,
	};
	(proposals|| []).forEach(p => {
		p.instruments.rss.forEach( m => {
			if (m.mode === "Fabry Perot") {obz.normal += 1}
			if (m.mode === "FP polarimetry") {obz.slot += 1}
			if (m.mode === "Imaging") {obz.dscan += 1}
			if (m.mode === "MOS") {obz.dscan += 1}
			if (m.mode === "MOS polarimetry") {obz.shuffle += 1}
			if (m.mode === "Polarimetric imaging") {obz.xfer += 1}
			if (m.mode === "Spectropolarimetry") {obz.dscan += 1}
			if (m.mode === "Spectroscopy") {obz.dscan += 1}
		})
	});
	return obz
}

const RSSObservingModeTable = (proposals) => {
	const observingMode =countRSSDetector(proposals);
	return(
		<div>
			<table className="table center-table">
				
				{/* RSS Observing mode */}
				<thead>
				<tr>
					<th><h2>Observing mode</h2></th>
					<th><h2>Number of Proposals</h2></th>
				</tr>
				</thead>
				<tbody>
				<tr>
					<td><h2>Fabry Perot</h2></td>
					<td><h2>{ observingMode.fp }</h2></td>
				</tr>
				<tr>
					<td><h2>FP polarimetry</h2></td>
					<td><h2>{ observingMode.fpp }</h2></td>
				</tr>
				
				<tr>
					<td><h2>MOS</h2></td>
					<td><h2>{ observingMode.mos }</h2></td>
				</tr>
				<tr>
					<td><h2>MOS polarimetry</h2></td>
					<td><h2>{ observingMode.mosp }</h2></td>
				</tr>
				<tr>
					<td><h2>Polarimetric imaging</h2></td>
					<td><h2>{ observingMode.pi }</h2></td>
				</tr>
				<tr>
					<td><h2>Imaging</h2></td>
					<td><h2>{ observingMode.im }</h2></td>
				</tr>
				<tr>
					<td><h2>Spectropolarimetry</h2></td>
					<td><h2>{ observingMode.sp }</h2></td>
				</tr>
				<tr>
					<td><h2>Spectroscopy</h2></td>
					<td><h2>{ observingMode.spec }</h2></td>
				</tr>
				</tbody>
			
			</table>
		</div>
	)
};

RSSObservingModeTable.propTypes = {
	proposals: propTypes.array.isRequired,
}

export default RSSObservingModeTable;