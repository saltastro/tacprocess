import React from "react";
import propTypes from "prop-types";
import {CSVLink} from 'react-csv';
import _ from "lodash";
import { illegalAllocation } from "../../util/allocation";
import { ALL_PARTNER, goodTime, badTime } from "../../types"

const TimeAllocationInput = ({onChange, proposal, priority, partner}) => {
    const sty = illegalAllocation(proposal, priority, partner) ? badTime : goodTime;
    return (
            <div>
                <div>{`${proposal.proposalCode} (${priority.toUpperCase()})`}</div>
                <div>
                    <input type="text"
                           value={proposal.allocatedTime[partner][priority]}
                           style={sty}
                           className="width-100"
                           onChange={onChange}/>
                </div>
            </div>
    );
};

/*
* This method setup the csv file content as it appears in the time allocation page table.
* and returns that data to use in the react-csv Component for downloading.
*/
const CSVData = (proposals, partner) => {
  let tableDataHeaders = [
    "Code", "Title", "Abstract", "PI", "Semester", "TAC comment", "Minimum useful time",
    "Total Requested Time", "P0", "P1", "P2", "P3", "Total P0-P3", "P4",
    "Act on Alert", "Transparency", "Max seeing", "Hover Info", "Tech Report"
  ];
  return [
    tableDataHeaders,
    ...proposals.map(p => [
      p.proposalCode, p.title, p.abstract, p.pi, "2017-1", p.tacComment[partner].comment, p.minTime, p.totalRequestedTime,
      p.allocatedTime[partner]["p0"], p.allocatedTime[partner]["p1"], p.allocatedTime[partner]["p2"], p.allocatedTime[partner]["p3"],
      (p.allocatedTime[partner]["p0"] + p.allocatedTime[partner]["p1"] + p.allocatedTime[partner]["p2"] + p.allocatedTime[partner]["p3"]),
      p.allocatedTime[partner]["p4"], false, p.transparency, p.maxSeeing, "", p.techReport
    ])
  ];
}

const ProposalsPerPartner = (proposals, partner, tacCommentChange, allocationChange, canAllocate, canComment, submited) => {
  const arrayOfProposals = proposals.proposals || []
  const part = proposals.partner
  if (part === ALL_PARTNER){
    return <br />
  }
  if (arrayOfProposals.length === 0){
    return <br />
  }

  // Contains the whole content of the csv file to download per table partner.
  let csvData = CSVData(proposals.proposals, proposals.partner);

  return(
    <div className="scroldiv">
      <h1>{part}</h1>
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
                  { proposals.canAllocate ?
                      <textarea
                        id={ p.proposalCode }
                        name="tac-comment"
                        value={ p.tacComment[part].comment }
                        className="table-height-fixed width-400"
                        onChange={ e =>
                          proposals.tacCommentChange(e, p.proposalCode, part) }
                      /> : <div className="table-height-fixed width-400" >
                                      {  p.tacComment[part].comment }
                            </div>
                  }
                </td>
                <td><div id={"propMinTime"}className="table-height width-100" >{ p.minTime }</div></td>
                <td><div id={"propRequestTime"} className="table-height width-100" >{ p.totalRequestedTime }</div></td>
                <td id={"propCanAllocateP0"}>
                    { proposals.canAllocate ?
                          <TimeAllocationInput

                              onChange={ e =>
                                  proposals.allocationChange(e, p.proposalCode, 'p0', part)
                              }
                              proposal={p}
                              partner={part}
                              priority="p0"/> : <div className="width-100">{ p.allocatedTime[part]["p0"] }</div>
                    }
                </td>
                <td id={"propCanAllocateP1"}>
                { proposals.canAllocate ?
                      <TimeAllocationInput

                          onChange={ e =>
                              proposals.allocationChange(e, p.proposalCode, 'p1', part)
                          }
                          proposal={p}
                          partner={part}
                          priority="p1"/> : <div className="width-100">{ p.allocatedTime[part]["p1"] }</div>
                }
                </td>
                <td id={"propCanAllocateP2"}>
                { proposals.canAllocate ?
                      <TimeAllocationInput

                          onChange={ e =>
                              proposals.allocationChange(e, p.proposalCode, 'p2', part)
                          }
                          proposal={p}
                          partner={part}
                          priority="p2"/> : <div className="width-100">{ p.allocatedTime[part]["p2"] }</div>
                }
                </td>
                <td id={"propCanAllocateP3"}>
                { proposals.canAllocate ?
                      <TimeAllocationInput

                          onChange={ e =>
                              proposals.allocationChange(e, p.proposalCode, 'p3', part)
                          }
                          proposal={p}
                          partner={part}
                          priority="p3"/> : <div className="width-100">{ p.allocatedTime[part]["p3"] }</div>
                }
                </td>
                <td><div id={"propTotalP0P3"} className="table-height width-100" >{
                    parseFloat(p.allocatedTime[part]["p0"] || 0 ) +
                    parseFloat(p.allocatedTime[part]["p1"] || 0 ) +
                    parseFloat(p.allocatedTime[part]["p2"] || 0 ) +
                    parseFloat(p.allocatedTime[part]["p3"] || 0 )
                }</div></td>
                <td id={"propCanAllocateP4"}>
                { proposals.canAllocate ?
                      <TimeAllocationInput

                          onChange={ e =>
                              proposals.allocationChange(e, p.proposalCode, 'p4', part)
                          }
                          proposal={p}
                          partner={part}
                          priority="p4"/> : <div className="width-100">{ p.allocatedTime[part]["p4"] }</div>
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
      <CSVLink data={csvData} >Download me</CSVLink>

      {

        proposals.submited.submited ?
          <div><br />
            {!!proposals.submited.partner && proposals.submited.partner === part ? <div  className="pass-div"> <h2> Submitited</h2> </div> :  <br /> }
            <button className="btn-success" onClick={ e => proposals.submitForParner(e, part) }>Submit {part}</button>
          </div> :
          proposals.submited.partner === part ?
          <div className="fail-div">
            <h2> Fail to submit</h2>
            <h3>please make sure that all allocation for partner "{proposals.submited.partner}" are correct <br />or you do not have tailing " \ " on your comment</h3>
            <button className="btn-fail" onClick={ e => proposals.submitForParner(e, part) }>Submit {part}</button>
          </div> :
          <div><br />
            <button className="btn-success" onClick={ e => proposals.submitForParner(e, part) }>Submit {part}</button>
          </div>
      }
    </div>
  )}

ProposalsPerPartner.propTypes = {
  proposals: propTypes.array.isRequired,
  partner: propTypes.string.isRequired,
  allocationChange: propTypes.func.isRequired,
  tacCommentChange: propTypes.func.isRequired,
  submitForParner: propTypes.func.isRequired,
  exportTableToCSV: propTypes.func.isRequired,
  canAllocate: propTypes.bool,
  canComment: propTypes.bool,
  submited: propTypes.object,
}

export default ProposalsPerPartner;
