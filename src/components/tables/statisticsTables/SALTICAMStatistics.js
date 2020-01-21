import React from 'react'
import propTypes from 'prop-types'

const SALTICAMStatistics = ({numberOfConfigurationsPerSalticamDetector}) => {
  const {
    driftScan,
    frameTransfer,
    normal,
    slotMode
  } = numberOfConfigurationsPerSalticamDetector
  return(
    <div  className='stat-item' style={ {textAlign: 'center'} }>
      <table className='stat-table'>
        <thead>
          <tr>
            <th>Detector mode</th>
            <th>Number of configurations</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>DRIFT SCAN</td>
            <td>{ driftScan }</td>
          </tr>
          <tr>
            <td>FRAME XFER</td>
            <td>{ frameTransfer }</td>
          </tr>
          <tr>
            <td>NORMAL</td>
            <td>{ normal }</td>
          </tr>
          <tr>
            <td>SLOT</td>
            <td>{ slotMode }</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

SALTICAMStatistics.propTypes = {
  numberOfConfigurationsPerSalticamDetector: propTypes.object.isRequired,
}

export default SALTICAMStatistics
