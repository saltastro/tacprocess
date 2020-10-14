import React from 'react'
import propTypes from 'prop-types'

const RSSDetectorModeTable = ({numberOfConfigurationsPerRssDetectorMode}) => {
  const { driftScan, frameTransfer, normal, shuffle, slotMode } = numberOfConfigurationsPerRssDetectorMode
  return(
    <div className='stat-item' style={ {textAlign: 'center', width: '100%'} }>
	        <h2>RSS Detector Mode</h2>
	        <table className='stat-table'>
		        {/* RSS Dictator mode */}
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
			        <td>FRAME TRANSFER</td>
			        <td>{ frameTransfer }</td>
		        </tr>
		        <tr>
			        <td>NORMAL</td>
			        <td>{ normal }</td>
		        </tr>
		        <tr>
			        <td>SHUFFLE</td>
			        <td>{ shuffle }</td>
		        </tr>
		        <tr>
			        <td>SLOT MODE</td>
			        <td>{ slotMode }</td>
		        </tr>
		        </tbody>
	        </table>
    </div>
  )
}

RSSDetectorModeTable.propTypes = {
	numberOfConfigurationsPerRssDetectorMode: propTypes.object.isRequired,
}

export default RSSDetectorModeTable