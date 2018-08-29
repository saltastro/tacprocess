import React from 'react'
import propTypes from 'prop-types'
import _ from 'lodash'
import { illegalAllocation } from '../../util/allocation'
import { goodTime, badTime } from '../../types'
import { getTechnicalReport } from '../../util/technicalReports'
import {downloadSummary} from '../../util/index'

const TimeAllocationInput = ({onChange, proposal, priority, partner, name}) => {
  const sty = illegalAllocation(proposal, priority, partner) ? badTime : goodTime
  return (
    <div>
      <div>{`${ proposal.proposalCode } (${ priority.toUpperCase() })`}</div>
      <div>
        <input type='text'
				       value={ proposal.allocatedTime[ partner ] ? proposal.allocatedTime[ partner ][ priority ] : 0 }
				       style={ sty }
				       className='width-100'
				       name={ name }
				       onChange={ onChange }/>
      </div>
    </div>
  )
}

const byProposalCode = (a, b) => {
  const name1 = a.proposalCode.toUpperCase()
  const name2 = b.proposalCode.toUpperCase()
  if (name1 < name2) {
    return -1
  }
  if (name1 > name2) {
    return 1
  }
  return 0
}

const requestSummary = (event, proposalCode, semester, partner) => {
  event.preventDefault()
  downloadSummary(proposalCode, semester, partner)
}

