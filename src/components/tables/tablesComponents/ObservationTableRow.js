import React from 'react'
import propTypes from 'prop-types'

const ObservationTabelRow = ({observation}) => {
  if (observation == null || Object.keys(observation).length === 0) return null
  return (
    <tr key={ observation.priority }>
      <td>P{ observation.priority }</td>
      <td>{ observation.percentage }%</td>
    </tr>
  )
}

ObservationTabelRow.propTypes = {
  observation: propTypes.object.isRequired
}
export default ObservationTabelRow
