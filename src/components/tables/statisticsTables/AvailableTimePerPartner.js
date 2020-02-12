import React from 'react'
import propTypes from 'prop-types'
import { areAllocatedTimesCorrect, allocatedTimeTotals, rounded } from '../../../util'
import {badTime, goodTime} from '../../../types'

const AvailableTimePerPartner = ({partner, availableTime, proposals}) => {
  availableTime[ partner ] ? availableTime = availableTime[ partner ] : availableTime = {p0p1: 0, p2: 0, p3: 0}
  const correctAllocations = areAllocatedTimesCorrect(partner, availableTime, proposals)
  const allocatedTotals = allocatedTimeTotals(proposals, partner)
  return(
    <div className='stat-item' style={ {textAlign: 'left', width: '100%'} }>
      <table className='stat-table'>
        <thead>
          <tr>
            <th>{ partner }</th>
            <th>Available Time (hours)</th>
            <th>Allocated Time (hours)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Priority 0 & 1</td>
            <td>{ rounded(availableTime.p0p1) }</td>
            <td style={ correctAllocations.p0p1 ? goodTime : badTime }><label>{ rounded(parseFloat(allocatedTotals.p0/(60*60)) + parseFloat(allocatedTotals.p1/(60*60)) || 0) }</label></td>
          </tr>
          <tr>
            <td>Priority 2  </td>
            <td>{ rounded(availableTime.p2) } </td>
            <td style={ correctAllocations.p2 ? goodTime : badTime }><label>{ rounded(parseFloat(allocatedTotals.p2/(60*60))) || 0 }</label></td>
          </tr>
          <tr>
            <td>Priority 3  </td>
            <td>{ rounded(availableTime.p3) } </td>
            <td style={ correctAllocations.p3 ? goodTime : badTime }><label>{ rounded(parseFloat(allocatedTotals.p3/(60*60))) || 0 }</label></td>
          </tr>
          <tr>
            <td>Priority 4 </td>
            <td style={ {fontSize: '23px'} }> &infin;</td>
            <td style={ goodTime }>{ rounded(parseFloat(allocatedTotals.p4)) }</td>
          </tr>
        </tbody>
      </table>
		
    </div>
  )
}

AvailableTimePerPartner.propTypes = {
  partner : propTypes.string.isRequired,
  proposals: propTypes.array.isRequired,
  availableTime: propTypes.object.isRequired
}

export default AvailableTimePerPartner
