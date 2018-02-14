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

const HRSStatistics = (proposals) => {
	
	
	const exposure = countHRSExposure(proposals);
    return(
        <div>
	        <table className="table center-table">
		        <thead>
		        <tr>
			        <th><h2>Exposure mode</h2></th>
			        <th><h2>Number of Proposals</h2></th>
		        </tr>
		        </thead>
		        <tbody>
		        <tr>
			        <td><h2>HIGH RESOLUTION</h2></td>
			        <td><h2>{ exposure.hr }</h2></td>
		        </tr>
		        <tr>
			        <td><h2>HIGH STABILITY</h2></td>
			        <td><h2>{ exposure.hs }</h2></td>
		        </tr>
		        <tr>
			        <td><h2>INT CAL FIBRE</h2></td>
			        <td><h2>{ exposure.icf }</h2></td>
		        </tr>
		        <tr>
			        <td><h2>LOW RESOLUTION</h2></td>
			        <td><h2>{ exposure.lr }</h2></td>
		        </tr>
		        <tr>
			        <td><h2>MEDIUM RESOLUTION</h2></td>
			        <td><h2>{ exposure.mr }</h2></td>
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