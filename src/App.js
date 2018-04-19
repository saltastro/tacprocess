import React from 'react';
import PropTypes from "prop-types";
import { BrowserRouter }  from "react-router-dom";
import { connect } from "react-redux";

import Navigation from "./components/Navigation";
import * as actions from './actions/auth';
import fetchTargets from './actions/targetsActions';
import { storePartnerAllocations } from './actions/timeAllocationActions';
import fetchProposals from './actions/proposalsActions';
import {defaultSemester} from "./util";
import {
	ALL_PARTNER
} from "./types"
import fetchSA from './actions/saltAstronomerActions'
import ApplicationPages from './components/pages/ApplicationPages'
import {setLiaisonAstronomer} from './actions/proposalAction'
import {getSaltAstronomerUsername} from './util/salt-astronomer'

class App extends React.Component {
	componentDidMount() {
		if (this.props.isAuthenticated) {
			const selected = this.props.filters;
			const {dispatch} = this.props;
			const semester = defaultSemester();

			dispatch(actions.fetchUserData());
			dispatch(
				fetchTargets(
					semester,
					ALL_PARTNER
				));
			dispatch(
				fetchProposals(
					semester,
					selected.selectedPartner
				));
			dispatch(storePartnerAllocations(
				semester,
				ALL_PARTNER
			));
      dispatch(fetchSA())
		}
	}

	setLiaison =  (event, proposalCode) => {
		event.preventDefault()
		let isChecked = event.target.checked
		let  liaisonUsername = event.target.value
		if (event.target.name === 'selector') {
			isChecked = true
      liaisonUsername = getSaltAstronomerUsername(event.target.value, this.props.astronomers)
		}
		this.props.dispatch(setLiaisonAstronomer(proposalCode, liaisonUsername, isChecked))

	}

	loggingOut = () => {
		const { dispatch } = this.props;

		dispatch(actions.logout())
	};

	render() {
		const {user, isAuthenticated, proposals, initProposals, filters, astronomers} = this.props
		return (
			<BrowserRouter>
				<div className="root-main">
					<div>
						<Navigation logout={this.loggingOut}/>
					</div>
					<div>

						{this.props.fetchProposalsError &&
						<div className="error">
							{`The proposals could not be loaded: ${this.props.fetchProposalsError}`}
						</div>}

						{this.props.fetchTargetsError &&
						<div className="error">
							{`The targets could not be loaded: ${this.props.fetchTargetsError}`}
						</div>}
						<ApplicationPages
							proposals={proposals}
							isAuthenticated={isAuthenticated}
							user={user}
							initProposals={initProposals}
							filters={filters}
							astronomers={astronomers}
							setLiaison={this.setLiaison}
						/>
						<div className="footer">
							<p>Copyright © 2018 TAC</p>
						</div>
					</div>
				</div>
			</BrowserRouter>
		);
	}
}

App.propTypes = {
	isAuthenticated: PropTypes.bool,
	filters: PropTypes.object,
	fetchProposalsError: PropTypes.string,
	fetchTargetsError: PropTypes.string,
  proposals: PropTypes.array,
	initProposals: PropTypes.array,
	astronomers: PropTypes.array,
	user: PropTypes.object
};

function mapStateToProps(state) { /* state in params */
	return{
		isAuthenticated: state.user.user.isAuthenticated,
		user: state.user.user,
		filters: state.filters,
		fetchProposalsError: state.proposals.errors.fetchingError,
		fetchTargetsError: state.targets.error,
		proposals: state.proposals.proposals,
		initProposals: state.proposals.initProposals,
		astronomers: state.SALTAstronomers.SALTAstronomer
	};
}

export default connect(mapStateToProps,null)(App);
