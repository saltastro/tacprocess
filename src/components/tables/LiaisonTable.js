import React from 'react'
import propTypes from 'prop-types'
import '../../styles/components/tables.css'
import { compareByProposalCode } from '../../util/proposal'
import LiaisonTableRow from './tablesComponents/LiaisonTableRow'

const LiaisonTable = ({proposals, canAssign, astronomers, requestSummary, username, setLiaison, initProposals, semester}) => (
  <div className='SATableDiv'>
    <h1>Salt Astronomers Liaison Assigning</h1>
    <table className='SATable' align='center'>
      <thead>
      <tr>
        <th>Proposal Code</th>
        <th>Summary</th>
        <th>Proposal Title</th>
        <th>Proposal Investigator</th>
        <th>Liaison Astronomer</th>
      </tr>
      </thead>
      <tbody>
      {
        proposals.sort(compareByProposalCode).map(p => ( <LiaisonTableRow key={ p.proposalCode }
          proposal={ p }
          initProposals={ initProposals }
          canAssign={ canAssign }
          astronomers={ astronomers }
          username={ username }
          requestSummary={ requestSummary }
          setLiaison={ setLiaison }
          semester={ semester }
        />))
      }

      </tbody>
    </table>
  </div>
  )

LiaisonTable.propTypes = {
  proposals: propTypes.array.isRequired,
  initProposals: propTypes.array.isRequired,
  canAssign: propTypes.bool.isRequired,
  astronomers: propTypes.array.isRequired,
  username: propTypes.string.isRequired,
  requestSummary: propTypes.func.isRequired,  // todo request summary should know the current selected semester
  setLiaison: propTypes.func.isRequired,
  semester: propTypes.string.isRequired
}
export default LiaisonTable
