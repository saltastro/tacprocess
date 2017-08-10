import React, { Component } from 'react';

export default class Login extends Component {
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

    render() {
        return (
                <div>
                    <div>
                        <label>Username</label>
                        <input type="text"
                               className="ui text input"
                               value={this.state.username}
                               onChange={this.onChangeUsername}/>
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password"
                               className="ui passwordc input"
                               value={this.state.password}
                               onChange={this.onChangePassword}/>
                    </div>
                </div>
        );
    }
}
