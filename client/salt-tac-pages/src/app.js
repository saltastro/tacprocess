import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchSemesterData } from './actions';

class App extends Component {
    componentDidMount() {
        this.props.dispatch(fetchSemesterData('2017-2'));
    }
    render() {
        const { semester, isLoading, errors, proposals } = this.props.semesterData;
        console.log(errors, proposals);
        return (
                <div>
                    {errors.map(error => <div key={error.id}>ERROR: {error.message}</div>)}
                    {proposals.map((proposal, index) => <div key={index}>{proposal.title}</div>)}
                </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        semesterData: state.semesterData
    };
}

export default connect(mapStateToProps)(App);
