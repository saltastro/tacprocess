import React from 'react';
import { render } from 'react-dom';

import registerServiceWorker from './registerServiceWorker';
import TotalTimeDistribution from './components/total-time-distribution';
import Partner from './util/partners';

const AMNH = Partner.partnerByCode('AMNH');
const RSA = Partner.partnerByCode('RSA');

const proposals = [
    {
        timeRequests: [
            {
                partner: AMNH,
                time: 77 * 3600
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
                time: 5.57 * 3600
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
        document.getElementById('root'));
registerServiceWorker();
