import React from "react";
import { connect } from 'react-redux';
import SwitchUserForm from '../forms/SwitchUserForm';
import TacMemberEditTable from '../tables/TacMemberEditTable';
import { switchUser } from '../../actions/auth';
import { addNewMember, removeMember } from '../../actions/timeAllocationActions';
import { fetchTacMembers, fetchSaltUsers } from '../../actions/AdminActions';
import { getPartnerList } from '../../util/filters';
import { ADMINISTRATOR } from '../../types';
import submitNewTacMembers from '../../actions/tac-adminitration-actions'

class AdminPage extends React.Component {
	componentDidMount() {
		const { dispatch } = this.props;
		dispatch(fetchTacMembers());
		dispatch(fetchSaltUsers())
	}
	onSwitchUser = (username) => {
		this.props.dispatch(switchUser(username));
	};
	addMember = (member, partner) => {
		this.props.dispatch(addNewMember(member, partner))
	};
	removeMember = (member, partner) => {
		this.props.dispatch(removeMember(member, partner))
	};
	saveMembers = (partner) => {
		const newMembers = this.props.newMembers[partner] || []
		const removedMembers = this.props.removedMembers[partner] || []
		this.props.dispatch(submitNewTacMembers(newMembers, removedMembers, partner))
	};
	
	render() {
		const {user } = this.props;
		const partners = getPartnerList(user.roles);
		return (
			<div>
				{ (user.roles || []).some(r => r.type === ADMINISTRATOR) &&
				<div>
					{this.props.fetchingUser && <h1>LOADING!!!!</h1>}
					{this.props.userError && <h1>ERROR!!!!!</h1>}
					<SwitchUserForm onSwitchUser={this.onSwitchUser} error={this.props.userError}/>
				</div>
				}
				<div>
					<TacMemberEditTable
						tacMembers={this.props.tacMembers}
						newMembers={this.props.newMembers}
						removedMembers={this.props.removedMembers}
						saveMembers={this.saveMembers}
						saltUsers={this.props.saltUsers}
						addMember={this.addMember}
						removeMember={this.removeMember}
						newMemberInput={this.newMemberInput}
						partners={partners}
					/>
				</div>
			</div>
		);
	}
}

export default connect((store) => ({
	fetchingUser: store.user.fetching,
	userError: store.user.error,
	user: store.user.user,
	tacMembers: store.tac.tacMembers,
	saltUsers: store.tac.saltUsers,
	removedMembers: store.tac.removedMembers,
	newMembers: store.tac.newMembers
}))(AdminPage);
