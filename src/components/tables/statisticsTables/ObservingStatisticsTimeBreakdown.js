import React from 'react'
import propTypes from 'prop-types'
import { rounded } from '../../../util'
import { LOW_PRECISION } from '../../../types'

const ObservingStatisticsTimeBreakdown = ({timeBreakdown}) => {
  const totalTimeBreakdown = timeBreakdown.science + timeBreakdown.engineering + timeBreakdown.lostToWeather + timeBreakdown.lostToProblems
  return (
    <div className='stat-item'>
      <table className='stat-table'>
        <thead>
          <tr>
            <th>Category</th>
            <th>Time (hrs)</th>
            <th>Fraction (%)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Science</td>
            <td>{rounded(timeBreakdown.science / 3600)}</td>
            <td>{rounded(timeBreakdown.science / totalTimeBreakdown * 100, LOW_PRECISION)}</td>
          </tr>
          <tr>
            <td>Engineering</td>
            <td>{rounded(timeBreakdown.engineering / 3600)}</td>
            <td>{rounded(timeBreakdown.engineering / totalTimeBreakdown * 100, LOW_PRECISION)}</td>
          </tr>
          <tr>
            <td>Time lost to weather</td>
            <td>{rounded(timeBreakdown.lostToWeather / 3600)}</td>
            <td>{rounded(timeBreakdown.lostToWeather / totalTimeBreakdown * 100, LOW_PRECISION)}</td>
          </tr>
          <tr>
            <td>Time lost to problems</td>
            <td>{rounded(timeBreakdown.lostToProblems / 3600)}</td>
            <td>{rounded(timeBreakdown.lostToProblems / totalTimeBreakdown * 100, LOW_PRECISION)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

ObservingStatisticsTimeBreakdown.propTypes = {
  timeBreakdown: propTypes.object.isRequired
}

export default ObservingStatisticsTimeBreakdown
