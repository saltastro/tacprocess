import React from 'react'
import propTypes from 'prop-types'
import { LOW_PRECISION } from '../../../types'
import { getPercentage, rounded } from '../../../util'

const ObservingStatisticsSeeing = ({ seeingDistribution }) => {
  const { numberOfProposals, timeRequested } = seeingDistribution
  const totalReqTime = timeRequested.lessEqual1Dot5 + timeRequested.lessEqual2 +
    timeRequested.lessEqual2Dot5 + timeRequested.lessEqual3 + timeRequested.moreThan3

  return(
    <div>
      <table className='stat-table'>
        <thead>
          <tr>
            <th className='width-150'>Conditions</th>
            <th>Time requested (hrs)</th>
            <th>Number of Proposals</th>
            <th>Fraction of Total Request (%)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Max Seeing <br /> &#x2266; 1.5 </td>
            <td>{ rounded(timeRequested.lessEqual1Dot5) }</td>
            <td>{ numberOfProposals.lessEqual1Dot5 }</td>
            <td>{ rounded(getPercentage(timeRequested.lessEqual1Dot5, totalReqTime), LOW_PRECISION) }</td>
          </tr>
          <tr>
            <td>Max Seeing <br /> &#x2266; 2.0</td>
            <td>{ rounded(timeRequested.lessEqual2) }</td>
            <td>{ numberOfProposals.lessEqual2 }</td>
            <td>{ rounded(getPercentage(timeRequested.lessEqual2, totalReqTime), LOW_PRECISION) }</td>
          </tr>
          <tr>
            <td>Max Seeing <br /> &#x2266; 2.5</td>
            <td>{ rounded(timeRequested.lessEqual2Dot5) }</td>
            <td>{ numberOfProposals.lessEqual2Dot5 }</td>
            <td>{ rounded(getPercentage(timeRequested.lessEqual2Dot5, totalReqTime), LOW_PRECISION) }</td>
          </tr>
          <tr>
            <td>Max Seeing <br /> &#x2266; 3.0</td>
            <td>{ rounded(timeRequested.lessEqual3) }</td>
            <td>{ numberOfProposals.lessEqual3 }</td>
            <td>{ rounded(getPercentage(timeRequested.lessEqual3, totalReqTime), LOW_PRECISION) }</td>
          </tr>
          <tr>
            <td>Max Seeing <br /> &#x2267; 3.0</td>
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
