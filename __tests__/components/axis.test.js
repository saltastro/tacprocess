import React from 'react';
import { scaleLinear } from 'd3-scale';
import { mount } from 'enzyme';

import Axis from '../../src/components/axis';

describe('Axis', () => {
    let orientation;
    let scale;
    let tickValues;
    let transform;

    beforeEach(() => {
        orientation = 'Left';
        scale = scaleLinear().domain([0, 10]).range([0, 100]);
        tickValues = null;
        transform = 'translate(0, 0)';
    });

    it('should use supplied tick values', () => {
        tickValues = [2, 7, 9];
        let axis = mount(<Axis orientation={orientation} scale={scale} tickValues={tickValues} transform={transform}/>);
        tickValues.forEach(v => expect(axis.html()).toEqual(expect.stringMatching(`>${v}<`)));
    });
});
