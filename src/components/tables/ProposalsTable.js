/* eslint-disable */
import React from "react";
import { connect } from "react-redux";
import { updateSingleProposal } from "../../actions/proposalsActions";
import { isFloat } from "../../util";
import { illegalAllocation } from "../../util/allocation";
import _ from "lodash";


class ProposalsTable extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.valueChange.bind(this);
  }

  valueChange(event, code, name) {
    const data = this.props
      const value = event.target.value;
    const updatedProposals = data.proposals.map( p => {
      if (p.proposalCode === code) {
        if( name === "tac-comment") {
          p.tacComment = value
        }
        else{
          p.allocatedTime[name] = value
        }
      }
      return p
    })
    data.dispatch(updateSingleProposal(updatedProposals))
  }

  render() {
    const badTimes = {
      color: 'black',
      background:"#FF6060"
    }
    const goodTimes = {
      color: 'black',
      background:"#d4fce6"
    }
    const data = this.props
    let sty = ""
    const arrayOfProposals = data.data.proposals || []

    if ( arrayOfProposals.length === 0 ){ return (<div> <br /><br /><br /><h1>Loading proposals......</h1></div>)}

    return(
      <div className="scroldiv">
      <h1>Proposals Table</h1>
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
               sty = goodTimes
               if ( illegalAllocation(p, "", [])
             ){
                 sty = badTimes
               }
               return (
            <tr key={p.proposalId}>
            <td><div className="width-150 padding-8" >{ p.proposalCode }</div></td>
            <td><div className="table-height width-300" >{ p.title }</div></td>
            <td><div className="table-height width-400" >{ p.abstract }</div></td>
            <td>{ p.pi }</td>
            <td>2017-1</td>
            <td>
                  <textarea
                      id={p.proposalCode}
                      name="tac-comment"
                      value={p.tacComment}
                      className="table-height-fixed width-400"
                      onChange={ this.valueChange.bind(this) } />

            </td>
            <td><div className="table-height width-100" >{ p.totalRequestedTime }</div></td>
                {
                  ['p0', 'p1', 'p2', 'p3', 'p4'].map(priority => (
                          <td key={priority}>
                              <input
                                      type="text"
                                      style = { sty }
                                      value={ p.allocatedTime[priority] }
                                      onChange={ e => this.valueChange(e, p.proposalCode, priority) }
                                      className="width-100" />
                          </td>
                                                      ))
                }
            <td><div className="table-height width-100" >{
                        parseFloat(p.allocatedTime.p0 || 0) +
                        parseFloat(p.allocatedTime.p1 || 0) +
                        parseFloat(p.allocatedTime.p2 || 0)  +
                        parseFloat(p.allocatedTime.p3 || 0)
                      }</div></td>
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
      </div>
      );
    }
  }


export default connect(
    store => ({ data:store.proposals }), null
  )(ProposalsTable);
