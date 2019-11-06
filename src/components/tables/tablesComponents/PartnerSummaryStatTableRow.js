import React from 'react'
import propTypes from 'prop-types'

const PartnerSummaryStatTableRow = ({partner, partnerSummaryStat}) => {
  if (partnerSummaryStat == null || Object.keys(partnerSummaryStat).length === 0) return null
  return (
    <tr>
      <td>{ partner }</td>
      <td>{ partnerSummaryStat.allocatedTime.p0p1 }</td>
      <td>{ partnerSummaryStat.allocatedTime.p2 }</td>
      <td>{ partnerSummaryStat.allocatedTime.p3 }</td>
      <td>{ partnerSummaryStat.allocatedTime.total }</td>
      <td>{ partnerSummaryStat.observedTime.p0p1 }</td>
      <td>{ partnerSummaryStat.observedTime.p2 }</td>
      <td>{ partnerSummaryStat.observedTime.p3 }</td>
      <td>{ partnerSummaryStat.observedTime.total }</td>
      <td>{ partnerSummaryStat.completeness.p0p1 }%</td>
      <td>{ partnerSummaryStat.completeness.p2 }%</td>
      <td>{ partnerSummaryStat.completeness.p3 }%</td>
      <td>{ partnerSummaryStat.completeness.total }%</td>
      <td>{ partnerSummaryStat.partnerAllocatedShareTime }%</td>
      <td>{ partnerSummaryStat.partnerObservedShareTime }%</td>
    </tr>
  )
}

PartnerSummaryStatTableRow.propTypes = {
  partnerSummaryStat: propTypes.object.isRequired,
  partner: propTypes.string.isRequired
}
export default PartnerSummaryStatTableRow
