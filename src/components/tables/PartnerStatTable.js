import React from 'react'
import propTypes from 'prop-types'
import '../../styles/components/tables.css'
import { compareByProposalCode } from '../../util/proposal'
import PartnerStatTableRow from './tablesComponents/PartnerStatTableRow'

class PartnerStatTable extends React.Component {
  completionCommentChange = (proposalCode, semester, completionComment) => {
    this.props.onCompletenessCommentChange(proposalCode, semester, completionComment)
  }

  render () {
    const {proposals, semester, partner, user, selectedLiaison} = this.props

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
            <th style={ { width: '50px' } }>Proposal Status</th>
            <th>Number of blocks</th>
            <th>Completeness of a Proposal</th>
            <th>P3 Completion Rate</th>
            <th>Overall Completion Rate (P0 - P3)</th>
            <th>Comment</th>
          </tr>
          </thead>
          <tbody>
          {
            proposals.sort(compareByProposalCode).map( p => {
              const proposalAstronomer = p.liaisonAstronomer ? p.liaisonAstronomer.givenName : ''

              if (['Assigned', 'Not Assigned', 'All'].includes(selectedLiaison)) {
                return (
                  <PartnerStatTableRow
                    key={ p.proposalCode }
                    proposal={ p }
                    semester={ semester }
                    partner={ partner }
                    user={ user }
                    completionCommentChange={ this.completionCommentChange }
                  />
                )
              } else if(proposalAstronomer === selectedLiaison) {
                return (
                  <PartnerStatTableRow
                    key={ p.proposalCode }
                    proposal={ p }
                    semester={ semester }
                    partner={ partner }
                    user={ user }
                    completionCommentChange={ this.completionCommentChange }
                  />)
              }
              return null
            })
          }
          </tbody>
        </table>
      </div>
    )
  }
}

PartnerStatTable.propTypes = {
  proposals: propTypes.array.isRequired,
  semester: propTypes.string.isRequired,
  partner: propTypes.string.isRequired,
  user: propTypes.object.isRequired,
  selectedLiaison: propTypes.string.isRequired,
  onCompletenessCommentChange: propTypes.func.isRequired
}

export default PartnerStatTable
