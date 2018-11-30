import React from 'react'
import propTypes from 'prop-types'
import '../../styles/components/tables.css'
import { compareByProposalCode } from '../../util/proposal'
import PartnerStatTableRow from './tablesComponents/PartnerStatTableRow'

const PartnerStatTable = ({proposals, semester, partner, user}) => {
  if (proposals.length === 0 || user == null) { return null }
  return (
    <div className='SATableDiv'>
      <h1>Partner&#39;s Statistics</h1>
      <table className='SATable' align='center'>
        <thead>
          <tr>
            <th>Proposal Code</th>
            <th>Proposal Title</th>
            <th>PI</th>
            <th>Liaison SA</th>
            <th>Completeness of a Proposal</th>
            <th>Status</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          {
            proposals ?
              proposals.sort(compareByProposalCode).map(p => (
                <PartnerStatTableRow
                  key={ p.proposalCode }
                  proposal={ p }
                  semester={ semester }
                  partner={ partner }
                  user={ user }
                />)
              ) : null
          }
        </tbody>
      </table>
    </div>
  )
}

PartnerStatTable.propTypes = {
  proposals: propTypes.array.isRequired,
  semester: propTypes.string.isRequired,
  partner: propTypes.string.isRequired,
  user: propTypes.object.isRequired
}
export default PartnerStatTable
