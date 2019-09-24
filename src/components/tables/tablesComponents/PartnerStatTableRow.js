import React from 'react'
import propTypes from 'prop-types'
import ObservationTable from '../ObservationTable'
import { overallCompletionRate, semesterComment, statusPriority } from '../../../util/partner-stat'
import { ADMINISTRATOR, SALT_ASTRONOMER } from '../../../types'

class PartnerStatTableRow extends React.Component {
  render () {
    const {semester, proposal, partner, user} = this.props
    if ((proposal == null || Object.keys(proposal).length === 0) || user == null) {
      return null
    }
    let statusBackgroundColor = ''
    switch (proposal.status) {
      case 'COMPLETED': statusBackgroundColor = '#71dced'; break
      case 'ACCEPTED': statusBackgroundColor = '#b9ef9b'; break
      case 'UNDER_TECHNICAL_REVIEW': statusBackgroundColor = '#FF8183'; break
      case 'INACTIVE': statusBackgroundColor = '#ef825d'; break
      default:
        statusBackgroundColor = ''
    }
    const priorityObservations = [
      statusPriority(proposal, 0, 'ACCEPTED', semester, partner),
      statusPriority(proposal, 1, 'ACCEPTED', semester, partner),
      statusPriority(proposal, 2, 'ACCEPTED', semester, partner),
      statusPriority(proposal, 3, 'ACCEPTED', semester, partner),
      statusPriority(proposal, 4, 'ACCEPTED', semester, partner)
    ]
    const p3CompletionRate = priorityObservations[ 3 ].percentage > 33.33 ? {
      backgroundColor: '#71dced',
      status: 'COMPLETED'
    } : {
      backgroundColor: '',
      status: ''
    }
    const _overallCompletionRate = overallCompletionRate(proposal, 'ACCEPTED', semester, partner) > 0.9 ? {
      backgroundColor: '#71dced',
      status: 'COMPLETED'
    } : {
      backgroundColor: '',
      status: ''
    }
    return (
      <tr>
        <td style={ { width: '10%' } }>
          <a
            target='_blank'
            href={ `https://www.salt.ac.za/wm/proposal/${ proposal.proposalCode }` }>
            { proposal.proposalCode }
          </a>
        </td>
        <td style={ { width: '10%' } }>{ proposal.title }</td>
        <td>{ proposal.principalInvestigator ? `${ proposal.principalInvestigator.givenName } ${ proposal.principalInvestigator.familyName }` : ''  }</td>
        <td>{ proposal.liaisonAstronomer ? `${ proposal.liaisonAstronomer.givenName } ${ proposal.liaisonAstronomer.familyName }` : '' }</td>
        <td style={ { backgroundColor: statusBackgroundColor, width: '50px' } }>{ proposal.status }</td>
        <td>{ proposal.observations.length }</td>
        <td>
          <ObservationTable
            priorityObservations={ priorityObservations }
          />
        </td>
        <td style={ { backgroundColor: p3CompletionRate.backgroundColor } }>
          { priorityObservations[ 3 ].percentage }%<br /> <br />
          { p3CompletionRate.status }
        </td>
        <td style={ { backgroundColor: _overallCompletionRate.backgroundColor } }>
          {overallCompletionRate(proposal, 'ACCEPTED', semester, partner)} <br /> <br />
          {_overallCompletionRate.status}
        </td>
        <td style={ { width: '15%' } }>
          <textarea
            style={ { width: '100%' } }
            rows={ 12 }
            disabled={ !user.roles.some(r => (r.type === ADMINISTRATOR || r.type === SALT_ASTRONOMER)) }
            defaultValue={ semesterComment(this.props.proposal, semester) }
            onChange={ e => this.props.completionCommentChange(proposal.proposalCode, semester, e.target.value) }
          />
        </td>
      </tr>
    )
  }
}

PartnerStatTableRow.propTypes = {
  proposal: propTypes.object.isRequired,
  semester: propTypes.string.isRequired,
  partner: propTypes.string.isRequired,
  user: propTypes.object.isRequired,
  completionCommentChange: propTypes.func.isRequired
}

export default PartnerStatTableRow
