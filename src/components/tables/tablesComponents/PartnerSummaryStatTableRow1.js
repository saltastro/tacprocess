import React from 'react'
import propTypes from 'prop-types'
import { calculatePercentage } from '../../../util/partner-stat'

const PartnerSummaryStatTableRow1 = ({ partnerSummaryStat, totalObservation }) => {
  if (partnerSummaryStat == null || Object.keys(partnerSummaryStat).length === 0) return null

  // const totalAllocated =  partnerSummaryStat.summary.allocatedTime.p0 + partnerSummaryStat.summary.allocatedTime.p1 +
  //   partnerSummaryStat.summary.allocatedTime.p2 + partnerSummaryStat.summary.allocatedTime.p3
  const totalObserved = partnerSummaryStat.summary.observedTime.p0 + partnerSummaryStat.summary.observedTime.p1 +
    partnerSummaryStat.summary.observedTime.p2 + partnerSummaryStat.summary.observedTime.p3

  return (
    <tr>
      <td>{ partnerSummaryStat.partner }</td>
      <td>{ (partnerSummaryStat.summary.allocatedTime.p0 + partnerSummaryStat.summary.allocatedTime.p1) }</td>
      <td>{ partnerSummaryStat.summary.allocatedTime.p2 }</td>
      <td>{ partnerSummaryStat.summary.allocatedTime.p3 }</td>
      <td>{ partnerSummaryStat.summary.allocatedTime.p0 + partnerSummaryStat.summary.allocatedTime.p1 +
      partnerSummaryStat.summary.allocatedTime.p2 + partnerSummaryStat.summary.allocatedTime.p3 }</td>
      <td>{
        (partnerSummaryStat.summary.observedTime.p0 + partnerSummaryStat.summary.observedTime.p1).toFixed(2).replace(/\.00$/, '')}</td>
      <td>{ partnerSummaryStat.summary.observedTime.p2.toFixed(2).replace(/\.00$/, '') }</td>
      <td>{ partnerSummaryStat.summary.observedTime.p3.toFixed(2).replace(/\.00$/, '') }</td>
      <td>{ totalObserved.toFixed(2).replace(/\.00$/, '') }</td>
      <td>{
        calculatePercentage(partnerSummaryStat.summary.observedTime.p0 + partnerSummaryStat.summary.observedTime.p1,
          partnerSummaryStat.summary.allocatedTime.p0 + partnerSummaryStat.summary.allocatedTime.p1).toFixed(2)
        .replace(/\.00$/, '') }%</td>
      <td>{ calculatePercentage(partnerSummaryStat.summary.observedTime.p2, partnerSummaryStat.summary.allocatedTime.p2).toFixed(2).replace(/\.00$/, '') }%</td>
      <td>{ calculatePercentage(partnerSummaryStat.summary.observedTime.p3, partnerSummaryStat.summary.allocatedTime.p3/3).toFixed(2).replace(/\.00$/, '') }%</td>
      <td>{ calculatePercentage(totalObserved, partnerSummaryStat.summary.allocatedTime.p0 + partnerSummaryStat.summary.allocatedTime.p1 +
        partnerSummaryStat.summary.allocatedTime.p2 + partnerSummaryStat.summary.allocatedTime.p3/3)
      .toFixed(2).replace(/\.00$/, '') }%</td>
      <td>{ partnerSummaryStat.sharePercentage.toFixed(2).replace(/\.00$/, '') }%</td>
      <td>{ calculatePercentage(totalObserved, totalObservation).toFixed(2).replace(/\.00$/, '') }%</td>
    </tr>
  )
}

PartnerSummaryStatTableRow1.propTypes = {
  partnerSummaryStat: propTypes.object.isRequired,
  totalObservation: propTypes.number.isRequired
}
export default PartnerSummaryStatTableRow1
