import React from 'react'
import propTypes from 'prop-types'
import ObservationTable from '../ObservationTable'
import { neverObserved, semesterComment, statusPriority } from '../../../util/partner-stat'
import { ADMINISTRATOR, SALT_ASTRONOMER } from '../../../types'

class PartnerStatTableRow extends React.Component {
  render () {
    const {semester, proposal, partner, user} = this.props
    if ((proposal == null || Object.keys(proposal).length === 0) || user == null) {
      return null
    }
    let statusBackgroundColor = ''
    switch (proposal.status) {
      case 'ACTIVE': statusBackgroundColor = '#b9ef9b'; break
      case 'COMPLETED': statusBackgroundColor = '#71dced'; break
      case 'ACCEPTED': statusBackgroundColor = 'pink'; break
      case 'UNDER_TECHNICAL_REVIEW': statusBackgroundColor = '#f2d637'; break
      case 'INACTIVE': statusBackgroundColor = '#ef825d'; break
      default:
        statusBackgroundColor = ''
    }
    const priorityObservations = [
      { priority: 0, percentage: statusPriority(proposal, 0, 'ACCEPTED', semester, partner) },
      { priority: 1, percentage: statusPriority(proposal, 1, 'ACCEPTED', semester, partner) },
      { priority: 2, percentage: statusPriority(proposal, 2, 'ACCEPTED', semester, partner) },
      { priority: 3, percentage: statusPriority(proposal, 3, 'ACCEPTED', semester, partner) },
      { priority: 4, percentage: statusPriority(proposal, 4, 'ACCEPTED', semester, partner) }
    ]
    let notObserved = ''
    if (!neverObserved(priorityObservations).length) {
      notObserved = '#FF8183'
    }
    return (
      <tr style={ { backgroundColor: notObserved } }>
        <td style={ { width: '10%' } }>
          <a
            target='_blank'
            href={ `https://www.salt.ac.za/wm/proposal/${ proposal.proposalCode }` }>
            { proposal.proposalCode }
          </a>
        </td>
        <td style={ { width: '20%' } }>{ proposal.title }</td>
        <td>{ proposal.principalInvestigator ? `${ proposal.principalInvestigator.givenName } ${ proposal.principalInvestigator.familyName }` : ''  }</td>
        <td>{ proposal.liaisonAstronomer ? `${ proposal.liaisonAstronomer.givenName } ${ proposal.liaisonAstronomer.familyName }` : '' }</td>
        <td>
          <ObservationTable
            priorityObservations={ priorityObservations }
          />
        </td>
        <td style={ { backgroundColor: statusBackgroundColor } }>{ proposal.status }</td>
        <td>
          <textarea
            style={ { width: '100%' } }
            rows={ 10 }
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
