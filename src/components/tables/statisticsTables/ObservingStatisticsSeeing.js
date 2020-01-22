import React from 'react'
import propTypes from 'prop-types'

const ObservingStatisticsSeeing = ({ observingConditionsSeeing }) => {
  const { numberOfProposals, timeRequested } = observingConditionsSeeing
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
            <td>{ (timeRequested.lessEqual1Dot5).toFixed(2) }</td>
            <td>{ numberOfProposals.lessEqual1Dot5 }</td>
            <td>{ ((timeRequested.lessEqual1Dot5/totalReqTime)*100).toFixed(1) }</td>
          </tr>
          <tr>
            <td>Max Seeing <br /> &#x2266; 2.0</td>
            <td>{ (timeRequested.lessEqual2).toFixed(2) }</td>
            <td>{ numberOfProposals.lessEqual2 }</td>
            <td>{ (((timeRequested.lessEqual2)/totalReqTime)*100).toFixed(1) }</td>
          </tr>
          <tr>
            <td>Max Seeing <br /> &#x2266; 3.0</td>
            <td>{ (timeRequested.lessEqual3).toFixed(2) }</td>
            <td>{ numberOfProposals.lessEqual3 }</td>
            <td>{ (((timeRequested.lessEqual3)/totalReqTime)*100).toFixed(1) }</td>
          </tr>
          <tr>
            <td>Max Seeing <br /> &#x2267; 3.0</td>
            <td>{ (timeRequested.moreThan3).toFixed(2) }</td>
            <td>{ numberOfProposals.moreThan3 }</td>
            <td>{ (((timeRequested.moreThan3)/totalReqTime)*100).toFixed(1) }</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

ObservingStatisticsSeeing.propTypes = {
  observingConditionsSeeing: propTypes.object.isRequired,
}

export default ObservingStatisticsSeeing