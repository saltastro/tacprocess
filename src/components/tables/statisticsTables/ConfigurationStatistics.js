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


const ConfigurationsStatistics = ({proposals}) => {
	const count = countInstruments (proposals);
	return(
		<div>
			<h2>Configuration Statistics</h2>
			<table className="stat-table">
				<thead>
				<tr>
					<th>Instruments</th>
					<th>Number of Proposals</th>
				</tr>
				</thead>
				<tbody>
				<tr>
					<td>RSS</td>
					<td>{ count.rss }</td>
				</tr>
				<tr>
					<td>SALTICAM</td>
					<td>{ count.scam }</td>
				</tr>
				<tr>
					<td>HRS</td>
					<td>{ count.hrs }</td>
				</tr>
				<tr>
					<td>BVIT</td>
					<td>{ count.bvit }</td>
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