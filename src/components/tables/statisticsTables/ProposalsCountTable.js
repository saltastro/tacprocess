import React from 'react'
import propTypes from 'prop-types'

const ProposalCountTable = ({ proposalStatistics }) => {
  const {
    numberOfProposals,
    newProposals,
    thesisProposals,
    p4Proposals,
    longTermProposals,
    newLongTermProposals
  } = proposalStatistics
  return(
    <div>
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
            <td>{numberOfProposals}</td>
          </tr>
          <tr>
            <td>New proposals </td>
            <td>{ newProposals}</td>
          </tr>
          <tr>
            <td>Older Proposals </td>
            <td>{numberOfProposals - newProposals}</td>
          </tr>
          <tr>
            <td>Number of long term proposals </td>
            <td>{ longTermProposals}</td>
          </tr>
          <tr>
            <td>Number of new long term proposals </td>
            <td>{newLongTermProposals}</td>
          </tr>
          <tr>
            <td>Proposals used for a thesis </td>
            <td>{thesisProposals}</td>
          </tr>
          <tr>
            <td>P4 proposals </td>
            <td>{p4Proposals}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

ProposalCountTable.propTypes = {
  proposalStatistics: propTypes.object.isRequired
}

export default ProposalCountTable
