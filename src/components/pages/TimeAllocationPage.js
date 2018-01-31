/* eslint-disable */
import React from "react";
import { connect } from "react-redux"
import AvailableTimePerPartnerTable from "../tables/AvailableTimePerPartnerTable";
import ProposalsPerPartner from "../tables/ProposalsPerPartner";
import {getQuaryToAddAllocation } from "../../util/allocation";
import { canUserWriteAllocations, canUserWriteTechComments }  from "../../util";
import PartnerProposals  from "../../util/proposal";
import { submitAllocations } from "../../api/graphQL";
import { updateProposals } from "../../actions/proposalsActions";
import { startSubmition, passSubmition, failSubmition } from "../../actions/timeAllocationActions";
import { ALL_PARTNER } from "../../types";
import { getPartnerList, listForDropdown } from "../../util/filters";
import { jsonClient } from '../../api/api';
import { checkColumns, getIndexOfColumns, updateProposalFromCSV } from "../../util/uploadCsv";
import {updateTacComment, updateAllocatedTimePriority} from "../../actions/TimeAllocationsActions";


class TimeAllocationPage extends React.Component {
	constructor(props) {
		super(props);
		
		this.submitProposals = this.submitProposals.bind(this);
	}
	
	submitProposals(event, partner) {
		const {proposals, user, dispatch, filters} = this.props;
		const ppp = PartnerProposals(proposals.proposals, listForDropdown(getPartnerList(user.user.roles)));
		
		const query = getQuaryToAddAllocation(ppp[partner],
			partner,
			filters.selectedSemester
		);
		dispatch(startSubmition(partner));
		submitAllocations(query).then(p => p.data, dispatch(failSubmition()))
		.then(d => {
			d.data.updateTimeAllocations.success ? dispatch(passSubmition()) : dispatch(failSubmition())
		});
	}
	
	allocationChange(event, proposalCode, priority, partner) {
		
		const data = this.props;
		const value = event.target.value;
		const updatedProposals = data.proposals.proposals.map(p => {
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
		// proposalCode, semester, partner, time, priority
		dispatch(updateAllocatedTimePriority(proposalCode, semester, partner, time, priority))
	};
	
	tacCommentChange(event, proposalCode, partner) {
		const { dispatch, semester } = this.props;
		const tacComment = event.target.value;
		// proposalCode, semester, partner, tacComment
		dispatch(updateTacComment(proposalCode, semester, partner, tacComment))
	}
	
	downloadSummaries(proposals) {
		const proposalCodes = proposals.map(p => p.proposalCode);
		jsonClient('blob').post('/proposal-summaries', {proposalCodes})
		.then(res => {
			
			// Download link
			const downloadLink = document.createElement("a");
			
			// File name
			downloadLink.download = 'proposal_summaries.zip';
			
			// Create a link to the file
			downloadLink.href = window.URL.createObjectURL(res.data);
			
			// Hide download link
			downloadLink.style.display = "none";
			
			// Add the link to DOM
			document.body.appendChild(downloadLink);
			
			// Click download link
			downloadLink.click();
		})
		.catch(err => console.error(err));
	}
	
	/*
	* The downloadCSV() function takes CSV data and
	* generate download link to download HTML table data in a CSV file
	*/
	
	downloadCSV = (csv, filename) => {
		let csvFile;
		let downloadLink;
		
		// CSV file
		csvFile = new Blob([csv], {type: "text/csv"});
		
		// Download link
		downloadLink = document.createElement("a");
		// Download CSV file
		this.downloadCSV(csv.join("\n"), filename);
		// File name
		downloadLink.download = filename;
		
		// Create a link to the file
		downloadLink.href = window.URL.createObjectURL(csvFile);
		
		// Hide download link
		downloadLink.style.display = "none";
		
		// Add the link to DOM
		document.body.appendChild(downloadLink);
		
		// Click download link
		downloadLink.click();
	};
	
	
	updateFromCSV = (data, proposals, partner) => {
		//throw new Error("this error");
		console.log(data);
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
		
		const {allocatedTime, filters, user, tac} = this.props;
		const proposals = this.props.proposals.proposals || [];
		let partners = listForDropdown(getPartnerList(this.props.user.user.roles || []));
		
		if (filters.selectedPartner !== ALL_PARTNER) {
			partners = filters.selectedPartner ? [{value: filters.selectedPartner, label: filters.selectedPartner}] : []
		}
		const ppp = PartnerProposals(proposals, partners);
		
		return (
			<div>
				{
					tac.submiting ? (<div><h1>Submitting...</h1></div>) : partners.map(part => {
						const partner = part.value;
						if (partner === ALL_PARTNER){
							return null;
						}
						if ((ppp[partner] || []).length === 0){
							return null;
						}
						
						return (
							<div key={partner}>
								<AvailableTimePerPartnerTable
									proposals={ppp[partner] || []}
									partner={partner}
									availableTime={allocatedTime}
								/>
								<ProposalsPerPartner
									proposals={ppp[partner] || []}
									partner={partner}
									tacCommentChange={this.tacCommentChange.bind(this)}
									allocationChange={this.allocationChange.bind(this)}
									submitForPartner={this.submitProposals.bind(this)}
									canAllocate={canUserWriteAllocations(user.user, partner) || false}
									canComment={canUserWriteTechComments(user.user, partner) || false}
									exportTableToCSV={this.exportTableToCSV.bind(this)}
									submitted={tac}
									allocatedTimeChange = {this.allocatedTimeChange}
									updateFromCSV = {this.updateFromCSV.bind(this)}
								/>
								<button onClick={() => this.downloadSummaries(ppp[partner] || [])}>
									Download summary files
								</button>
							</div>
						);
					})
				}
				<button onClick={e => this.exportTableToCSV('TACData.csv')}>Export HTML Table To CSV File</button>
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
