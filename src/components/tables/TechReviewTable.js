import React from 'react'
import propTypes from 'prop-types'
import '../../styles/components/tables.css'
import { canAssignOtherReviewer, defaultSemester, downloadSummary } from '../../util'
import {getTechnicalReport} from '../../util/technicalReports'
import {didReportChange} from '../../util/proposal'

function getReviewer(proposal, semester){
  const review = proposal.techReviews[ semester ]
  return review ? review.reviewer.username : null
}

export default class TechReviewTable extends React.Component {
	techReportChange = (proposalCode, prevTechReport, field, value, reviewer) => {
	  reviewer = reviewer === null ? this.props.user.username : reviewer
	  this.props.onTechReviewChange(proposalCode,
	    {
	      reviewer: { username: reviewer },
	      ...prevTechReport,
	      [ field ]: value
	    })
	};

	techReviewerChange = (proposalCode, reviewer, techReport) => {
	  this.props.onTechReviewChange(proposalCode,
									  {
										  reviewer: { username: reviewer },
										  ...techReport
									  })
	};

	disableCheckbox = (proposalCode, reviewer, semester) => this.props.initProposals.some(p => {
	  if( p.proposalCode === proposalCode){
	    return p.techReviews[ semester ].reviewer.username === reviewer
	  }
	  return false
	});

	showNone = (proposalCode, semester) => this.props.initProposals.some(p => {
	  if( p.proposalCode === proposalCode){
	    return !p.techReviews[ semester ].reviewer.username
	  }
	  return false
	});

	showChecked = (proposalCode, semester) => this.props.proposals.some(p => {
	  if( p.proposalCode === proposalCode){
	    return !p.techReviews[ semester ].reviewer.username
	  }
	  return false
	});

	requestSummary = (event, proposalCode, semester) => {
	    event.preventDefault()
	    downloadSummary(proposalCode, semester)
	};

