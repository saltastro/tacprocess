import React from 'react';
import PropTypes from 'prop-types';
import { histogram, max, range } from 'd3-array';

import { semesterList } from '../util/semester';
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

const Statistics = () => {
    // if (isLoading) {
    //     return <div>LOADING</div>;
    // }
    //
    // return (
    //         <div>
    //             <label htmlFor="select-semester">
    //                 Semester
    //             </label>
    //             {semester &&
    //             <select id="select-semester"
    //                     value={semester}
    //                     onChange={(e) => onChangeSemester(e.target.value)}>
    //                 {semesterList().map(s => <option key={s}>{s}</option>)}
    //             </select>}
    //             {errors.map(error => <div>{error.message}</div>)}
    //             <svg width={500} height={500}>
    //                 <RequestedTimeHistogram proposals={proposals} partner={partner}/>
    //             </svg>
    //         </div>
    // );
    return <div>
        <h1>Statistics...</h1>
    </div>;
};

// Statistics.propTypes = {
//     semester: PropTypes.string,
//     partner: PropTypes.object,
//     isLoading: PropTypes.bool,
//     errors: PropTypes.array,
//     proposals: PropTypes.array,
//     onChangeSemester: PropTypes.func
// };

export default Statistics;
