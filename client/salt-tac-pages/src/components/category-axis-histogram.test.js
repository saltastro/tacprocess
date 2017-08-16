import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { compose } from 'redux';

import CategoryAxisHistogram from './category-axis-histogram';

const expectMount = compose(expect, toJson, mount);

describe('CategoryAxisHistogram', () => {
    it('should show the histogram', () => {
        const dataset1 = {
            data: [
                {category: 'Bright', value: 5},
                {category: 'Dark', value: 10}
            ],
            className: 'set-one'
        };

        const dataset2 = {
            data: [
                {category: 'Dark', value: 7}
            ],
            className: 'set-two'
        };

        expectMount(
                <svg width="500" height="500">
                    <CategoryAxisHistogram categoryDataSets={[dataset1, dataset2]}
                                           categories={['Bright', 'Dark']}
                                           range={[0, 12]}
                                           width={500}
                                           height={500}/>
                </svg>
        ).toMatchSnapshot();
    })
});