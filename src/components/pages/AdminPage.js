import React from "react";
import { connect } from 'react-redux';
import SwitchUserForm from '../forms/SwitchUserForm';
import { switchUser } from '../../actions/auth';

class AdminPage extends React.Component {
    onSwitchUser = (username) => {
        this.props.dispatch(switchUser(username));
    };

    render() {
        return (
                <div>
                    {this.props.fetchingUser && <h1>LOADING!!!!</h1>}
                    {this.props.userError && <h1>ERROR!!!!!</h1>}
                    <SwitchUserForm onSwitchUser={this.onSwitchUser} error={this.props.userError}/>
                </div>
        );
    }
}

export default connect((store) => ({
    fetchingUser: store.user.fetching,
    userError: store.user.error
}))(AdminPage);
