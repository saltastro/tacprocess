import React from 'react'
import propTypes from 'prop-types'

export function countInstruments (proposals){
  const count = {
    rss: 0,
    hrs: 0,
    scam: 0,
    bvit: 0,
  };
	 (proposals || []).forEach( p => {
	    count.rss += p.instruments.rss.length > 0 && 1
	    count.hrs += p.instruments.hrs.length > 0 && 1
	    count.scam += p.instruments.scam.length > 0 && 1
	    count.bvit += p.instruments.bvit.length > 0 && 1
  })
  return count

}

const ConfigurationsStatistics = ({numberOfConfigurationsPerInstrument}) => {
  const { rss, hrs, salticam, bvit } = numberOfConfigurationsPerInstrument
  return(
    <div className='stat-item'>
      <h2>Configuration Statistics</h2>
      <table className='stat-table'>
        <thead>
          <tr>
            <th>Instruments</th>
            <th>Number of configurations</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>RSS</td>
            <td>{ rss }</td>
          </tr>
          <tr>
            <td>SALTICAM</td>
            <td>{ salticam }</td>
          </tr>
          <tr>
            <td>HRS</td>
            <td>{ hrs }</td>
          </tr>
          <tr>
            <td>BVIT</td>
            <td>{ bvit }</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

ConfigurationsStatistics.propTypes = {
  numberOfConfigurationsPerInstrument: propTypes.object.isRequired
}

export default ConfigurationsStatistics
