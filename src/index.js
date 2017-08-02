import React from 'react';
import { render } from 'react-dom';

import TotalTimeDistribution from './components/total-time-distribution';
import { partnerByCode } from './util/partners';

const AMNH = partnerByCode('AMNH');
const RSA = partnerByCode('RSA');

const proposals = [
    {
        timeRequests: [
            {
                partner: AMNH,
                time: 3.7
            },
            {
                partner: RSA,
                time: 5
            }
        ]
    },
    {
        timeRequests: [
            {
                partner: AMNH,
                time: 54.57
            },
        ]
    },
    {
        timeRequests: [
            {
                partner: RSA,
                time: 17
            }
        ]
    },
];

render(<svg width={1000} height={1000}>
    <TotalTimeDistribution proposals={proposals} width={500} height={500} partner={AMNH}/>
        </svg>,
        document.getElementById('react-content'));
