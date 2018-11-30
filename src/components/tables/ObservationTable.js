import React from 'react'
import propTypes from 'prop-types'
import '../../styles/components/tables.css'
import ObservationTableRow from './tablesComponents/ObservationTableRow'
import { statusPriority } from '../../util/partner-stat'

const ObservationTable = ({semester, proposal, partner}) => {
  if (proposal == null || proposal === undefined || Object.keys(proposal).length === 0) {
    return null
  }
  const priorityObservations = [
    { priority: 0, percentage: statusPriority(proposal, 0, 'ACCEPTED', semester, partner) },
    { priority: 1, percentage: statusPriority(proposal, 1, 'ACCEPTED', semester, partner) },
    { priority: 2, percentage: statusPriority(proposal, 2, 'ACCEPTED', semester, partner) },
    { priority: 3, percentage: statusPriority(proposal, 3, 'ACCEPTED', semester, partner) },
    { priority: 4, percentage: statusPriority(proposal, 4, 'ACCEPTED', semester, partner) }
  ]
  return (
    <table style={ { width: '100%' } }>
      <thead>
        <tr>
          <th>Priority</th>
          <th>Percentage</th>
        </tr>
      </thead>
      <tbody>
        {
          priorityObservations.map(o => (
            <ObservationTableRow
              key={ o.priority }
              observation={ Object.keys(o).length ? o : { } }
            />))
        }
      </tbody>
    </table>
  )
}

ObservationTable.propTypes = {
  proposal: propTypes.object.isRequired,
  semester: propTypes.string.isRequired,
  partner: propTypes.string.isRequired
}
export default ObservationTable
