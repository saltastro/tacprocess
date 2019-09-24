import React from 'react'
import propTypes from 'prop-types'

const ObservingStatisticsTransparency = ({weatherDownTime}) => (
  <div className='stat-item'>
    <table className='stat-table'>
      <thead>
        <tr>
          <th>Weather Condition</th>
          <th>Time used (hrs)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Science</td>
          <td>{(weatherDownTime.science / 3600).toFixed(2)}</td>
        </tr>
        <tr>
          <td>Engineering</td>
          <td>{(weatherDownTime.engineering / 3600).toFixed(2)}</td>
        </tr>
        <tr>
          <td>Time lost to weather</td>
          <td>{(weatherDownTime.lostToWeather / 3600).toFixed(2)}</td>
        </tr>
        <tr>
          <td>Time lost to problems</td>
          <td>{(weatherDownTime.lostToProblems / 3600).toFixed(2)}</td>
        </tr>
        <tr>
          <td>Idle time</td>
          <td>{(weatherDownTime.idle / 3600).toFixed(2)}</td>
        </tr>
      </tbody>
    </table>
  </div>
)

ObservingStatisticsTransparency.propTypes = {
  weatherDownTime: propTypes.object.isRequired
}

export default ObservingStatisticsTransparency
