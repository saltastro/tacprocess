import axios from 'axios';

import Partner from '../util/partner';

const API_BASE_URL = 'http://localhost:5001';

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

export function login(username, password) {
    return client.post('/login',
                {
                    username,
                    password
                });
}

const USER_STORAGE_KEY = 'salt-tac-pages:user';

export function saveUser(user) {
    if (!user) {
        return;
    }
    console.log('SAVING...', user.partner);
    localStorage.setItem(USER_STORAGE_KEY,
                         JSON.stringify(
                                 {
                                 ...user,
                                     partner: user.partner.code
                                 }
                         ));
}

export function loadUser() {
    const user = JSON.parse(localStorage.getItem(USER_STORAGE_KEY));
    if (!user) {
        return null;
    }

    return {
            ...user,
        partner: Partner.partnerByCode(user.partner)
    };
}

export function removeUser() {
    localStorage.removeItem(USER_STORAGE_KEY);
}

export function logout() {
    removeUser();
}

