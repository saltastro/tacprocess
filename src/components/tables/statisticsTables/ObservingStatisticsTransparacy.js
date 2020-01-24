import React from 'react'
import propTypes from 'prop-types'

const ObservingStatisticsTransparency = ({ transparencyDistribution }) => {
  const { timeRequested, numberOfProposals } = transparencyDistribution
  const totalReqTime = timeRequested.any + timeRequested.clear + timeRequested.thinCloud + timeRequested.thickCloud
  return (
    <div className='stat-item'>
      <table className='stat-table'>
        <thead>
          <tr>
            <th>Conditions</th>
            <th>Time requested (hrs)</th>
            <th>Number of Proposals</th>
            <th>Completion (%)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Clear</td>
            <td>{ timeRequested.clear.toFixed(2) }</td>
            <td>{ numberOfProposals.clear }</td>
            <td>{ ((timeRequested.clear / totalReqTime) * 100).toFixed(1) }</td>
          </tr>
          <tr>
            <td>Thin cloud</td>
            <td>{ timeRequested.thinCloud.toFixed(2) }</td>
            <td>{ numberOfProposals.thinCloud }</td>
            <td>{ ((timeRequested.thinCloud / totalReqTime) * 100).toFixed(1) }</td>
          </tr>
          <tr>
            <td>Thick cloud</td>
            <td>{ timeRequested.thickCloud.toFixed(2)}</td>
            <td>{ numberOfProposals.thickCloud }</td>
            <td>{ ((timeRequested.thickCloud / totalReqTime) * 100).toFixed(1)}</td>
          </tr>
          <tr>
            <td>Any</td>
            <td>{ timeRequested.any.toFixed(2) }</td>
            <td>{ numberOfProposals.any }</td>
            <td>{ ((timeRequested.any / totalReqTime) * 100).toFixed(1) }</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

ObservingStatisticsTransparency.propTypes = {
  transparencyDistribution: propTypes.object.isRequired
}

export default ObservingStatisticsTransparency
