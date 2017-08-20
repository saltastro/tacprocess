import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { histogram, max, range } from 'd3-array';

import Partner, { defaultPartner, partnerList } from '../util/partner';
import { defaultSemester, semesterList } from '../util/semester';
import { fetchSemesterData } from '../actions';
import * as statistics from '../util/statistics';
import NumberAxisHistogram from './number-axis-histogram';

const CHART_WIDTH = 500;
const CHART_HEIGHT = 500;

// const RequestedTimeHistogram = ({proposals, partner}) => {
//     const data = statistics.requestedHours(proposals, partner);
//     const histogramChart = histogram();
//     histogramChart
//             .domain([0, 100])
//             .thresholds(range(0, 100, 10))
//             .value(d => d);
//     const histogramData = histogramChart(data);
//
//     return (
//             <NumberAxisHistogram histogramData={histogramData}
//                                  domain={[0, 100]}
//                                  range={[0, Math.round(max(histogramData, d => d.length))]}
//                                  xTitle="Time (hrs)"
//                                  yTitle="N"
//                                  width={CHART_WIDTH}
//                                  height={CHART_HEIGHT}/>
//     );
// };
//
// RequestedTimeHistogram.propTypes = {
//     proposals: PropTypes.array,
//     partner: PropTypes.object
// };

// const Statistics = () => {
//     if (isLoading) {
//         return <div>LOADING</div>;
//     }
//
//     return (
//             <div>
//                 <label htmlFor="select-semester">
//                     Semester
//                 </label>
//                 {semester &&
//                 <select id="select-semester"
//                         value={semester}
//                         onChange={(e) => onChangeSemester(e.target.value)}>
//                     {semesterList().map(s => <option key={s}>{s}</option>)}
//                 </select>}
//                 {errors.map(error => <div>{error.message}</div>)}
//                 <svg width={500} height={500}>
//                     <RequestedTimeHistogram proposals={proposals} partner={partner}/>
//                 </svg>
//             </div>
//     );
// };

const GeneralStatistics = ({partner, semester, proposals, availableTime}) => (
        <div>
            <div>
                Total number of proposals: {statistics.proposalsCount(proposals)}
            </div>
            {/*<div>*/}
                {/*Time available for partner: {statistics.availableScienceTime(availableTime).toFixed(1)} hrs*/}
            {/*</div>*/}
            {/*<div>*/}
                {/*Time requested from partner: {statistics.totalRequestedTime(proposals, partner, semester).toFixed(1)} hrs*/}
            {/*</div>*/}
            {/*<div>*/}
                {/*Subscription rate for partner: {statistics.oversubscriptionRate(proposals, partner, semester, availableTime).toFixed(2)} hrs*/}
            {/*</div>*/}
            {/*<div>*/}
                {/*Average request per proposal: {statistics.averageRequestedTime(proposals, partner, semester).toFixed(1)} hrs*/}
            {/*</div>*/}
            {/*<div>*/}
                {/*Number of thesis projects: {statistics.thesisProjectsCount(proposals)}*/}
            {/*</div>*/}
            {/*<div>*/}
                {/*Number of P4 proposals: {statistics.p4ProposalsCount(proposals)}*/}
            {/*</div>*/}
            {/*<div>*/}
                {/*Number of new long term proposals: {statistics.newLongtermProposalsCount(proposals, semester)}*/}
            {/*</div>*/}
            {/*<div>*/}
                {/*Number of old long term proposals: {statistics.oldLongtermProposalsCount(proposals, semester)}*/}
            {/*</div>*/}
        </div>
);

const RequestedTimeHistogram = ({proposals, partner, semester}) => {
    const data = statistics.requestedTimes(proposals, partner, semester);
    const histogramChart = histogram();
    histogramChart
            .domain([0, 100])
            .thresholds(range(0, 100, 10))
            .value(d => d);
    const histogramData = histogramChart(data);

    const histogramDataSets = [
        {
            data: histogramData,
            className: 'total'
        }
    ];

    return (
            <NumberAxisHistogram histogramDataSets={histogramDataSets}
                                 domain={[0, 100]}
                                 range={[0, Math.round(max(histogramData, d => d.length))]}
                                 xTitle="Time (hrs)"
                                 yTitle="N"
                                 width={CHART_WIDTH}
                                 height={CHART_HEIGHT}/>
    );
};

RequestedTimeHistogram.propTypes = {
    proposals: PropTypes.array,
    partner: PropTypes.object,
    semester: PropTypes.string
};

GeneralStatistics.propTypes = {
    partner: PropTypes.object,
    semester: PropTypes.object,
    proposals: PropTypes.array,
    availableTime: PropTypes.object
};

export class Statistics extends Component {
    componentDidMount() {
        if (!this.props.semester) {
            const semester = defaultSemester();
            const partner = defaultPartner(this.props.user);
            this.props.dispatch(fetchSemesterData(partner, semester));
        }
    }

    onChangeSemester = (e) => {
        this.props.dispatch(fetchSemesterData(this.props.partner, e.target.value));
    };

    onChangePartner = (e) => {
        const partner = Partner.partnerByCode(e.target.value);
        this.props.dispatch(fetchSemesterData(partner, this.props.semester));
    };

    render() {
        console.log(this.props);
        const {isLoading, errors, semester, partner, proposals, targets, availableTime} = this.props;
        const user = this.props.user;

        if (isLoading) {
            return <div>... loading ...</div>
        }

        if (!semester) {
            return <div>Please wait...</div>;
        }

        return (
                <div>
                    <div>
                        <label htmlFor="select-semester">
                            Semester
                        </label>
                         <select id="select-semester"
                                value={semester}
                                onChange={this.onChangeSemester}>
                            {semesterList().map((s) => <option key={s}>{s}</option>)}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="select-partner">
                                Partner
                        </label>
                        <select id="select-partner"
                                value={partner ? partner.code : null}
                                onChange={this.onChangePartner}>
                            {partnerList(user).map((p) => <option key={p.code} value={p.code}>{p.name}</option>)}
                        </select>
                    </div>

                    <GeneralStatistics partner={partner}
                                       semester={semester}
                                       proposals={proposals}
                                       availableTime={availableTime}/>

                    {/*<svg width={500} height={500}>*/}
                    {/*<RequestedTimeHistogram proposals={proposals}*/}
                                            {/*partner={partner}*/}
                                            {/*semester={semester}/>*/}
                    {/*</svg>*/}
                </div>
        )
    }
}

Statistics.propTypes = {
    semester: PropTypes.string,
    partner: PropTypes.object,
    isLoading: PropTypes.bool,
    errors: PropTypes.array,
    proposals: PropTypes.array,
    targets: PropTypes.array,
    availableTime: PropTypes.object
};

const mapStateToProps = (state) => (
        {
            isLoading: state.semesterData.isLoading,
            errors: state.semesterData.errors,
            partner: state.semesterData.partner,
            semester: state.semesterData.semester,
            proposals: state.semesterData.proposals,
            targets: state.semesterData.targets,
            availableTime: state.semesterData.availableTime,
            user: state.user.user
        }
);

export default withRouter(connect(mapStateToProps)(Statistics));

