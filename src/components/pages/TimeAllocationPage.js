/* eslint-disable */
import React from "react";
import { connect } from "react-redux"
import CSVReader from 'react-csv-reader'
import {CSVLink} from 'react-csv';
import {saveAs} from 'file-saver';
import AvailableTimePerPartnerTable from "../tables/AvailableTimePerPartnerTable";
import ProposalsPerPartner from "../tables/ProposalsPerPartner";
import {getQuaryToAddAllocation } from "../../util/allocation";
import {canUserWriteAllocations, canUserWriteTechComments, downloadSummaries, makeTechComment} from "../../util";
import PartnerProposals  from "../../util/proposal";
import { submitAllocations } from "../../api/graphQL";
import { updateProposals } from "../../actions/proposalsActions";
import { startSubmittingTimeAllocations, TimeAllocationSubmittedSuccessfully, failToSubmitTimeAllocations } from "../../actions/timeAllocationActions";
import { ALL_PARTNER } from "../../types";
import { getPartnerList, listForDropdown } from "../../util/filters";
import { jsonClient } from '../../api/api';
import { checkColumns, getIndexOfColumns, updateProposalFromCSV } from "../../util/uploadCsv";
import {updateTacComment, updateAllocatedTimePriority} from "../../actions/TimeAllocationsActions";


class TimeAllocationPage extends React.Component {

	submitForPartner(event, partner) {
		const { proposals, user, dispatch, semester } = this.props;
		const ppp = PartnerProposals(proposals.proposals, getPartnerList(user.user.roles), semester);

		const query = getQuaryToAddAllocation(ppp[partner],
			partner,
			semester
		);
		dispatch(startSubmittingTimeAllocations(partner));
		submitAllocations(query).then(p => p.data, dispatch(failToSubmitTimeAllocations(partner)))
		.then(d => {
			d.data.updateTimeAllocations.success ? dispatch(TimeAllocationSubmittedSuccessfully(partner)) : dispatch(failToSubmitTimeAllocations(partner, 'Something went pear-shaped...'))
		});
	}

	allocationChange(event, proposalCode, priority, partner) {

		const proposals = this.props;
		const value = event.target.value;
		const updatedProposals = proposals.proposals.map(p => {
			if (p.proposalCode === proposalCode) {
				p.allocatedTime[partner][priority] = value
			}
			return p
		});
		data.dispatch(updateProposals(updatedProposals))
	}

	allocatedTimeChange = (event, proposalCode, partner) => {
		const { dispatch, semester } = this.props;
		const time = event.target.value;
		const priority = event.target.name;
		dispatch(updateAllocatedTimePriority(proposalCode, semester, partner, time, priority))
	};

	tacCommentChange(event, proposalCode, partner) {
		const { dispatch, semester } = this.props;
		const tacComment = event.target.value;
		dispatch(updateTacComment(proposalCode, semester, partner, tacComment))
	}

	/*
* This method setup the csv file content as it appears in the time allocation page table.
* and returns that data to use in the react-csv Component for downloading.
*/
	CSVData = (proposals, partner) => {
		let tableDataHeaders = [
			"Code", "Title", "Abstract", "PI", "Semester", "TAC comment", "Minimum useful time",
			"Total Requested Time", "P0", "P1", "P2", "P3", "P4",

			  "Transparency", "Max seeing", "Tech Report"
		];
		const semester = this.props.semester;
		return [
			tableDataHeaders,
			...proposals.map(p => {
				return [
				p.proposalCode, p.title, p.abstract, p.pi, semester,
				!!p.tacComment[partner]? p.tacComment[partner].comment : "",
				p.minTime, p.totalRequestedTime,
				!!p.allocatedTime[partner] ? p.allocatedTime[partner]["p0"] : 0,
				!!p.allocatedTime[partner] ? p.allocatedTime[partner]["p1"] : 0,
				!!p.allocatedTime[partner] ? p.allocatedTime[partner]["p2"] : 0,
				!!p.allocatedTime[partner] ? p.allocatedTime[partner]["p3"] : 0,
				!!p.allocatedTime[partner] ? p.allocatedTime[partner]["p4"] : 0,

				  p.transparency, p.maxSeeing, makeTechComment(p.techReviews[semester])
			]})
		];
	};


	updateFromCSV = (data, proposals, partner) => {
		const { dispatch } = this.props;
		let allColumns = false;
		let columnIndex = {};
		let updatedProposals = proposals;
		(data || []).forEach( (r, i) => {
			if (i === 0) {
				allColumns = checkColumns(r);
				if (allColumns){
					columnIndex = getIndexOfColumns(r)
				}
			} else if(allColumns){
				updatedProposals = updateProposalFromCSV(proposals, partner, r, columnIndex)
			}
		});
		dispatch(updateProposals(updatedProposals));
	};

