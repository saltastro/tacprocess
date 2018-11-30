import React from 'react'
import propTypes from 'prop-types'
import ObservationTable from '../ObservationTable'
import { semesterComment } from '../../../util/partner-stat'
import { ADMINISTRATOR, SALT_ASTRONOMER } from '../../../types'

const PartnerStatTableRow = ({semester, proposal, partner, user}) => {
  if ((proposal == null || Object.keys(proposal).length === 0) || user == null) {
    return null
  }
  let statusBackgroundColor = ''
  switch (proposal.status) {
    case 'ACTIVE': statusBackgroundColor = '#b9ef9b'; break
    case 'COMPLETED': statusBackgroundColor = '#71dced'; break
    case 'ACCEPTED': statusBackgroundColor = 'pink'; break
    case 'UNDER_TECHNICAL_REVIEW': statusBackgroundColor = '#f2d637'; break
    case 'REJECTED': statusBackgroundColor = '#ef825d'; break
    default:
      statusBackgroundColor = ''
  }
  const piName = proposal.principalInvestigator ? `${ proposal.principalInvestigator.givenName } ${ proposal.principalInvestigator.familyName }` : ''
  const liaisonName = proposal.liaisonAstronomer ? `${ proposal.liaisonAstronomer.givenName } ${ proposal.liaisonAstronomer.familyName }` : ''
  return (
    <tr key={ proposal.proposalCode }>
      <td>
        <a
          target='_blank'
          href={ `https://www.salt.ac.za/wm/proposal/${ proposal.proposalCode }` }>
          { proposal.proposalCode }
        </a>
      </td>
      <td className=' table-height width-200'>{ proposal.title }</td>
      <td>{ piName }</td>
      <td>{ liaisonName }</td>
      <td>
        <ObservationTable
          proposal={ proposal }
          semester={ semester }
          partner={ partner }
        />
      </td>
      <td style={ { backgroundColor: statusBackgroundColor } }>{ proposal.status }</td>
      <td>
        <textarea
          rows={ 10 }
          disabled={ !user.roles.some(r => (r.type === ADMINISTRATOR || r.type === SALT_ASTRONOMER)) }
          defaultValue={ semesterComment(proposal, semester) }
        />
      </td>
    </tr>
  )
}

PartnerStatTableRow.propTypes = {
  proposal: propTypes.object.isRequired,
  semester: propTypes.string.isRequired,
  partner: propTypes.string.isRequired,
  user: propTypes.object.isRequired
}
export default PartnerStatTableRow
