import React from "react";
import propTypes from "prop-types";

const proposalsFilter = proposals => {
	const newProposals = [];
	const longTermProposals = [];
	proposals
	.forEach( p => {
		if (p.isNew){
			newProposals.push(p)
		}
		
		if (p.isLong) {
			longTermProposals.push(p)
		}
		return p
	});
	return {
		longTermProposals,
		newProposals
	};
};

const getMatch = (a, b) => {
	const matches = [];
	
	for ( let i = 0; i < a.length; i++ ) {
		for ( let e = 0; e < b.length; e++ ) {
			if ( a[i] === b[e] ) matches.push( a[i] );
		}
	}
	return matches;
};

const ProposalCountTable = ({proposals}) => {
	const newAndLong = proposalsFilter(proposals);
	return(
		<div className={"stat-item"}>
			<h2>Submitted Proposals</h2>
			<table className="stat-table">
				<thead>
				<tr>
					<th />
					<th>Total</th>
				</tr>
				</thead>
				<tbody>
				<tr>
					<td>New proposals plus older proposals</td>
					<td>{proposals.length}</td>
				</tr>
				<tr>
					<td>New proposals </td>
					<td>{newAndLong.newProposals.length}</td>
				</tr>
				<tr>
					<td>Older Proposals </td>
					<td>{proposals.length - newAndLong.newProposals.length}</td>
				</tr>
				<tr>
					<td>All long term proposals </td>
					<td>{newAndLong.longTermProposals.length}</td>
				</tr>
				<tr>
					<td>New long term proposals </td>
					<td>{getMatch(newAndLong.longTermProposals, newAndLong.newProposals).length}</td>
				</tr>
				</tbody>
			</table>
		</div>
	);
};


ProposalCountTable.propTypes = {
	proposals: propTypes.array.isRequired ,
};

export default ProposalCountTable;
