import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

import { fetchSemesterData } from './actions';
import { defaultSemester } from './util/semester';
import Partner from './util/partner';
import About from './components/about';
import Login from './components/login';
import Logout from './components/logout';
import NavHeader from './components/nav-header';
import PrivateRoute from './components/private-route';
import Statistics from './components/statistics';

class App extends Component {
    componentDidMount() {
        this.props.dispatch(fetchSemesterData(defaultSemester()));
    }

    onChangeSemester = (semester) => {
        this.props.dispatch(fetchSemesterData(semester));
    };

    render() {
        const { semesterData } = this.props;
        return (
                <div className="ui grid">
                    <NavHeader/>
                    <Switch>
                        <Route path="/login" component={Login}/>
                        <Route path="/logout" component={Logout}/>
                        <Route path="/about" component={About}/>
                        <PrivateRoute path="/statistics" component={Statistics}/>
                        <Route path="/"
                               render={() => (
                                       <Redirect to="/about"/>
                               )}/>
                    </Switch>
                </div>
        );
    }
}

const mapStateToProps = (state) => (
        {
            semesterData: state.semesterData
        }
);

export default withRouter(connect(mapStateToProps)(App));