	render() {
	  const {proposals, user, SALTAstronomers, semester, initProposals} = this.props
	  if (proposals.length === 0) {
	    return (<br/>)
	  }

	  // compare astronomers by their first name
	  const compareByFirstName = (a, b) => {
	    const name1 = a.name.toUpperCase()
	    const name2 = b.name.toUpperCase()
	    if (name1 < name2) {
	      return -1
	    }
	    if (name1 > name2) {
	      return 1
	    }
	    return 0
	  }
	  const compareByProposalCode = (a, b) => {
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

	  const saltAstronomerName = (username) => {
	    const name = (SALTAstronomers).find(a => a.username === username)
	    return name ? name.name : username
	  }

	  const saltAstronomers = SALTAstronomers.sort(compareByFirstName)

	  const isSaltAstronomer = (username) => saltAstronomers.some(astronomer => astronomer.username === username)

	  const isPastSemester = semester < defaultSemester()

	  return (
	    <div className='SATableDiv'>
	      <h1>Salt Astronomers Proposal Assigning</h1>
	      <table className='SATable' align='center'>
	        <thead>
	          <tr>
	            <th>Proposal Code</th>
	            <th>Summary</th>
	            <th>Proposal Title</th>
	            <th>Proposal Investigator</th>
	            {semester >= '2018-1' && <th>Feasible</th> }
	            <th>Proposal Comment</th>
	            {semester >= '2018-1' && <th>Detailed check</th> }
	            <th>Reviewed by</th>
	          </tr>
	        </thead>
	        <tbody>
	          {
	            proposals.sort(compareByProposalCode).map(p => {
	              const reviewer = getReviewer(p, semester)
	              const techReport = getTechnicalReport(p, semester, 'object')
	              const techReportString = getTechnicalReport(p, semester, 'string')

	              return (
	                <tr key={ p.proposalId }>
	                  <td className='width-150'>
	                    <a target='_blank'
	                      href={ `https://www.salt.ac.za/wm/proposal/${ p.proposalCode }` }>
	                      {p.proposalCode}
	                    </a>
	                  </td>
	                  <td className='width-100'>
	                    <a className='file-download'
	                      href=''
	                      onClick={ e => this.requestSummary(e, p.proposalCode, semester) }>
                                            Download
	                    </a>
	                  </td>
	                  <td className=' table-height width-400'>{p.title}</td>
	                  <td className='width-100'>{p.pi}</td>
	                  {
	                    semester >= '2018-1' && <td>
	                      <select
	                        defaultValue={ techReport.feasible }
	                        onChange={ e =>
	                          this.techReportChange(p.proposalCode,
	                            techReport,
	                            'feasible',
	                            e.target.value,
	                            reviewer)
	                        }
	                        disabled={ isPastSemester }
	                      >
	                        <option value={ null }>none</option>
	                        <option value='yes'>yes</option>
	                        <option value='yes with caveats'>yes with caveats</option>
	                        <option value='no'>no</option>
	                      </select>
	                    </td> }
	                  <td className='width-100'>
	                    <textarea
	                      disabled={ isPastSemester }
	                      className='table-height-fixed width-400'
	                      value={
	                        semester >= '2018-1'
	                          ? techReport.comment || ''
	                          : techReportString
	                      }

	                      onChange={ semester >= '2018-1' ? e => {
	                        this.techReportChange(p.proposalCode,
	                          techReport,
	                          'comment',
	                          e.target.value,
	                          reviewer)
	                      } : e => e }
												 />
	                    {(didReportChange(p, initProposals, semester) && !reviewer) &&
                                        <p style={ {color: '#b7a201', textAlign: 'center'} }>A reviewer must be assigned to the review.</p>}
	                  </td>
	                  {
	                    semester >= '2018-1' && <td className='width-100'>
	                      <select
	                        defaultValue={ techReport.details }
	                        onChange={ e => {
	                          this.techReportChange(p.proposalCode,
	                            techReport,
	                            'details',
	                            e.target.value,
	                            reviewer)
	                        } }
	                        disabled={ isPastSemester }
	                      >
	                        <option>none</option>
	                        <option>yes</option>
	                        <option>no</option>
	                      </select>
	                    </td>
	                  }
	                  <td className='width-200'>
	                    {
	                      !canAssignOtherReviewer(user.roles) ?
	                        <div>
	                          <input
	                            disabled={ isPastSemester || !this.showNone(p.proposalCode, semester) }
	                            type='checkbox'
	                            checked={ !this.showChecked(p.proposalCode, semester) }
	                            value={ user.username }
	                            onChange={ e => {
	                              this.techReviewerChange(p.proposalCode,
	                                e.target.checked ? user.username : '',
	                                techReport)
	                            } }/>
	                          {!p.techReviews[ semester ].reviewer.username
	                            ?
	                            <label>Assign Yourself</label>:<label>{saltAstronomerName(reviewer)}</label>}
	                        </div>
	                        :
	                        <select disabled={ isPastSemester }
												        value={ reviewer || '' }
												        onChange={ e => {
													        this.techReviewerChange(p.proposalCode,
														        e.target.value,
														        techReport)
												        } }>
	                          {this.showNone(p.proposalCode, semester) && <option value=''>none</option>}
	                          {
	                            saltAstronomers.map(
	                              astronomer => (
	                                <option
	                                  key={ astronomer.username }
	                                  value={ astronomer.username }
	                                >
	                                  {saltAstronomerName(
	                                    astronomer.username)}
	                                </option>
	                              ))
	                          }
	                          {reviewer && !isSaltAstronomer(reviewer) &&
													<option
													  key={ reviewer }
													  value={ reviewer }>
													  {reviewer}
													</option>}
	                        </select>
	                    }
	                  </td>
	                </tr>
	              )
	            })
	          }
	        </tbody>
	      </table>
	    </div>
	  )
	};
}

TechReviewTable.propTypes = {
  proposals: propTypes.array.isRequired,
  user: propTypes.object.isRequired,
  SALTAstronomers: propTypes.array.isRequired,
  onTechReviewChange: propTypes.func.isRequired,
  semester: propTypes.string.isRequired,
  initProposals: propTypes.array,
}
