import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';

import { logout } from '../actions';

export class Logout extends Component {
    componentDidMount() {
        this.props.dispatch(logout());
    }

    render() {
        return (
                <Redirect to="/"/>
        );
    }
}

const mapStateToProps = (state) => ({});

export default withRouter(connect(mapStateToProps)(Logout));
