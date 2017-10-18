import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { compose } from 'redux';
import { histogram, range } from 'd3-array';

import NumberAxisHistogram from './number-axis-histogram';

const expectMount = compose(expect, toJson, mount);

describe('NumberAxisHistogram', () => {
    it('should show the histogram', () => {
        const data1 = [17, 36, 77, 11.5, 41, 42, 1, 17, 99];
        const data2 = [32, 1, 74];

        const histogramChart = histogram();
        histogramChart
                .domain([0, 100])
                .thresholds(range(0, 100, 10))
                .value(d => d);

        const dataset1 = {
            data: histogramChart(data1),
            className: 'set-one'
        };
        const dataset2 = {
            data: histogramChart(data2),
            className: 'set-two'
        };

        expectMount(
                <svg width={500} height={500}>
                    <NumberAxisHistogram histogramDataSets={[dataset1, dataset2]}
                                         domain={[0, 200]}
                                         range={[0, 5]}
                                         xTitle="Hours"
                                         yTitle="Proposals"
                                         width={500}
                                         height={500}/>
                </svg>
        ).toMatchSnapshot();
    });
});
