import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';

import { login } from '../actions';

export class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }
    }

    onChangeUsername = (e) => {
        this.setState({
                          username: e.target.value
                      });
    };

    onChangePassword = (e) => {
        this.setState({
                          password: e.target.value
                      });
    };

    redirectPath = () => {
        const locationState = this.props.location.state;
        const pathname = locationState && locationState.from && locationState.from.pathname;
        return pathname || '/about';
    };

    render() {
        const {username, password} = this.state;

        if (this.props.user) {
            return <Redirect to={this.redirectPath()}/>;
        }

        return (
                <div>
                    <div>
                        <label>Username</label>
                        <input type="text"
                               className="ui text input"
                               value={username}
                               onChange={this.onChangeUsername}/>
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password"
                               className="ui passwordc input"
                               value={password}
                               onChange={this.onChangePassword}/>
                    </div>
                    <div>
                        <button onClick={() => this.props.dispatch(login(username, password))}>
                            Login
                        </button>
                    </div>
                </div>
        );
    }
}

const mapStateToProps = (state) => (
        {
            user: state.user.user
        }
);

export default withRouter(connect(mapStateToProps)(Login));
