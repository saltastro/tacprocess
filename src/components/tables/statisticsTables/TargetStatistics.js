import React from "react";
import propTypes from "prop-types";

const countTargets = targets => {
	return targets.reduce( (current, next) => {
		if (next.optional){
			return {...current, optional: current.optional + 1}
		} else {
			return {...current, mandatory: current.mandatory + 1}
		}
		
	}, {optional: 0, mandatory: 0});
};

const TargetStatistics = ({targets}) => {
	const count = countTargets(targets);
	console.log("LLL", count);
	return(
		<div className={"stat-item"} style={{textAlign: "center", width: "100%"}}>
			<h2>Target Statistics</h2>
			<table className="stat-table"  style={ { height: "90%"}}>
				<thead>
				<tr>
					<th/>
					<th>Totals</th>
				</tr>
				</thead>
				<tbody>
				<tr>
					<td>Number of Targets</td>
					<td>{ count.mandatory + count.optional }</td></tr>
				<tr>
					<td>Number of Mandatory Targets</td>
					<td>{ count.mandatory } </td></tr>
				<tr>
					<td>Number of Optional Targets  </td>
					<td>{ count.optional } </td></tr>
				</tbody>
			</table>
		</div>
	)
};

TargetStatistics.propTypes = {
	targets: propTypes.array.isRequired,
};

export default TargetStatistics;