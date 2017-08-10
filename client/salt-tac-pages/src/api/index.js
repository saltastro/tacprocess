import axios from 'axios';

import Partner from '../util/partner';

const API_BASE_URL = 'http://localhost:7777';

const client = axios.create({
                                baseURL: API_BASE_URL,
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            });

const AMNH = Partner.partnerByCode('AMNH');
const RSA = Partner.partnerByCode('RSA');

const fakeProposals = [
    {
        title: 'Proposal 1',
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
        title:'Proposal 2',
        timeRequests: [
            {
                partner: AMNH,
                time: 5.57 * 3600
            },
        ]
    },
    {
        title: 'Proposal 3',
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
        return Promise.reject(`The server does not like semester ${semester}.`);
    }
}
