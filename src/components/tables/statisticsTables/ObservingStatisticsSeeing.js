import React from 'react'
import propTypes from 'prop-types'
import { FRACTION_DIGITS_1, FRACTION_DIGITS_2 } from '../../../types'
import { getPercentage } from '../../../util'

const ObservingStatisticsSeeing = ({ seeingDistribution }) => {
  const { numberOfProposals, timeRequested } = seeingDistribution
  const totalReqTime = timeRequested.lessEqual1Dot5 + timeRequested.lessEqual2 +
    timeRequested.lessEqual3 + timeRequested.moreThan3

  return(
    <div className='stat-item'  style={ {textAlign: 'left', width: '100%'} }>
      <table className='stat-table'  style={ {height: '100%'} }>
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
            <td>{ (timeRequested.lessEqual1Dot5).toFixed(FRACTION_DIGITS_2) }</td>
            <td>{ numberOfProposals.lessEqual1Dot5 }</td>
            <td>{ getPercentage(timeRequested.lessEqual1Dot5, totalReqTime).toFixed(FRACTION_DIGITS_1) }</td>
          </tr>
          <tr>
            <td>Max Seeing <br /> &#x2266; 2.0</td>
            <td>{ (timeRequested.lessEqual2).toFixed(FRACTION_DIGITS_2) }</td>
            <td>{ numberOfProposals.lessEqual2 }</td>
            <td>{ getPercentage(timeRequested.lessEqual2, totalReqTime).toFixed(FRACTION_DIGITS_1) }</td>
          </tr>
          <tr>
            <td>Max Seeing <br /> &#x2266; 3.0</td>
            <td>{ (timeRequested.lessEqual3).toFixed(FRACTION_DIGITS_2) }</td>
            <td>{ numberOfProposals.lessEqual3 }</td>
            <td>{ getPercentage(timeRequested.lessEqual3, totalReqTime).toFixed(FRACTION_DIGITS_1) }</td>
          </tr>
          <tr>
            <td>Max Seeing <br /> &#x2267; 3.0</td>
            <td>{ (timeRequested.moreThan3).toFixed(FRACTION_DIGITS_2) }</td>
            <td>{ numberOfProposals.moreThan3 }</td>
            <td>{ getPercentage(timeRequested.moreThan3, totalReqTime).toFixed(FRACTION_DIGITS_1) }</td>
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