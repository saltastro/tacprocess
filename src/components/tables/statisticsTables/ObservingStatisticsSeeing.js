import React from 'react'
import propTypes from 'prop-types'
import { LOW_PRECISION } from '../../../types'
import { getPercentage, rounded } from '../../../util'

const ObservingStatisticsSeeing = ({ seeingDistribution }) => {
  const { numberOfProposals, timeRequested } = seeingDistribution
  const totalReqTime = timeRequested.between0And1Dot5 + timeRequested.between1Dot5And2 +
    timeRequested.between2And2Dot5 + timeRequested.between2Dot5And3 + timeRequested.moreThan3

  return(
    <div>
      <table className='stat-table'>
        <thead>
          <tr>
            <th className='width-200'>Conditions</th>
            <th>Time requested (hrs)</th>
            <th>Number of Proposals</th>
            <th>Fraction of Total Request (%)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>0 &le; Max Seeing &le; 1.5 </td>
            <td>{ rounded(timeRequested.between0And1Dot5) }</td>
            <td>{ numberOfProposals.between0And1Dot5 }</td>
            <td>{ rounded(getPercentage(timeRequested.between0And1Dot5, totalReqTime), LOW_PRECISION) }</td>
          </tr>
          <tr>
            <td>1.5 &lt; Max Seeing  &le; 2.0</td>
            <td>{ rounded(timeRequested.between1Dot5And2) }</td>
            <td>{ numberOfProposals.between1Dot5And2 }</td>
            <td>{ rounded(getPercentage(timeRequested.between1Dot5And2, totalReqTime), LOW_PRECISION) }</td>
          </tr>
          <tr>
            <td>2.0 &lt; Max Seeing &le; 2.5</td>
            <td>{ rounded(timeRequested.between2And2Dot5) }</td>
            <td>{ numberOfProposals.between2And2Dot5 }</td>
            <td>{ rounded(getPercentage(timeRequested.between2And2Dot5, totalReqTime), LOW_PRECISION) }</td>
          </tr>
          <tr>
            <td>2.5 &lt; Max Seeing &le; 3.0</td>
            <td>{ rounded(timeRequested.between2Dot5And3) }</td>
            <td>{ numberOfProposals.between2Dot5And3 }</td>
            <td>{ rounded(getPercentage(timeRequested.between2Dot5And3, totalReqTime), LOW_PRECISION) }</td>
          </tr>
          <tr>
            <td>Max Seeing &ge; 3.0</td>
            <td>{ rounded(timeRequested.moreThan3) }</td>
            <td>{ numberOfProposals.moreThan3 }</td>
            <td>{ rounded(getPercentage(timeRequested.moreThan3, totalReqTime), LOW_PRECISION) }</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

ObservingStatisticsSeeing.propTypes = {
  seeingDistribution: propTypes.object.isRequired,
}

export default ObservingStatisticsSeeing
