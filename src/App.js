import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter }  from 'react-router-dom'
import { connect } from 'react-redux'

import Navigation from './components/Navigation'
import * as actions from './actions/auth'
import {defaultSemester, downloadSummary, getLiaisonUsername} from './util'
import ApplicationPages from './components/pages/ApplicationPages'
import {setLiaisonAstronomer} from './actions/proposalsActions'
import submitProposalsLiaison from './actions/liaison-astronomer-actions'
import { fetchAllData } from './actions/data-actions'
import Loading from './components/messages/Loading'
import FailToLoad from './components/messages/FailToLoad'
import {ALL_PARTNER} from './types'
import { reduceProposalsPerAstronomer } from './util/filters'

class App extends React.Component {
	componentDidMount() {
		const partner = this.props.filters.selectedPartner || ALL_PARTNER
		const semester = defaultSemester()
		if (this.props.isAuthenticated) {
			this.props.dispatch(fetchAllData(semester, partner))

		}
	}

	setLiaison =  (liaisonUsername, proposalCode) => {
		this.props.dispatch(setLiaisonAstronomer(proposalCode, liaisonUsername))
	}

	submitLiaisons =  ( proposals) => {
		this.props.dispatch(
			submitProposalsLiaison(proposals, this.props.filters.selectedSemester, this.props.filters.selectedPartner)
		)
	}

	requestSummary = (event, proposalCode) => {
		event.preventDefault()
		downloadSummary(proposalCode, this.props.filters.selectedSemester, this.props.filters.selectedPartner)
	}
	submitTechnicalReviews = () => {

	}

	// sending sockets
	send = (liaison, proposalCode) => {
		socket.emit('liaison socket', {liaison, proposalCode})
	}

	loggingOut = () => {
		this.props.dispatch(actions.logout())
	};

	render() {
		const { user, isAuthenticated, proposals, initProposals, filters, SALTAstronomers, dataStatus } = this.props

		if (dataStatus.error && !dataStatus.fetchedData){
			return <FailToLoad />
		} else if ( dataStatus.fetchingData) {
			return <Loading />
		}
		const { submittingReviews, submittedReviews, loading }  = proposals
		const saUser = filters.selectedLiaison === 'All' || filters.selectedLiaison === 'Not Assigned' || filters.selectedLiaison === 'Assigned' ? filters.selectedLiaison : getLiaisonUsername(filters.selectedLiaison, SALTAstronomers)

		const proposalsPerLiaison = reduceProposalsPerAstronomer(proposals.proposals || [], saUser, filters.selectedSemester)

		return (
			<BrowserRouter>
				<div className='root-main'>
					<div>
						<Navigation logout={ this.loggingOut }/>
					</div>
					<div>
						{this.props.fetchProposalsError &&
						<div className='error'>
							{`The proposals could not be loaded: ${ this.props.fetchProposalsError }`}
						</div>}

						{this.props.fetchTargetsError &&
						<div className='error'>
							{`The targets could not be loaded: ${ this.props.fetchTargetsError }`}
						</div>}
						<ApplicationPages
							proposals={ proposals.proposals }
							proposalsPerLiaison={ proposalsPerLiaison }
							isAuthenticated={ isAuthenticated }
							user={ user }
							initProposals={ initProposals }
							filters={ filters }
							astronomers={ SALTAstronomers.SALTAstronomer }
							submitLiaisons={ this.submitLiaisons }
							setLiaison={ this.setLiaison }
							submitTechnicalReviews={ this.submitTechnicalReviews }
							requestSummary={ this.requestSummary }
							submittingReviews={ submittingReviews }
							submittedReviews={ submittedReviews }
							loading={ loading }
							send={ this.send }
						/>
						<div className='footer'>
							<p>Copyright © 2018 TAC</p>
						</div>
					</div>
				</div>
			</BrowserRouter>
		)
	}
}

App.propTypes = {
	isAuthenticated: PropTypes.bool,
	dataStatus: PropTypes.object,
	filters: PropTypes.object,
	fetchProposalsError: PropTypes.string,
	fetchTargetsError: PropTypes.string,
	proposals: PropTypes.object,
	initProposals: PropTypes.array,
	SALTAstronomers: PropTypes.object,
	user: PropTypes.object,
	dispatch: PropTypes.func
}

function mapStateToProps(state) { /* state in params */
	return{
		isAuthenticated: state.user.user.isAuthenticated,
		dataStatus: state.dataStatus,
		user: state.user.user,
		filters: state.filters,
		fetchProposalsError: state.proposals.errors.fetchingError,
		fetchTargetsError: state.targets.error,
		proposals: state.proposals,
		initProposals: state.proposals.initProposals,
		targets: state.targets,
		tacs: state.tac,
		SALTAstronomers: state.SALTAstronomers
	}
}

export default connect(mapStateToProps,null)(App)
