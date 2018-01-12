import React from "react";
import propTypes from "prop-types";
import _ from "lodash";
import { illegalAllocation } from "../../util/allocation";
import { ALL_PARTNER } from "../../types"


const TimeAllocationInput = ({onChange, proposal, priority, partner}) => {
    const badTime = {
        color: 'black',
        background:"#FF6060"
    };
    const goodTime = {
        color: 'black',
        background:"#d4fce6"
    };
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


const ProposalsPerPartner = (proposals, partner, tacCommentChange, allocationChange) => {
  const arrayOfProposals = proposals.proposals || []
  const part = proposals.partner
  if (part === ALL_PARTNER){
    return <br />
  }

  if (arrayOfProposals.length === 0){
    return <br />
  }
  return(
    <div className="scroldiv">
      <h1>{part}</h1>
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Title</th>
            <th>Abstract</th>
            <th>PI</th>
            <th>Semester</th>
            <th>TAC comment</th>
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
                <td><div className="width-150 padding-8" >{ p.proposalCode }</div></td>
                <td><div className="table-height width-300" >{ p.title }</div></td>
                <td><div className="table-height width-400" >{ p.abstract }</div></td>
                <td>{ p.pi }</td>
                <td>2017-1</td>
                <td>
                    <textarea
                            id={ p.proposalCode }
                            name="tac-comment"
                            value={ p.tacComment[part].comment }
                            className="table-height-fixed width-400"
                            onChange={ e => proposals.tacCommentChange(e, p.proposalCode, part) } />

                </td>
                <td><div className="table-height width-100" >{ p.totalRequestedTime }</div></td>
                <td>
                    <TimeAllocationInput onChange={ e => proposals.allocationChange(e, p.proposalCode, 'p0', part)}
                                         proposal={p}
                                         partner={part}
                                         priority="p0"/>
                </td>
                <td>
                    <TimeAllocationInput onChange={e => proposals.allocationChange(e, p.proposalCode, 'p1', part)}
                                         proposal={p}
                                         partner={part}
                                         priority="p1"/>
                </td>
                <td>
                    <TimeAllocationInput onChange={e => proposals.allocationChange(e, p.proposalCode, 'p2', part)}
                                         proposal={p}
                                         partner={part}
                                         priority="p2"/>
                </td>
                <td>
                    <TimeAllocationInput onChange={e => proposals.allocationChange(e, p.proposalCode, 'p3', part)}
                                         proposal={p}
                                         partner={part}
                                         priority="p3"/>
                </td>
                <td><div className="table-height width-100" >{
                    parseFloat(p.allocatedTime[part]["p0"] || 0 ) +
                    parseFloat(p.allocatedTime[part]["p1"] || 0 ) +
                    parseFloat(p.allocatedTime[part]["p2"] || 0 ) +
                    parseFloat(p.allocatedTime[part]["p3"] || 0 )
                }</div></td>
                <td>
                    <TimeAllocationInput onChange={e => proposals.allocationChange(e, p.proposalCode, 'p4', part)}
                                         proposal={p}
                                         partner={part}
                                         priority="p4"/>
                </td>
                <td><div className="table-height width-100" >false</div></td>
                <td><div className="table-height width-100" >{ p.transparency }</div></td>
                <td><div className="table-height width-100" >{ p.maxSeeing }</div></td>
                <td><div className="table-height width-100" >Hover Info</div></td>
                <td><div className="table-height width-400" >{ p.report } </div></td>
            </tr>
               )})
          }

        </tbody>
      </table>
      <button className="btn-success" onClick={ e => proposals.submitForParner(e, part) }>Submit {part}</button>
    </div>
  )}

ProposalsPerPartner.propTypes = {
  proposals: propTypes.array.isRequired,
  partner: propTypes.string.isRequired,
  allocationChange: propTypes.func.isRequired,
  tacCommentChange: propTypes.func.isRequired,
  submitForParner: propTypes.func.isRequired,
}

export default ProposalsPerPartner;
