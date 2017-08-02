import axios from 'axios';

const API_BASE_URL = 'http://localhost:7777';

const client = axios.create({
                                baseURL: API_BASE_URL,
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            });

export function fetchProposals(semester) {
    return axios.get('/proposals');
}