import React from 'react';
import { mount } from 'enzyme';

import Axes from '../../src/components/axes';

const axis = (xAxisTitle=null, yAxisTitle=null) =>
        <Axes width={50}
              height={500}
              margins={{top: 0, right: 0, bottom: 0, left: 0}}
              xDomain={[0, 1]}
              yDomain={[0, 1]}
              xAxisTitle={xAxisTitle}
              yAxisTitle={yAxisTitle}/>;

describe('Axes', () => {
    it('should include four axes', () => {
        const s = mount(<Axes width={500}
                                height={500}
                                margins={{top: 0, right: 0, bottom: 0, left: 0}}
                                xDomain={[0, 1]}
                                yDomain={[0, 1]}/>);
        expect(s.find('.axis')).toHaveLength(4);
    });

    it('should not include any axis title', () => {
           const a = mount(axis());
           expect(a.find('text.x.title')).toHaveLength(0);
           expect(a.find('text.y.title')).toHaveLength(0);
    });

    it('should include an x axis title', () => {
        const a = mount(axis('Time'));
        expect(a.find('text.x.title')).toHaveLength(1);
        expect(a.find('text.y.title')).toHaveLength(0);
    });

    it('should include a y axis title', () => {
        const a = mount(axis(null, 'Proposals'));
        expect(a.find('text.x.title')).toHaveLength(0);
        expect(a.find('text.y.title')).toHaveLength(1);
    });

    it('should include an x and y axis title', () => {
        const a = mount(axis('Time', 'Proposals'));
        expect(a.find('text.x.title')).toHaveLength(1);
        expect(a.find('text.y.title')).toHaveLength(1);
    });
});
