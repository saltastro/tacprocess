import React from 'react';
import { render } from 'react-dom';

import registerServiceWorker from './registerServiceWorker';
import TotalTimeDistribution from './components/total-time-distribution';
import Partner from './util/partners';

const AMNH = Partner.partnerByCode('AMNH');
const RSA = Partner.partnerByCode('RSA');

render(<svg width={1000} height={1000}>
    <TotalTimeDistribution proposals={semesterData} width={500} height={500} partner={AMNH}/>
        </svg>,
        document.getElementById('root'));
registerServiceWorker();
