import React from 'react'
import propTypes from 'prop-types'
import '../../styles/components/tables.css'
import ObservationTableRow from './tablesComponents/ObservationTableRow'
import { neverObserved } from '../../util/partner-stat'

const ObservationTable = ({priorityObservations}) => {
  if (!priorityObservations.length) {
    return null
  }
  let notObserved = ''
  if (!neverObserved(priorityObservations).length) {
    notObserved = '#FF8183'
  }
  return (
    <table style={ { width: '100%' } }>
      <thead>
      <tr>
        <th>Priority</th>
        <th>Observed / Allocated Time (sec)</th>
        <th>Remained Time (sec)</th>
        <th>Percentage</th>
      </tr>
      </thead>
      <tbody style={ { backgroundColor: notObserved } }>
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
