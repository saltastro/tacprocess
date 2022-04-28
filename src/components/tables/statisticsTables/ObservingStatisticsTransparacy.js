import React from 'react'
import propTypes from 'prop-types'
import { getPercentage, rounded } from '../../../util'
import { LOW_PRECISION } from '../../../types'

const ObservingStatisticsTransparency = ({ transparencyDistribution }) => {
  const { timeRequested, numberOfProposals } = transparencyDistribution
  const totalReqTime = timeRequested.any + timeRequested.clear + timeRequested.thinCloud + timeRequested.thickCloud
  return (
    <div>
      <table className='stat-table'>
        <thead>
          <tr>
            <th>Conditions</th>
            <th>Time requested (hrs)</th>
            <th>Number of Proposals</th>
            <th>Fraction (%)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Clear</td>
            <td>{ rounded(timeRequested.clear) }</td>
            <td>{ numberOfProposals.clear }</td>
            <td>{ rounded(getPercentage(timeRequested.clear, totalReqTime), LOW_PRECISION)}</td>
          </tr>
          <tr>
            <td>Thin cloud</td>
            <td>{ rounded(timeRequested.thinCloud) }</td>
            <td>{ numberOfProposals.thinCloud }</td>
            <td>{ rounded(getPercentage(timeRequested.thinCloud, totalReqTime), LOW_PRECISION)}</td>
          </tr>
          <tr>
            <td>Thick cloud</td>
            <td>{ rounded(timeRequested.thickCloud)}</td>
            <td>{ numberOfProposals.thickCloud }</td>
            <td>{ rounded(getPercentage(timeRequested.thickCloud, totalReqTime),LOW_PRECISION)}</td>
          </tr>
          <tr>
            <td>Any</td>
            <td>{ rounded(timeRequested.any) }</td>
            <td>{ numberOfProposals.any }</td>
            <td>{ rounded(getPercentage(timeRequested.any, totalReqTime), LOW_PRECISION)}</td>
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