	handleDarkSideForce = (data, proposals, partner) => {
		console.log(partner, data, proposals);
	};


	/*
	* The exportTableToCSV() function creates CSV data from table HTML and
	* download CSV data as a file by using the downloadCSV() function
	*/

	exportTableToCSV = filename => {
		let csv = [];
		let rows = document.querySelectorAll("#propPerPartner tr");

		for (let i = 0; i < rows.length; i++) {
			let row = [];
			let cols = rows[i].querySelectorAll("th, #propCode, #propTitle, #propAbstract, #propPI, #propSemester,"
				+ "#propComment, #propMinTime, #propRequestTime, #propCanAllocateP0, #propCanAllocateP1, #propCanAllocateP2,"
				+ "#propCanAllocateP3, #propCanAllocateP4, #propTotalP0P3, #propBoolean, #propTranparency, #propMaxSeeing, #propEmpty, #propTechReport ");

			for (let j = 0; j < cols.length; j++) {
				if (cols[j].nodeName === "TEXTAREA") {
					let cleanText = cols[j].value;
					cleanText = cleanText.replace(/([,\n])/gm, " ");
					row.push(cleanText);
				}
				else {
					let cleanText = cols[j].innerText;
					cleanText = cleanText.replace(/([,\n])/gm, " ");
					row.push(cleanText);
				}
			}

			csv.push(row.join(","));
		}

		// Download CSV file
		this.downloadCSV(csv.join("\n"), filename);
	};

	render() {
		const {allocatedTime, filters, user, tac, semester } = this.props;
		const { unSubmittedTacChanges, submittedTimeAllocations } = this.props.proposals;
		const proposals = this.props.proposals.proposals || [];
		let partners = listForDropdown(getPartnerList(this.props.user.user.roles || []));

		if (filters.selectedPartner !== ALL_PARTNER) {
			partners = filters.selectedPartner ? [{value: filters.selectedPartner, label: filters.selectedPartner}] : []
		}
		const partnerProposals = PartnerProposals(proposals, getPartnerList(this.props.user.user.roles || []), semester);

		return (
			<div>
				{
					tac.submiting ? (<div><h1>Submitting...</h1></div>) : partners.map(part => {
						const partner = part.value;
						if (partner === ALL_PARTNER){
							return null;
						}
						if ((partnerProposals[partner] || []).length === 0){
							return null;
						}

						return (
							<div key={partner}>
								<AvailableTimePerPartnerTable
									proposals={partnerProposals[partner] || []}
									partner={partner}
									availableTime={allocatedTime}
								/>
								<ProposalsPerPartner
									proposals={partnerProposals[partner] || []}
									partner={partner}
									semester={semester}
									tacCommentChange={this.tacCommentChange.bind(this)}
									allocationChange={this.allocationChange.bind(this)}
									canAllocate={canUserWriteAllocations(user.user, partner) || false}
									canComment={canUserWriteTechComments(user.user, partner) || false}
									exportTableToCSV={this.exportTableToCSV.bind(this)}
									submitted={tac}
									allocatedTimeChange = {this.allocatedTimeChange}
									updateFromCSV = {this.updateFromCSV.bind(this)}
								/>
								<label>Download table</label><br/>
								<button className="btn"><CSVLink
									data={this.CSVData(partnerProposals[partner] || [], partner)}
									filename={`${partner}-time-allocations.csv`}>Download</CSVLink></button>
								<br/><label>Upload Allocations from CSV</label><br/>
								<CSVReader
									cssClass="btn"
									onFileLoaded={e => this.updateFromCSV(e, partnerProposals[partner] || [], partner)}
									onError={this.handleDarkSideForce}
								/>

								<button onClick={() => downloadSummaries(partnerProposals[partner] || [])}>
									Download summary files
								</button>
								<button
									disabled={semester < "2018-1"}
									className="btn-success"
									onClick={ e => this.submitForPartner(e, partner) }>Submit {partner}</button>
								{
									!unSubmittedTacChanges[partner] ? <div /> : <div style={{ color: '#F0F060', fontSize: '20px'}}>Change detected</div>
								}
								{
									submittedTimeAllocations.partner !== partner ? <div />
										: submittedTimeAllocations.results ? <div style={{ color: '#60FF60', fontSize: '20px'}}>Successfully Submitted</div>
										: <div  style={{ color: '#FF6060', 'fontSize': '20px' }}>Fail to submit time allocations</div>

								}

							</div>
						);
					})
				}

			</div>
		);
	}
}

export default connect(
	store => ({
		tac: store.tac,
		allocatedTime:store.tac.data,
		proposals: store.proposals,
		filters: store.filters,
		user: store.user,
		semester: store.filters.selectedSemester,
	}),null
)(TimeAllocationPage);
