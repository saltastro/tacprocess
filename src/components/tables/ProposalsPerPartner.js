import React from "react";
import propTypes from "prop-types";
import _ from "lodash";
import { illegalAllocation } from "../../util/allocation";
import { goodTime, badTime } from "../../types"
import { getTechnicalReport } from "../../util/technicalReports";


const TimeAllocationInput = ({onChange, proposal, priority, partner, name}) => {
	const sty = illegalAllocation(proposal, priority, partner) ? badTime : goodTime;
	return (
		<div>
			<div>{`${proposal.proposalCode} (${priority.toUpperCase()})`}</div>
			<div>
				<input type="text"
				       value={!!proposal.allocatedTime[partner] ? proposal.allocatedTime[partner][priority] : 0}
				       style={sty}
				       className="width-100"
				       name={name}
				       onChange={onChange}/>
			</div>
		</div>
	);
};

const ProposalsPerPartner = ({proposals, partner, submitForPartner, tacCommentChange,  allocationChange,
                                 allocatedTimeChange, canAllocate, semester}) => {
	const arrayOfProposals = proposals || [];
	
	return(
		<div className="scroldiv">
			<h1>{partner}</h1>
			<table id={"propPerPartner"}>
				<thead>
				<tr>
					<th>Code</th>
					<th>Title</th>
					<th>Abstract</th>
					<th>PI</th>
					<th>Semester</th>
					<th>TAC comment</th>
					<th>Minimum useful time</th>
					<th>Total Requested Time</th>
					<th>P0</th>
					<th>P1</th>
					<th>P2</th>
					<th>P3</th>
					<th>Total P0-P3</th>
					<th>P4</th>
					<th>Act on Alert</th>
					<th>Transparency</th>
					<th>Max seeing</th>
					<th>Tech Report</th>
				</tr>
				</thead>
				<tbody>
				{
					arrayOfProposals
					.filter(p => !_.isNull(p.title))
					.map( p => {
						return (
							<tr key={p.proposalId}>
								<td><div className="width-150 padding-8" ><a target="_blank" href={`https://www.salt.ac.za/wm/proposal/${p.proposalCode}`}>{ p.proposalCode }</a></div></td>
								<td><div className="table-height width-300" >{ p.title }</div></td>
								<td><div className="table-height width-400" >{ p.abstract }</div></td>
								<td>{ p.pi }</td>
								<td>{semester}</td>
								<td>
									{ canAllocate ?
										<textarea
											id={ p.proposalCode }
											name="tac-comment"
											value={ !!p.tacComment[partner] ? p.tacComment[partner]["comment"] : "" }
											className="table-height-fixed width-400"
											onChange={ e =>
												tacCommentChange(e, p.proposalCode, partner) }
										/> : <div className="table-height-fixed width-400" >
											{  p.tacComment[partner].comment }
										</div>
									}
								</td>
								<td><div className="table-height width-100" >{
									p.minTime ? p.minTime : "Not Available"
								}</div></td>
								<td><div className="table-height width-100" >{ p.totalRequestedTime }</div></td>
								<td>
									{ canAllocate ?
										<TimeAllocationInput

											onChange={ e =>
												allocatedTimeChange(e, p.proposalCode, partner)
											}
											name="p0"
											proposal={p}
											partner={partner}
											priority="p0"/> : <div className="width-100">{ p.allocatedTime[partner]["p0"] }</div>
									}
								</td>
								<td>
									{ canAllocate ?
										<TimeAllocationInput

											onChange={ e =>
												allocatedTimeChange(e, p.proposalCode, partner)
											}
											name="p1"
											proposal={p}
											partner={partner}
											priority="p1"/> : <div className="width-100">{ p.allocatedTime[partner]["p1"] }</div>
									}
								</td>
								<td>
									{ canAllocate ?
										<TimeAllocationInput

											onChange={ e =>
												allocatedTimeChange(e, p.proposalCode, partner)
											}
											name="p2"
											proposal={p}
											partner={partner}
											priority="p2"/> : <div className="width-100">{ p.allocatedTime[partner]["p2"] }</div>
									}
								</td>
								<td>
									{ canAllocate ?
										<TimeAllocationInput

											onChange={ e =>
												allocatedTimeChange(e, p.proposalCode, partner)
											}
											name="p3"
											proposal={p}
											partner={partner}
											priority="p3"/> : <div className="width-100">{ p.allocatedTime[partner]["p3"] }</div>
									}
								</td>
								<td><div className="table-height width-100" >{
									parseFloat(!!p.allocatedTime[partner] ? p.allocatedTime[partner]["p0"] : 0 ) +
									parseFloat(!!p.allocatedTime[partner] ? p.allocatedTime[partner]["p1"] : 0 ) +
									parseFloat(!!p.allocatedTime[partner] ? p.allocatedTime[partner]["p2"] : 0 ) +
									parseFloat(!!p.allocatedTime[partner] ? p.allocatedTime[partner]["p3"] : 0 )
								}</div></td>
								<td>
									{ canAllocate ?
										<TimeAllocationInput

											onChange={ e =>
												allocatedTimeChange(e, p.proposalCode, partner)
											}
											name="p4"
											proposal={p}
											partner={partner}
											priority="p4"/> : <div className="width-100">{ p.allocatedTime[partner]["p4"] }</div>
									}
								</td>
								<td><div className="table-height width-100" >{ `${p.actOnAlert}` }</div></td>
								<td><div className="table-height width-100" >{ p.transparency }</div></td>
								<td><div className="table-height width-100" >{ p.maxSeeing }</div></td>
								<td><div className="table-height width-400" >{ getTechnicalReport(p, semester, 'jsx') }</div></td>
							</tr>
						)})
				}

				</tbody>
			</table>
		</div>
	)};

ProposalsPerPartner.propTypes = {
	proposals: propTypes.array.isRequired,
	partner: propTypes.string.isRequired,
	semester: propTypes.string.isRequired,
	allocationChange: propTypes.func.isRequired,
	allocatedTimeChange: propTypes.func.isRequired,
	tacCommentChange: propTypes.func.isRequired,
	canAllocate: propTypes.bool,
	canComment: propTypes.bool,
	submitted: propTypes.object,
};

export default ProposalsPerPartner;