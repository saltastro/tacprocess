import React from 'react'
import propTypes from 'prop-types'
import { getPercentage, rounded } from '../../../util'
import { P3_OVERALLOCATION_FACTOR } from '../../../types'

const PartnerSummaryStatTableRow1 = ({ partnerSummaryStat, totalObservation }) => {
  if (partnerSummaryStat == null || Object.keys(partnerSummaryStat).length === 0) return null
  console.log({partnerSummaryStat})

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
        rounded((partnerSummaryStat.summary.observedTime.p0 + partnerSummaryStat.summary.observedTime.p1))}</td>
      <td>{ rounded(partnerSummaryStat.summary.observedTime.p2) }</td>
      <td>{ rounded(partnerSummaryStat.summary.observedTime.p3) }</td>
      <td>{ rounded(totalObserved) }</td>
      <td>{
        rounded(getPercentage(partnerSummaryStat.summary.observedTime.p0 + partnerSummaryStat.summary.observedTime.p1,
          partnerSummaryStat.summary.allocatedTime.p0 + partnerSummaryStat.summary.allocatedTime.p1)
        ) }%</td>
      <td>{ rounded(getPercentage(partnerSummaryStat.summary.observedTime.p2, partnerSummaryStat.summary.allocatedTime.p2)) }%</td>
      <td>{ rounded(getPercentage(partnerSummaryStat.summary.observedTime.p3, partnerSummaryStat.summary.allocatedTime.p3/3)) }%</td>
      <td>{ rounded(getPercentage(totalObserved, partnerSummaryStat.summary.allocatedTime.p0 + partnerSummaryStat.summary.allocatedTime.p1 +
        partnerSummaryStat.summary.allocatedTime.p2 + partnerSummaryStat.summary.allocatedTime.p3/P3_OVERALLOCATION_FACTOR)  // as P3 time is over allocated by the factor of 3
      ) }%</td>
      <td>{ rounded(partnerSummaryStat.sharePercentage) }%</td>
      <td>{ rounded(getPercentage(totalObserved, totalObservation)) }%</td>
    </tr>
  )
}

PartnerSummaryStatTableRow1.propTypes = {
  partnerSummaryStat: propTypes.object.isRequired,
  totalObservation: propTypes.number.isRequired
}
export default PartnerSummaryStatTableRow1
