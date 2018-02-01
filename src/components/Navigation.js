import React from "react";
import { NavLink } from "react-router-dom" // TODO: use NavLink and make sure that NavLink work
import { connect } from "react-redux";
import * as actions from "../actions/auth";
import { fetchStatData } from "../actions/statisticsActions";
import  fetchProposals  from "../actions/proposalsActions";
import  fetchTargets  from "../actions/targetsActions";
import { storePartnerAllocations  } from "../actions/timeAllocationActions";
import {
	STATISTICS_PAGE,
	DOCUMENTATION_PAGE,
	TECHNICAL_PAGE,
	TAC_PAGE,
	ADMIN_PAGE
} from "../types"
import {canViewPage} from "../util";

class Navigation extends React.Component {

	componentDidMount() {
		const selected = this.props.filters;
		const {dispatch } = this.props;

		dispatch(actions.fetchUserData());

		dispatch(fetchStatData(
			selected.selectedSemester,
			selected.selectedPartner
		));
		dispatch(
			fetchTargets(
				selected.selectedSemester,
				selected.selectedPartner
			));
		dispatch(
			fetchProposals(
				selected.selectedSemester,
				selected.selectedPartner
			));

		dispatch(storePartnerAllocations(
			selected.selectedSemester,
			selected.selectedPartner
		))
	}

	loggingOut() {
		const { dispatch } = this.props;
		dispatch(actions.logout())
	}

	render() {
		const { currentPage, userRoles  } = this.props;

		return(
			<div>
				<ul className="nav">
					<li><NavLink exact to="/">HOME</NavLink></li>
					{ canViewPage(userRoles, TECHNICAL_PAGE) ?
						<li>
							<NavLink to="/techreview">TECH REVIEW</NavLink></li> : <li /> }
					{ canViewPage(userRoles, STATISTICS_PAGE) ?
						<li>
							<NavLink to="/statistics">STATISTICS</NavLink></li> : <li /> }
					{ canViewPage(userRoles, TAC_PAGE) ?
						<li>
							<NavLink to="/timeallocation">TIME ALLOCATION</NavLink></li> : <li /> }
					{ canViewPage(userRoles, DOCUMENTATION_PAGE) ?
						<li>
							<NavLink to="/documentation">DOCUMENTATION</NavLink></li> : <li /> }
					{ canViewPage(userRoles, ADMIN_PAGE) ?
						<li>
							<NavLink to="/admin">ADMIN</NavLink></li> : <li /> }
					<button className="logoutbtn"
					        onClick={ this.loggingOut.bind(this) }> Logout</button>
				</ul>
				<ul className="bigNav">
					<h1>{ currentPage }</h1>
				</ul>
			</div>
		);
	}
}

export default connect(
	store => ({
		currentPage: store.filters.currentPage,
		filters: store.filters,
		statistics:store.statistics,
		userRoles:store.user.user.roles,
		SALTAstronomers: store.SALTAstronomers.SALTAstronomer
	}), null
)(Navigation);
