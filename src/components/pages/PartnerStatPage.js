import React from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import { submitCompletionComment, updateCompletenessComment } from '../../actions/partnerStatProposalsActions'
import PartnerStatTable from '../tables/PartnerStatTable'
import PartnerSummaryStatTable from '../tables/PartnerSummaryStatTable'

class PartnerStatPage extends React.Component {
  // Updates the comment of the proposal's completeness
  onCompletenessCommentChange = (proposalCode, semester, completionComment) => {
    this.props.dispatch(updateCompletenessComment(proposalCode, semester, completionComment))
  }
  submitCompletionComment = (proposals) => {
    this.props.dispatch(submitCompletionComment(proposals, this.props.initProposals, this.props.semester, this.props.partner))
  }

  render () {
    const {
      proposals,
      user,
      semester,
      partner,
      partnerShareTimes,
      totalObservation,
      loading,
      submittingCompletionComment,
      submittedCompletionComment,
      submittingCommentError
    } = this.props
    if (loading ){
      return ( <div className='spinner'>
        <div className ='dot1'/>
        <div className='dot2'/>
      </div>)
    }
    const linkToDashboard = 'http://ft.salt.saao.ac.za/stats/dashboard'
    if (proposals.length === 0 || (Object.keys(user).length === 0 || user == null)) {
      return (

        <div>
          <p style={ {textAlign: 'left'} }>
            <a target='_blank' href={ linkToDashboard }> Click here for the Weather Statistics </a>
          </p>
          <p>No proposals to show for the partner&apos;s statistics.</p>
        </div>

      )
    }
    const filteredProposals = proposals.filter(p => p.status !== 'DELETED' && p.status !== 'REJECTED')
    return (
      <div>
        <p style={ {textAlign: 'left'} }>
          <a target='_blank' href={ linkToDashboard }> Click here for the Weather Statistics </a>
        </p>
        {partner !== 'All' &&
        <PartnerSummaryStatTable
          proposals={ proposals }
          semester={ semester }
          partner={ partner }
          partnerShareTimes={ partnerShareTimes }
          totalObservation={ totalObservation }
        />
        }
        <div>
          <PartnerStatTable
            proposals={ filteredProposals }
            semester={ semester }
            partner={ partner }
            user={ user }
            onCompletenessCommentChange={ this.onCompletenessCommentChange }
          />
        </div>
        <div style={ {fontWeight: 'bold', fontSize: 20, textAlign: 'center'} }>
          {submittingCompletionComment && <span>Submitting...</span>}
          {submittedCompletionComment && <span style={ {color: 'green'} }><br/>
          Submission successful</span>}
          {submittingCommentError && <span style={ {color: 'red'} }><br/>
            {`Submission failed: ${ submittingCommentError }`}</span>}
        </div>
        <button
          className='btn-success'
          disabled={ this.props.submittingCompletionComment }
          onClick={ () => this.submitCompletionComment(proposals)
          }>Submit</button>
      </div>
    )
  }
}

PartnerStatPage.propTypes = {
  proposals: propTypes.array.isRequired,
  initProposals: propTypes.array.isRequired,
  totalObservation: propTypes.number.isRequired,
  user: propTypes.object.isRequired,
  semester: propTypes.string.isRequired,
  partner: propTypes.string.isRequired,
  partnerShareTimes: propTypes.array.isRequired,
  dispatch: propTypes.func.isRequired,
  loading: propTypes.bool.isRequired,
  submittingCompletionComment: propTypes.bool.isRequired,
  submittedCompletionComment: propTypes.bool.isRequired,
  submittingCommentError: propTypes.string.isRequired
}

export default connect(store => (
  {
    proposals: store.partnerStatProposals.proposals,
    initProposals: store.partnerStatProposals.initProposals,
    totalObservation: store.partnerStatProposals.totalObservation,
    partner: store.filters.selectedPartner,
    semester: store.filters.selectedPartnerStatsSemester,
    user: store.user.user,
    partnerShareTimes: store.partnerShareTimes.partnerShareTimes,
    loading: store.proposals.fetching,
    submittingCompletionComment: store.partnerStatProposals.submittingCompletionComment,
    submittedCompletionComment: store.partnerStatProposals.submittedCompletionComment,
    submittingCommentError: store.partnerStatProposals.errors.submittingCommentError
  }
), null)(PartnerStatPage)
