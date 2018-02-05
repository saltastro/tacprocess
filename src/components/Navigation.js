import React from "react";
import { NavLink, withRouter } from "react-router-dom" // TODO: use NavLink and make sure that NavLink work
import { connect } from "react-redux";
import {
	STATISTICS_PAGE,
	DOCUMENTATION_PAGE,
	TECHNICAL_PAGE,
	TAC_PAGE,
	ADMIN_PAGE
} from "../types"
import {canViewPage} from "../util";
import {loadedPage} from "../util/filters";

class Navigation extends React.Component {


	render() {
		const { userRoles, logout, location  } = this.props;

		return(
			<div>
				<ul className="nav">
					<li><NavLink exact to="/">HOME</NavLink></li>
					{ canViewPage(userRoles, TECHNICAL_PAGE) &&
					<li>
						<NavLink to="/techreview">TECH REVIEW</NavLink>
					</li> }
					{ canViewPage(userRoles, STATISTICS_PAGE) &&
					<li>
						<NavLink to="/statistics">STATISTICS</NavLink>
					</li> }
					{ canViewPage(userRoles, TAC_PAGE) &&
					<li>
						<NavLink to="/timeallocation">TIME ALLOCATION</NavLink>
					</li> }
					{ canViewPage(userRoles, DOCUMENTATION_PAGE) &&
					<li>
						<NavLink to="/documentation">DOCUMENTATION</NavLink>
					</li> }
					{ canViewPage(userRoles, ADMIN_PAGE) &&
					<li>
						<NavLink to="/admin">ADMIN</NavLink>
					</li> }
					<li className="logoutbtn" onClick={ logout }>Logout</li>
				</ul>
				<ul className="bigNav">
					<h1>{ loadedPage(location.pathname) }</h1>
				</ul>
			</div>
		);
	}
}

export default withRouter(connect(
	store => ({
		userRoles:store.user.user.roles,
	}), null
)(Navigation));
