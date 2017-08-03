import axios from 'axios';

const API_BASE_URL = 'http://localhost:7777';

const client = axios.create({
                                baseURL: API_BASE_URL,
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            });

import Partner from '../util/partners';

const AMNH = Partner.partnerByCode('AMNH');
const RSA = Partner.partnerByCode('RSA');

const fakeProposals = [
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

export function fetchProposals(semester) {
    if (semester === '2017-2') {
        return Promise.resolve(fakeProposals);
    } else {
        return `The server does not like semester ${semester}.`;
    }
}
