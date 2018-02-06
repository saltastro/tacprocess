import React from 'react';
import PropTypes from 'prop-types';

export default class SwitchUserForm extends React.Component {
    constructor() {
        super();

        this.state = {
            username: ''
        }
    }

    onUsernameChange = (e) => {
        const target = e.target;
        this.setState((state) => {
            return {
                ...state,
                username: target.value
            }
        });
    };

    switchUser = (e) => {
        e.preventDefault();
        this.props.onSwitchUser(this.state.username);
    };

    render() {
        return (
                <div>
                    <input type="text"
                           value={this.state.username}
                           onChange={this.onUsernameChange}
                           placeholder="Username"/>
                    <button onClick={this.switchUser}>Switch User</button>
                    {this.props.error && <span className="error">{this.props.error}</span>}
                </div>
        );
    }
}

SwitchUserForm.propTypes = {
    onSwitchUser: PropTypes.func.isRequired,
    error: PropTypes.string
};