import React from 'react'
import propTypes from 'prop-types'

const RSSObservingModeTable = ({numberOfConfigurationsPerRssObservingMode}) => {
  const {
    fabryPerot,
    mos,
    mosPolarimetry,
    fabryPerotPolarimetry,
    spectroscopy,
    spectropolarimetry,
    imaging,
    polarimetricImaging
  } = numberOfConfigurationsPerRssObservingMode
  return(
    <div className='stat-item'>
      <h2>RSS Observing Mode</h2>
      <table className='stat-table'>

        {/* RSS Observing mode */}
        <thead>
          <tr>
            <th>Observing mode</th>
            <th>Number of configurations</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Fabry Perot</td>
            <td>{ fabryPerot }</td>
          </tr>
          <tr>
            <td>FP polarimetry</td>
            <td>{ fabryPerotPolarimetry }</td>
          </tr>

          <tr>
            <td>MOS</td>
            <td>{ mos }</td>
          </tr>
          <tr>
            <td>MOS polarimetry</td>
            <td>{ mosPolarimetry }</td>
          </tr>
          <tr>
            <td>Polarimetric imaging</td>
            <td>{ polarimetricImaging }</td>
          </tr>
          <tr>
            <td>Imaging</td>
            <td>{ imaging }</td>
          </tr>
          <tr>
            <td>Spectropolarimetry</td>
            <td>{ spectropolarimetry }</td>
          </tr>
          <tr>
            <td>Spectroscopy</td>
            <td>{ spectroscopy }</td>
          </tr>
        </tbody>

      </table>
    </div>
  )
}

RSSObservingModeTable.propTypes = {
  numberOfConfigurationsPerRssObservingMode: propTypes.object.isRequired,
}

export default RSSObservingModeTable
