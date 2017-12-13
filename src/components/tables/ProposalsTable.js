/* eslint-disable */
import React from "react";
import { connect } from "react-redux";
import { updateSingleProposal } from "../../actions/statisticsActions";


class ProposalsTable extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.valueChange.bind(this);
    console.log("<><><><PR: ",props);
  }

  valueChange(event) {
    const data = this.props
    const code = event.target.id
    const value = event.target.value
    const name = event.target.name
    const updatedProposals = data.proposals.map( p => {
      if (p.proposalCode === code){
        if( name === "tac-comment"){
          p.tacComment = value
        }
        else{
          p.allocatedTime[name] = value
        }
      }
      return p
    })
    data.dispatch(updateSingleProposal({proposals: updatedProposals, targets: data.data.targets}))
  }

  render() {
    const data = this.props
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
             arrayOfProposals.map( p => (
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
                      className="table-height width-400"
                      onChange={ this.valueChange.bind(this) } />

            </td>
            <td><div className="table-height width-100" >{ p.totalRequestedTime }</div></td>
            <td>
                <input
                    id={p.proposalCode}
                    type="text"
                    name="p0"
                    value={ p.allocatedTime.p0 }
                    onChange={ this.valueChange.bind(this)}
                    className="width-100" />
            </td>
            <td>
                <input
                    id={p.proposalCode}
                    type="text"
                    name="p1"
                    value={ p.allocatedTime.p1 }
                    onChange={
                    this.valueChange.bind(this) }
                    className="width-100"  />
            </td>
            <td>
                <input
                    id={p.proposalCode}
                    type="text"
                    name="p2"
                    value={ p.allocatedTime.p2 }
                    onChange={this.valueChange.bind(this)}
                    className="width-100" />
            </td>
            <td>
                <input
                    id={p.proposalCode}
                    type="text"
                    name="p3"
                    value={ p.allocatedTime.p3 }
                    onChange={ this.valueChange.bind(this) }
                    className="width-100"  />
            </td>
            <td><div className="table-height width-100" >{ p.allocatedTime.p0 + p.allocatedTime.p1 + p.allocatedTime.p2 + p.allocatedTime.p3 }</div></td>
            <td>
                <input

                    id={p.proposalCode}
                    type="text"
                    name="p4"
                    value={ p.allocatedTime.p4 }
                    onChange={ this.valueChange.bind(this) }
                    className="width-100"  />
            </td>
            <td><div className="table-height width-100" >false</div></td>
            <td><div className="table-height width-100" >{ p.transparency }</div></td>
            <td><div className="table-height width-100" >{ p.maxSeeing }</div></td>
            <td><div className="table-height width-100" >Hover Info</div></td>
            <td><div className="table-height width-100" >{ p.report } </div></td>
          </tr>
            ))
           }

        </tbody>
        </table>
      </div>
      );
    }
  }


export default connect(
    store => ({ data:store.statistics.data }), null
  )(ProposalsTable);
