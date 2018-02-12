import React from "react";
import propTypes from "prop-types";

export function countInstruments (proposals){
	const count = {
		rss: 0,
		hrs: 0,
		scam: 0,
		bvit: 0,
	};
	 (proposals || []).forEach( p => {
	    count.rss += p.instruments.rss.length > 0 && 1;
	    count.hrs += p.instruments.hrs.length > 0 && 1;
	    count.scam += p.instruments.scam.length > 0 && 1;
	    count.bvit += p.instruments.bvit.length > 0 && 1;
	});
	return count
 
}


const ConfigurationsStatistics = (proposals) => {
	const count = countInstruments (proposals);
	return(
		<div>
			<h1>Configuration Statistics</h1>
			<table className="table center-table">
				<thead>
				<tr>
					<th><h2>Instruments</h2></th>
					<th><h2>Number of Proposals</h2></th>
				</tr>
				</thead>
				<tbody>
				<tr>
					<td><h2>RSS</h2></td>
					<td><h2>{ count.rss }</h2></td>
				</tr>
				<tr>
					<td><h2>SALTICAM</h2></td>
					<td><h2>{ count.scam }</h2></td>
				</tr>
				<tr>
					<td><h2>HRS</h2></td>
					<td><h2>{ count.hrs }</h2></td>
				</tr>
				<tr>
					<td><h2>BVIT</h2></td>
					<td><h2>{ count.bvit }</h2></td>
				</tr>
				</tbody>
			</table>
		</div>
	)
};

ConfigurationsStatistics.propTypes = {
	proposals: propTypes.array.isRequired
};

export default ConfigurationsStatistics