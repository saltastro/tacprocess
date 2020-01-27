import React from 'react'
import propTypes from 'prop-types'

const HRSStatistics = ({numberOfConfigurationsPerHrsResolution}) => {

  const {
    lowResolution,
    mediumResolution,
    highResolution,
    highStability,
    intCalFibre
  } = numberOfConfigurationsPerHrsResolution
  return(
    <div  className='stat-item' style={ {textAlign: 'center'} }>
      <table className='stat-table'>
        <thead>
          <tr>
            <th>Exposure mode</th>
            <th>Number of configurations</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>HIGH RESOLUTION</td>
            <td>{ highResolution }</td>
          </tr>
          <tr>
            <td>HIGH STABILITY</td>
            <td>{ highStability }</td>
          </tr>
          <tr>
            <td>INT CAL FIBRE</td>
            <td>{ intCalFibre }</td>
          </tr>
          <tr>
            <td>LOW RESOLUTION</td>
            <td>{ lowResolution }</td>
          </tr>
          <tr>
            <td>MEDIUM RESOLUTION</td>
            <td>{ mediumResolution }</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

HRSStatistics.propTypes = {
  numberOfConfigurationsPerHrsResolution: propTypes.object.isRequired,
}

export default HRSStatistics
