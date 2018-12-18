import React from 'react'
import propTypes from 'prop-types'
import '../../styles/components/tables.css'
import ObservationTableRow from './tablesComponents/ObservationTableRow'

const ObservationTable = ({priorityObservations}) => {
  if (!priorityObservations.length) {
    return null
  }
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
  priorityObservations: propTypes.array.isRequired
}
export default ObservationTable
