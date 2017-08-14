import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, withRouter } from 'react-router-dom';

export const PrivateRoute = ({component, ...rest}) => {
    return <Route {...rest}
           render={props => (
               rest.user ? (
                       React.createElement(component, props)
               ) : (
                       <Redirect to={{
                           pathname: '/login',
                           state: { from: props.location }
                       }}/>
               )
           )}/>;};

const mapStateToProps = state => (
        {
            user: state.user ? state.user.user : null
        }
);

export default withRouter(connect(mapStateToProps)(PrivateRoute));
