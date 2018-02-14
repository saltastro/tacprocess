import React from "react";
import propTypes from "prop-types";

function countRSSDetector(proposals) {
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
			if (m.detectorMode === "SLOT MODE") {expo.slot += 1}
			if (m.detectorMode === "DRIFT SCAN") {expo.dscan += 1}
			if (m.detectorMode === "SHUFFLE") {expo.shuffle += 1}
			if (m.detectorMode === "FRAME TRANSFER") {expo.xfer += 1}
		})
	});
	return expo
}

const RSSDetectorModeTable = (proposals) => {
	const detectorMode =countRSSDetector(proposals);
    return(
        <div>
	        <table className="table center-table">
		        {/* RSS Dictator mode */}
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
			        <td><h2>FRAME TRANSFER</h2></td>
			        <td><h2>{ detectorMode.xfer }</h2></td>
		        </tr>
		        <tr>
			        <td><h2>NORMAL</h2></td>
			        <td><h2>{ detectorMode.normal }</h2></td>
		        </tr>
		        <tr>
			        <td><h2>SHUFFLE</h2></td>
			        <td><h2>{ detectorMode.shuffle }</h2></td>
		        </tr>
		        <tr>
			        <td><h2>SLOT MODE</h2></td>
			        <td><h2>{ detectorMode.slot }</h2></td>
		        </tr>
		        </tbody>
	        </table>
        </div>
    )
};

RSSDetectorModeTable.propTypes = {
    proposals: propTypes.array.isRequired,
}

export default RSSDetectorModeTable;