import React from 'react'
import propTypes from 'prop-types'
import {totalTimeRequestedPerPartner, totalTimeRequestedForP4} from '../../../util/filters'

const partnerAlloc = (allocatedTime, partner) => {
  let d = { p0p1: 0, p2: 0, p3:0 }
  d = allocatedTime[ partner ] || d
  return d
}

const PartnerTimeTable = ({proposals, partner, allocatedTime, semester}) => {
  const total = totalTimeRequestedPerPartner(proposals, semester, partner)
  const p4Total = totalTimeRequestedForP4(proposals, semester, partner)
  const partnerAllocation = partnerAlloc(allocatedTime, partner)
  const allocatedTimeSum = (partnerAllocation.p0p1 || 0) + (partnerAllocation.p2 || 0) + (partnerAllocation.p3 || 0)
  return(
    <div className='stat-item'>
      <h2>Time for partner <strong>{partner}</strong></h2>
      <table className='stat-table'  style={ {height: '90%'} }>
        <thead>
          <tr>
            <th />
            <th>Total  (hours)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Time to allocate (P0-P3)</td>

            <td>{ allocatedTimeSum.toFixed(2) } </td>
          </tr>
          <tr>
            <td>Actual time available</td>

            <td>{ (allocatedTimeSum/1.4).toFixed(2) } </td>
          </tr>

          <tr>
            <td>Requested time (P0 to P3) </td>
            <td>{(total/3600).toFixed(2)}</td>
          </tr>
          <tr>
            <td>Oversubscription (P0-P3) </td>
            {
              allocatedTimeSum === 0 ?
            <td> - </td> :
            <td>{(((total/3600)/(allocatedTimeSum/1.4))*100).toFixed(2)} %</td>
            }
          </tr>
          <tr>
            <td>Average per proposal (P0 to P3) </td>
            <td>{((total/3600)/ (proposals.length)).toFixed(2) }</td>
          </tr>
          <tr>
            <td>P4 requested time </td>
            <td>{(p4Total/3600).toFixed(2) }</td>
          </tr>

        </tbody>
      </table>
    </div>
  )
}

PartnerTimeTable.propTypes = {
  proposals: propTypes.array.isRequired,
  allocatedTime: propTypes.object.isRequired,
  partner: propTypes.string.isRequired,
  semester: propTypes.string.isRequired,
}

export default PartnerTimeTable
