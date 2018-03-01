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

const RSSDetectorModeTable = ({proposals}) => {
	const detectorMode =countRSSDetector(proposals);
    return(
        <div className={"stat-item"} style={{textAlign: "center", width: "100%"}}>
	        <h2>RSS Detector Mode</h2>
	        <table className="stat-table">
		        {/* RSS Dictator mode */}
		        <thead>
		        <tr>
			        <th>Detector mode</th>
			        <th>Number of configurations</th>
		        </tr>
		        </thead>
		        <tbody>
		        <tr>
			        <td>DRIFT SCAN</td>
			        <td>{ detectorMode.dscan }</td>
		        </tr>
		        <tr>
			        <td>FRAME TRANSFER</td>
			        <td>{ detectorMode.xfer }</td>
		        </tr>
		        <tr>
			        <td>NORMAL</td>
			        <td>{ detectorMode.normal }</td>
		        </tr>
		        <tr>
			        <td>SHUFFLE</td>
			        <td>{ detectorMode.shuffle }</td>
		        </tr>
		        <tr>
			        <td>SLOT MODE</td>
			        <td>{ detectorMode.slot }</td>
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