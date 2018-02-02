import React from 'react';
import propTypes from "prop-types";
import '../../styles/components/tables.css';
import { canDo, astronomerAssigned, isReviewerAssigned, didProposalReporterChange } from '../../util/index';
import { CHANGE_LIAISON, SELF_ASSIGN_TO_PROPOSAL } from "../../types";
import {canAssignOtherReviewer} from "../../util";

export const SATable = ({proposals, user, SALTAstronomers, techReportChange, semester, technicalReviewer, unAssign, initProposals}) => {
	if (proposals.length === 0 ){
		return (<br />)
	}
	
	// compare astronomers by their first name
	const compareByFirstName = (a, b) => {
		const name1 = a.name.toUpperCase();
		const name2 = b.name.toUpperCase();
		if (name1 < name2) {
			return -1;
		}
		if (name1 > name2) {
			return 1;
		}
		return 0;
	};
	
	const saltAstronomerName = (username) => {
		const name = (SALTAstronomers).find(a => {
			return a.username === username
		});
		return name ? name.name : null;
	};
	
	return(
		<div className='SATableDiv'>
			<h1>Salt Astronomers Proposal Assigning</h1>
			<table className='SATable' align='center'>
				<thead>
				<tr>
					<th>Proposal Code</th>
					<th>Proposal Title</th>
					<th>Proposal Investigator</th>
					{semester >= "2018-1"? <th>Feasible</th> : <td />}
					<th>Proposal Comment</th>
					{semester >= "2018-1"? <th>Detailed check</th> : <td />}
					<th>Assigned Astronomer</th>
				</tr>
				</thead>
				<tbody>
				{
					proposals.map( p => {
						return(
							<tr key={p.proposalId}>
								<td className="width-150"><a target="_blank" href={`https://www.salt.ac.za/wm/proposal/${p.proposalCode}`}>{ p.proposalCode }</a></td>
								<td className=" table-height width-400">{ p.title }</td>
								<td className="width-100">{p.pi}</td>
								{
									semester >= "2018-1"?
										<td >
											<select
												defaultValue={p.techReport.feasible}
												onChange={e =>
													techReportChange(p.proposalCode, e.target.value, "feasible")
												}>
												<option>{"none"}</option>
												<option>{"yes"}</option>
												<option>{"yes with caveats"}</option>
												<option>{"no"}</option>
											</select>
										</td> : <td />}
								<td className="width-100">
                    <textarea
	                    className="table-height-fixed width-400"
	                    value={ semester >= "2018-1"? p.techReport.comment || "" : p.techReport || "" }
	                    onChange={  semester >= "2018-1"? e =>{
		                    techReportChange(p.proposalCode, e.target.value, "comment")
	                    } : e => e}
                    >

                    </textarea>
								</td>
								{
									semester >= "2018-1"?
										<td className="width-100">
											<select
												defaultValue={p.techReport.details}
												onChange={e =>
													techReportChange(p.proposalCode, e.target.value, "details")}>
												<option>{"none"}</option>
												<option>{"yes"}</option>
												<option>{"no"}</option>
											</select>
										</td> : <td />
								}
								<td className="width-150">
									{
										canAssignOtherReviewer(user.roles) ?
											!isReviewerAssigned(p) ?
												<div>
													<input
														style={{textSize: "20px"}}
														type={"checkbox"}
														value={user.username}
														onChange={e => {
															technicalReviewer(p.proposalCode, e.target.value)
														}}/> <label>Assign Yourself</label>
												</div>
													:
												<div>
													<label>{ saltAstronomerName(p.reviewer) }</label>
													{didProposalReporterChange(p, initProposals) ?
														<section>
															<button onClick={() => unAssign(p.proposalCode)}>unassign</button>
														</section>
															:<a/>}
														
												</div>
												:
											isReviewerAssigned(p) ?
												<select disabled={semester >= "2018-1"} value={p.reviewer ? p.reviewer : ''} onChange={e => {technicalReviewer(p.proposalCode, e.target.value ? e.target.value : null)}}>
													<option value="">none</option>
													{
														SALTAstronomers.sort(compareByFirstName).map(astronomer => (
															<option
																key={astronomer.username}
																value={astronomer.username}
															>
																{saltAstronomerName(astronomer.username)}
															</option>
														))
													}
												</select>
													:
												<select disabled={semester >= "2018-1"} value={p.reviewer ? p.reviewer : ''} onChange={e => {technicalReviewer(p.proposalCode, e.target.value ? e.target.value : null)}}>
													{
														SALTAstronomers.sort(compareByFirstName).map(astronomer => (
															<option
																key={astronomer.username}
																value={astronomer.username}
															>
																{saltAstronomerName(astronomer.username)}
															</option>
														))
													}
												</select>
									}
								</td>
							</tr>
						);})
				}
				</tbody>
			</table>
		</div>
	);
};

SATable.propTypes = {
	proposals: propTypes.array.isRequired,
	user: propTypes.object.isRequired,
	SALTAstronomers: propTypes.array.isRequired,
	technicalReviewer: propTypes.func.technicalReviewer,
	techReportChange: propTypes.func.isRequired,
	unAssign: propTypes.func,
	proposalsFilter: propTypes.string,
	semester: propTypes.string.isRequired,
	initProposals: propTypes.array,
};
