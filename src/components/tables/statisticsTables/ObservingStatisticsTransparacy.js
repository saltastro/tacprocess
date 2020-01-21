import React from 'react'
import propTypes from 'prop-types'

const ObservingStatisticsTransparency = ({ observingConditionsClouds }) => {
  const totalReqTime = observingConditionsClouds.timeRequested.any +
    observingConditionsClouds.timeRequested.clear +
    observingConditionsClouds.timeRequested.thinCloud +
    observingConditionsClouds.timeRequested.thickCloud
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
            <td>{ observingConditionsClouds.timeRequested.clear.toFixed(2) }</td>
            <td>{ observingConditionsClouds.numberOfProposals.clear }</td>
            <td>{ ((observingConditionsClouds.timeRequested.clear / totalReqTime) * 100).toFixed(1) }</td>
          </tr>
          <tr>
            <td>Thin cloud</td>
            <td>{ observingConditionsClouds.timeRequested.thinCloud.toFixed(2) }</td>
            <td>{ observingConditionsClouds.numberOfProposals.thinCloud }</td>
            <td>{ ((observingConditionsClouds.timeRequested.thinCloud / totalReqTime) * 100).toFixed(1) }</td>
          </tr>
          <tr>
            <td>Thick cloud</td>
            <td>{ observingConditionsClouds.timeRequested.thickCloud.toFixed(2)}</td>
            <td>{ observingConditionsClouds.numberOfProposals.thickCloud }</td>
            <td>{ ((observingConditionsClouds.timeRequested.thickCloud / totalReqTime) * 100).toFixed(1)}</td>
          </tr>
          <tr>
            <td>Any</td>
            <td>{ observingConditionsClouds.timeRequested.any.toFixed(2) }</td>
            <td>{ observingConditionsClouds.numberOfProposals.any }</td>
            <td>{ ((observingConditionsClouds.timeRequested.any / totalReqTime) * 100).toFixed(1) }</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

ObservingStatisticsTransparency.propTypes = {
  observingConditionsClouds: propTypes.object.isRequired
}

export default ObservingStatisticsTransparency
