import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { compose } from 'redux';

import Partner from '../util/partner';
import TotalTimeDistribution from '../../src/components/total-time-distribution';

const mountExpect = compose(expect, toJson, mount);

describe('TotalTimeDistribution', () => {
    const AMNH = Partner.partnerByCode('AMNH');
    const RSA = Partner.partnerByCode('RSA');
    const UW = Partner.partnerByCode('UW');

    const timeRequests = {
        AMNH: [12.6, 22.0, 1.9, 25., 58.9, 31, 29.5, 7.8],
        RSA: [0, 0, 0, 78., 0, 99., 0, 0]
    };

    const proposals = timeRequests.AMNH.map((_, i) => (
            {
                timeRequests: [
                    {
                        partner: AMNH,
                        time: 3600 * timeRequests.AMNH[i]
                    },
                    {
                        partner: RSA,
                        time: 3600 * timeRequests.RSA[i]
                    }
                ]
            }
    ));
    proposals[2].timeRequests.push({
                                       partner: UW,
                                       time: 23.9 * 3600
                                   });

    it('should generate the plot for AMNH', () => {
        mountExpect(
                <TotalTimeDistribution height={500}
                                       partner={AMNH}
                                       proposals={proposals}
                                       width={500}/>
        ).toMatchSnapshot();
    });

    it('should generate the plot for RSA', () => {
        mountExpect(
                <TotalTimeDistribution height={500}
                                       partner={RSA}
                                       proposals={proposals}
                                       width={500}/>
        ).toMatchSnapshot();
    });

    it('should generate the plot for UW', () => {
        mountExpect(
                <TotalTimeDistribution height={500}
                                       partner={UW}
                                       proposals={proposals}
                                       width={500}/>
        ).toMatchSnapshot();
    });
});
