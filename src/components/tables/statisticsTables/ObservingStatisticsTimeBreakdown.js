import React from 'react'
import propTypes from 'prop-types'

const ObservingStatisticsTransparency = ({timeBreakdown}) => {
  const totalTimeBreakdown = (
    timeBreakdown.science + timeBreakdown.engineering + timeBreakdown.lostToWeather + timeBreakdown.lostToProblems
  ) / 3600
  return (
    <div className='stat-item'>
      <table className='stat-table'>
        <thead>
          <tr>
            <th>Category</th>
            <th>Time (hrs)</th>
            <th>Completion Time (%)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Science</td>
            <td>{(timeBreakdown.science / 3600).toFixed(2)}</td>
            <td>{((timeBreakdown.science / 3600) / totalTimeBreakdown * 100).toFixed(2)}</td>
          </tr>
          <tr>
            <td>Engineering</td>
            <td>{(timeBreakdown.engineering / 3600).toFixed(2)}</td>
            <td>{((timeBreakdown.engineering / 3600) / totalTimeBreakdown * 100).toFixed(2)}</td>
          </tr>
          <tr>
            <td>Time lost to weather</td>
            <td>{(timeBreakdown.lostToWeather / 3600).toFixed(2)}</td>
            <td>{((timeBreakdown.lostToWeather / 3600) / totalTimeBreakdown * 100).toFixed(2)}</td>
          </tr>
          <tr>
            <td>Time lost to problems</td>
            <td>{(timeBreakdown.lostToProblems / 3600).toFixed(2)}</td>
            <td>{((timeBreakdown.lostToProblems / 3600) / totalTimeBreakdown * 100).toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

ObservingStatisticsTransparency.propTypes = {
  timeBreakdown: propTypes.object.isRequired
}

export default ObservingStatisticsTransparency
