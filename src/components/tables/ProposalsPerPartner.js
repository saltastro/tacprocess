import React from "react";
import propTypes from "prop-types";
import _ from "lodash";
import CSVReader from 'react-csv-reader'
import { illegalAllocation } from "../../util/allocation";
import { goodTime, badTime } from "../../types"


const TimeAllocationInput = ({onChange, proposal, priority, partner, name}) => {
	const sty = illegalAllocation(proposal, priority, partner) ? badTime : goodTime;
	return (
		<div>
			<div>{`${proposal.proposalCode} (${priority.toUpperCase()})`}</div>
			<div>
				<input type="text"
				       value={proposal.allocatedTime[partner][priority]}
				       style={sty}
				       className="width-100"
				       name={name}
				       onChange={onChange}/>
			</div>
		</div>
	);
};

const handleDarkSideForce = (data, proposals, partner) => {
	console.log(partner, data, proposals);
};

const ProposalsPerPartner = ({proposals, partner, submitForPartner, tacCommentChange,  allocationChange,
                                 allocatedTimeChange, canAllocate, canComment, submitted, updateFromCSV}) => {
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
					<th>Hover Info</th>
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
								<td><div id={"propCode"} className="width-150 padding-8" >{ p.proposalCode }</div></td>
								<td><div id={"propTitle"} className="table-height width-300" >{ p.title }</div></td>
								<td><div id={"propAbstract"} className="table-height width-400" >{ p.abstract }</div></td>
								<td id={"propPI"}>{ p.pi }</td>
								<td id={"propSemester"}>2017-1</td>
								<td id={"propComment"}>
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
								<td><div id={"propMinTime"} className="table-height width-100" >{ p.minTime }</div></td>
								<td><div id={"propRequestTime"} className="table-height width-100" >{ p.totalRequestedTime }</div></td>
								<td id={"propCanAllocateP0"}>
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
								<td id={"propCanAllocateP1"}>
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
								<td id={"propCanAllocateP2"}>
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
								<td id={"propCanAllocateP3"}>
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
								<td><div id={"propTotalP0P3"} className="table-height width-100" >{
									parseFloat(p.allocatedTime[partner]["p0"] || 0 ) +
									parseFloat(p.allocatedTime[partner]["p1"] || 0 ) +
									parseFloat(p.allocatedTime[partner]["p2"] || 0 ) +
									parseFloat(p.allocatedTime[partner]["p3"] || 0 )
								}</div></td>
								<td id={"propCanAllocateP4"}>
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
								<td><div id={"propBoolean"} className="table-height width-100" >false</div></td>
								<td><div id={"propTranparency"} className="table-height width-100" >{ p.transparency }</div></td>
								<td><div id={"propMaxSeeing"} className="table-height width-100" >{ p.maxSeeing }</div></td>
								<td><div id={"propEmpty"} className="table-height width-100" ></div></td>
								<td><div id={"propTechReport"} className="table-height width-400" >{ p.techReport } </div></td>
							</tr>
						)})
				}
				
				</tbody>
			</table>
			
			{
				
				submitted.submitted ?
					<div><br />
						{!!submitted.partner && submitted.partner === partner ? <div className="pass-div"> <h2> Submitted</h2> </div> :  <br /> }
						<button className="btn-success" onClick={ e => submitForPartner(e, partner) }>Submit {partner}</button>
					</div> :
					submitted.partner === partner ?
						<div className="fail-div">
							<h2> Fail to submit</h2>
							<h3>please make sure that all allocation for partner "{submitted.partner}" are correct <br />or you do not have tailing " \ " on your comment</h3>
							<button className="btn-fail" onClick={ e => submitForPartner(e, partner) }>Submit {partner}</button>
						</div> :
						<div><br />
							<button className="btn-success" onClick={ e => submitForPartner(e, partner) }>Submit {partner}</button>
						</div>
			}
			<CSVReader
				cssClass="csv-input"
				label="Select CSV"
				onFileLoaded={e => updateFromCSV(e, arrayOfProposals, partner)}
				onError={handleDarkSideForce}
			/>
		</div>
	)};

ProposalsPerPartner.propTypes = {
	proposals: propTypes.array.isRequired,
	partner: propTypes.string.isRequired,
	allocationChange: propTypes.func.isRequired,
	allocatedTimeChange: propTypes.func.isRequired,
	tacCommentChange: propTypes.func.isRequired,
	submitForPartner: propTypes.func.isRequired,
	exportTableToCSV: propTypes.func.isRequired,
	updateFromCSV: propTypes.func.isRequired,
	canAllocate: propTypes.bool,
	canComment: propTypes.bool,
	submitted: propTypes.object,
};

export default ProposalsPerPartner;