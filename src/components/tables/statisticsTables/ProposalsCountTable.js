import React from 'react'
import propTypes from 'prop-types'

const countProposals = proposals => {
  const  count = {
    p4: 0,
    thesis: 0,
    longProposals: 0,
    newProposals:0,
    newAndLong: 0
  };
  (proposals || []).forEach(p => {
    if ( p.isNew) { count.newProposals += 1 }
    if ( p.isLong) { count.longProposals += 1 }
    if ( p.isP4) { count.p4 += 1 }
    if ( p.isThesis) { count.thesis += 1 }
    if ( p.isNew && p.isLong ) { count.newAndLong += 1 }
  })
  return count
}

const ProposalCountTable = ({proposals}) => {
  const count = countProposals(proposals)
  return(
    <div className='stat-item'>
      <h2>Submitted Proposals</h2>
      <table className='stat-table'  style={ {height: '90%'} }>
        <thead>
          <tr>
            <th />
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Number of Proposals</td>
            <td>{proposals.length}</td>
          </tr>
          <tr>
            <td>New proposals </td>
            <td>{ count.newProposals}</td>
          </tr>
          <tr>
            <td>Older Proposals </td>
            <td>{proposals.length - count.newProposals}</td>
          </tr>
          <tr>
            <td>Number of long term proposals </td>
            <td>{ count.longProposals}</td>
          </tr>
          <tr>
            <td>Number of new long term proposals </td>
            <td>{count.newAndLong}</td>
          </tr>
          <tr>
            <td>Thesis projects </td>
            <td>{count.thesis}</td>
          </tr>
          <tr>
            <td>P4 proposals </td>
            <td>{count.p4}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

ProposalCountTable.propTypes = {
  proposals: propTypes.array.isRequired ,
}

export default ProposalCountTable
