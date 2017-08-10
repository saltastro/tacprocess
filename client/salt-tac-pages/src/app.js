import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

import { fetchSemesterData } from './actions';
import { defaultSemester } from './util/semester';
import Partner from './util/partner';
import About from './components/about';
import Login from './components/login';
import NavHeader from './components/nav-header';
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
        console.log('UPDATING...');
        return (
                <div className="ui grid">
                    <NavHeader/>
                    <Switch>
                        <Route path="/login" componen={Login}/>
                        <Route path="/about" component={About}/>
                        <Route path="/statistics" component={Statistics}/>
                        <Route path="/"
                               render={() => (
                                       <Redirect to="/about"/>
                               )}/>
                    </Switch>
                </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        semesterData: state.semesterData
    };
}

export default withRouter(connect(mapStateToProps)(App));