const ProposalsPerPartner = ({proposals, partner, tacCommentChange, allocatedTimeChange, canAllocate, semester}) => {
  const arrayOfProposals = [...proposals] || []

  return(
    <div className='scroldiv'>
      <h1>{partner}</h1>
      <table id='propPerPartner'>
        <thead>
          <tr>
            <th>Code</th>
            <th>Summary</th>
            <th>Title</th>
            <th>Abstract</th>
            <th>PI</th>
            <th>Semester</th>
            <th>TAC comment</th>
            <th>Minimum useful time (seconds)</th>
            <th>Requested Time from {partner} (seconds)</th>
            <th>Total Requested Time (seconds)</th>
            <th>P0 (seconds)</th>
            <th>P1 (seconds)</th>
            <th>P2 (seconds)</th>
            <th>P3 (seconds)</th>
            <th>Total P0-P3 (seconds)</th>
            <th>P4 (seconds)</th>
            <th>Act on Alert</th>
            <th>Transparency</th>
            <th>Max seeing</th>
            <th>Tech Report</th>
          </tr>
        </thead>
        <tbody>
          {
            (arrayOfProposals.sort(byProposalCode))
              .filter(p => !_.isNull(p.title))
              .map( p => (
                <tr key={ p.proposalId } className={ (p.isP4 || !p.requestedTime.requests[ partner ] > 0 ) ? 'danger-line' : '' }>
                  <td>
                    <div className='width-150 padding-8' >
                      <a target='_blank' href={ `https://www.salt.ac.za/wm/proposal/${ p.proposalCode }` }>
                        { p.proposalCode } {p.isP4 && ' (P4)'}
                      </a>
                    </div></td>
                  <td><a href='' onClick={ e => requestSummary(e, p.proposalCode, semester, partner) }>Download</a></td>
                  <td><div className='table-height width-300' >{ p.title }</div></td>
                  <td><div className='table-height width-400' >{ p.abstract }</div></td>
                  <td>{ p.pi }</td>
                  <td>{semester}</td>
                  <td>
                    { canAllocate ?
                      <textarea
                        id={ p.proposalCode }
                        name='tac-comment'
                        value={ p.tacComment[ partner ] ? p.tacComment[ partner ].comment : '' }
                        className='table-height-fixed width-400'
                        onChange={ e =>
                          tacCommentChange(e, p.proposalCode, partner) }
                      /> : <div className='table-height-fixed width-400' >
                        {  p.tacComment[ partner ] ? p.tacComment[ partner ].comment : ''  }
                      </div>
                    }
                  </td>
                  <td><div className='table-height width-100' >{
                    p.minTime ? p.minTime : 'Not Available'
                  }</div></td>
                  <td><div className='table-height width-150' >{ p.requestedTime.requests[ partner ] || 0 }</div></td>
                  <td><div className='table-height width-100' >{ p.totalRequestedTime }</div></td>
                  <td>
                    { canAllocate ?
                      <TimeAllocationInput
                        onChange={ e =>
                          allocatedTimeChange(e, p.proposalCode, partner)
                        }
                        name='p0'
                        proposal={ p }
                        partner={ partner }
                        priority='p0'/> : <div className='width-100'>{   p.allocatedTime[ partner ] ?  p.allocatedTime[ partner ].p0 : 0 }</div>
                    }
                  </td>
                  <td>
                    { canAllocate ?
                      <TimeAllocationInput

                        onChange={ e =>
                          allocatedTimeChange(e, p.proposalCode, partner)
                        }
                        name='p1'
                        proposal={ p }
                        partner={ partner }
                        priority='p1'/> : <div className='width-100'>{   p.allocatedTime[ partner ] ?  p.allocatedTime[ partner ].p1 : 0 }</div>
                    }
                  </td>
                  <td>
                    { canAllocate ?
                      <TimeAllocationInput

                        onChange={ e =>
                          allocatedTimeChange(e, p.proposalCode, partner)
                        }
                        name='p2'
                        proposal={ p }
                        partner={ partner }
                        priority='p2'/> : <div className='width-100'>{   p.allocatedTime[ partner ] ?  p.allocatedTime[ partner ].p2 : 0 }</div>
                    }
                  </td>
                  <td>
                    { canAllocate ?
                      <TimeAllocationInput

                        onChange={ e =>
                          allocatedTimeChange(e, p.proposalCode, partner)
                        }
                        name='p3'
                        proposal={ p }
                        partner={ partner }
                        priority='p3'/> : <div className='width-100'>{   p.allocatedTime[ partner ] ?  p.allocatedTime[ partner ].p3 : 0 }</div>
                    }
                  </td>
                  <td><div className='table-height width-100' >{
                    parseFloat(p.allocatedTime[ partner ] ? p.allocatedTime[ partner ].p0 : 0 ) +
									parseFloat(p.allocatedTime[ partner ] ? p.allocatedTime[ partner ].p1 : 0 ) +
									parseFloat(p.allocatedTime[ partner ] ? p.allocatedTime[ partner ].p2 : 0 ) +
									parseFloat(p.allocatedTime[ partner ] ? p.allocatedTime[ partner ].p3 : 0 )
                  }</div></td>
                  <td>
                    { canAllocate ?
                      <TimeAllocationInput

                        onChange={ e =>
                          allocatedTimeChange(e, p.proposalCode, partner)
                        }
                        name='p4'
                        proposal={ p }
                        partner={ partner }
                        priority='p4'/> : <div className='width-100'>{  p.allocatedTime[ partner ] ?  p.allocatedTime[ partner ].p4 : 0 }</div>
                    }
                  </td>
                  <td><div className='table-height width-100' >{ `${ p.actOnAlert }` }</div></td>
                  <td><div className='table-height width-100' >{ p.transparency }</div></td>
                  <td><div className='table-height width-100' >{ p.maxSeeing }</div></td>
                  <td><div className='table-height width-400' >{ getTechnicalReport(p, semester, 'jsx') }</div></td>
                </tr>
              ))
          }

        </tbody>
      </table>
    </div>
  )}

ProposalsPerPartner.propTypes = {
  proposals: propTypes.array.isRequired,
  partner: propTypes.string.isRequired,
  semester: propTypes.string.isRequired,
  allocatedTimeChange: propTypes.func.isRequired,
  tacCommentChange: propTypes.func.isRequired,
  canAllocate: propTypes.bool,
}

TimeAllocationInput.propTypes = {
  proposal: propTypes.array.isRequired,
  onChange: propTypes.func.isRequired,
  priority: propTypes.string.isRequired,
  partner: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
}

export default ProposalsPerPartner
