import React from 'react'
import propTypes from 'prop-types'

const ObservationTableRow = ({observation}) => {
  if (observation == null || Object.keys(observation).length === 0) return null
  return (
    <tr key={ observation.priority }>
      <td>P{ observation.priority }</td>
      <td>{ observation.observedTime } / { observation.allocatedTime }</td>
      <td>{ observation.allocatedTime ? observation.remainder : 'n/a' }</td>
      <td>{ observation.allocatedTime ? `${ observation.percentage } %` : 'n/a' }</td>
    </tr>
  )
}

ObservationTableRow.propTypes = {
  observation: propTypes.object.isRequired
}
export default ObservationTableRow
