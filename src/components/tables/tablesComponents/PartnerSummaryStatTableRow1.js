import React from 'react'
import propTypes from 'prop-types'
import { calculatePercentage } from '../../../util/partner-stat'
import { removeDot00 } from '../../../util'
import { P3_OVERALLOCATION_FACTOR } from '../../../types'

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
        removeDot00((partnerSummaryStat.summary.observedTime.p0 + partnerSummaryStat.summary.observedTime.p1).toFixed(2))}</td>
      <td>{ removeDot00(partnerSummaryStat.summary.observedTime.p2.toFixed(2)) }</td>
      <td>{ removeDot00(partnerSummaryStat.summary.observedTime.p3.toFixed(2)) }</td>
      <td>{ removeDot00(totalObserved.toFixed(2)) }</td>
      <td>{
        removeDot00(calculatePercentage(partnerSummaryStat.summary.observedTime.p0 + partnerSummaryStat.summary.observedTime.p1,
          partnerSummaryStat.summary.allocatedTime.p0 + partnerSummaryStat.summary.allocatedTime.p1).toFixed(2)
        ) }%</td>
      <td>{ removeDot00(calculatePercentage(partnerSummaryStat.summary.observedTime.p2, partnerSummaryStat.summary.allocatedTime.p2).toFixed(2)) }%</td>
      <td>{ removeDot00(calculatePercentage(partnerSummaryStat.summary.observedTime.p3, partnerSummaryStat.summary.allocatedTime.p3/3).toFixed(2)) }%</td>
      <td>{ removeDot00(calculatePercentage(totalObserved, partnerSummaryStat.summary.allocatedTime.p0 + partnerSummaryStat.summary.allocatedTime.p1 +
        partnerSummaryStat.summary.allocatedTime.p2 + partnerSummaryStat.summary.allocatedTime.p3/P3_OVERALLOCATION_FACTOR)  // as P3 time is over allocated by the factor of 3
      .toFixed(2)) }%</td>
      <td>{ removeDot00(partnerSummaryStat.sharePercentage.toFixed(2)) }%</td>
      <td>{ removeDot00(calculatePercentage(totalObserved, totalObservation).toFixed(2)) }%</td>
    </tr>
  )
}

PartnerSummaryStatTableRow1.propTypes = {
  partnerSummaryStat: propTypes.object.isRequired,
  totalObservation: propTypes.number.isRequired
}
export default PartnerSummaryStatTableRow1
