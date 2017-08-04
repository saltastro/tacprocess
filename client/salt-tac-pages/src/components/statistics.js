import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { semesterList } from '../util/semester';

const Statistics = ({semester, isLoading=false, errors=[], proposals=[], onChangeSemester=() => {}}) => {
    if (isLoading) {
        return <div>LOADING</div>;
    }

    return (
            <div>
                <label htmlFor="select-semester">
                    Semester
                </label>
                {semester &&
                <select id="select-semester"
                        value={semester}
                        onChange={(e) => onChangeSemester(e.target.value)}>
                    {semesterList().map(s => <option key={s}>{s}</option>)}
                </select>}
                {errors.map(error => <div>{error.message}</div>)}
                <div>
                    {proposals.map(p => <div key={p.title}>{p.title}</div>)}
                </div>
            </div>
    );
};

Statistics.propTypes = {
    semester: PropTypes.string,
    isLoading: PropTypes.bool,
    errors: PropTypes.array,
    proposals: PropTypes.array,
    onChangeSemester: PropTypes.func
};

export default Statistics;
