/* eslint-disable */
import React from "react";
import { connect } from "react-redux"
import InfoMessage from "../messages/InfoMessage";
import AvailableTimePerPartnerTable from "../tables/AvailableTimePerPartnerTable";
import ProposalsPerPartner from "../tables/ProposalsPerPartner";
import {checkAllocatedTimes, getQuaryToAddAllocation } from "../../util/allocation";
import { canUserWriteAllocations, canUserWriteTechComments, areAllocatedTimesCorrect }  from "../../util";
import PartnerProposals  from "../../util/proposal";
import { submitAllocations } from "../../api/graphQL";
import { updateProposals } from "../../actions/proposalsActions";
import { startSubmition, passSubmition, failSubmition } from "../../actions/timeAllocationActions";
import { ALL_PARTNER } from "../../types";
import { getPartnerList, listForDropdown } from "../../util/filters";
import { jsonClient } from '../../api/api';
import { checkColumns, getIndexOfColumns, updateProposalFromCSV } from "../../util/uploadCsv";


class TimeAllocationPage extends React.Component {
    constructor(props) {
        super(props);

        this.submitProposals = this.submitProposals.bind(this);
    }

    submitProposals(event, partner) {
        const {proposals, user, dispatch, filters} = this.props
        const ppp = PartnerProposals(proposals.proposals, listForDropdown(getPartnerList(user.user.roles)));

        const query = getQuaryToAddAllocation(ppp[partner],
                                              partner,
                                              filters.selectedSemester
        )
        dispatch(startSubmition(partner))
        submitAllocations(query).then(p => p.data, dispatch(failSubmition()))
                .then(d => {
                    d.data.updateTimeAllocations.success ? dispatch(passSubmition()) : dispatch(failSubmition())
                });
    }

    allocationChange(event, proposalCode, priority, partner) {

        const data = this.props
        const value = event.target.value;
        const updatedProposals = data.proposals.proposals.map(p => {
            if (p.proposalCode === proposalCode) {
                p.allocatedTime[partner][priority] = value
            }
            return p
        })
        data.dispatch(updateProposals(updatedProposals))
    }

    tacCommentChange(event, proposalCode, partner) {
        const data = this.props
        const value = event.target.value;
        const updatedProposals = data.proposals.proposals.map(p => {
            if (p.proposalCode === proposalCode) {
                p.tacComment[partner].comment = value
            }
            return p
        })
        data.dispatch(updateProposals(updatedProposals))
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
        var csvFile;
        var downloadLink;

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
  }


  updateFromCSV = (data, proposals, partner) => {
    //throw new Error("this error");
    console.log(data);
    const { dispatch } = this.props
    let allColumns = false;
    let columnIndex = {};
    let updatedProposals = proposals;
    (data || []).forEach( (r, i) => {
      if (i === 0) {
        allColumns = checkColumns(r)
        if (allColumns){
          columnIndex = getIndexOfColumns(r)
        }
      } else if(allColumns){
        updatedProposals = updateProposalFromCSV(proposals, partner, r, columnIndex)
      }
    })
    dispatch(updateProposals(updatedProposals));
  };


    /*
    * The exportTableToCSV() function creates CSV data from table HTML and
    * download CSV data as a file by using the downloadCSV() function
    */

    exportTableToCSV = (filename) => {
        var csv = [];
        var rows = document.querySelectorAll("#propPerPartner tr");

        for (var i = 0; i < rows.length; i++) {
            var row = [];
            var cols = rows[i].querySelectorAll("th, #propCode, #propTitle, #propAbstract, #propPI, #propSemester,"
                    + "#propComment, #propMinTime, #propRequestTime, #propCanAllocateP0, #propCanAllocateP1, #propCanAllocateP2,"
                    + "#propCanAllocateP3, #propCanAllocateP4, #propTotalP0P3, #propBoolean, #propTranparency, #propMaxSeeing, #propEmpty, #propTechReport ");

            for (var j = 0; j < cols.length; j++) {
                if (cols[j].nodeName === "TEXTAREA") {
                    let cleanText = cols[j].value;
                    cleanText = cleanText.replace(/(,|\n)/gm, " ");
                    row.push(cleanText);
                }
                else {
                    let cleanText = cols[j].innerText;
                    cleanText = cleanText.replace(/(,|\n)/gm, " ");
                    row.push(cleanText);
                }
            }

            csv.push(row.join(","));
        }

        // Download CSV file
        this.downloadCSV(csv.join("\n"), filename);
    }

    render() {

        const {allocatedTime, filters, user, tac} = this.props
        const proposals = this.props.proposals.proposals || []
        let partners = listForDropdown(getPartnerList(this.props.user.user.roles || []))

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
        }),null
)(TimeAllocationPage);
