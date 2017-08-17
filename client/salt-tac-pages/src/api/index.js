import axios from 'axios';

import Partner from '../util/partner';

const API_BASE_URL = 'http://localhost:5001';

const jsonClient = axios.create({
                                    baseURL: API_BASE_URL,
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                            });

const graphqlClient = axios.create({
                                       baseURL: API_BASE_URL,
                                       headers: {
                                           'Content-Type': 'application/graphql'
                                       }
                                   });

const convertSemesterData = (semesterData, semester, partner) => {
    // targets
    // ignore non-sidereal and dummy targets
    const targets = semesterData.targets
            .map((target) => (
                    {
                        ra: target.coordinates.ra,
                        dec: target.coordinates.dec,
                        proposalCode: target.ofProposalCode
                    }
            ))
            .filter((target) => target.ra !== 0 || target.dec !== 0);

    // proposals
    const proposalTargets = (proposal) => {
        return targets.reduce((t, target) =>
                                      target.proposalCode === proposal.proposalCode ? [...t, target] : t,
                              []);
    };
    const proposals = semesterData.proposals
            .filter((proposal) => partner.hasNonZeroTimeRequestFor(proposal, semester))
            .map((proposal) => (
            {
                ...proposal,
                timeRequests: proposal.timeRequests.map((tr) => (
                        {
                            semester: tr.semester,
                            partner: Partner.partnerByCode(tr.partnerCode),
                            requestedTime: tr.requestedTime
                        }
                )),
                targets: proposalTargets(proposal)
            }
    ));

    // available time
    const addAvailableTimes = (availableTimes) => {
        return availableTimes.reduce((total, time) => (
                {
                    scienceTime: {
                        p0AndP1: total.scienceTime.p0AndP1 + time.scienceTime.p0AndP1,
                        p2: total.scienceTime.p2 + time.scienceTime.p2,
                        p3: total.scienceTime.p3 + time.scienceTime.p3
                    },
                    allocationTime: {
                        p0AndP1: total.allocationTime.p0AndP1 + time.allocationTime.p0AndP1,
                        p2: total.allocationTime.p2 + time.allocationTime.p2,
                        p3: total.allocationTime.p3 + time.allocationTime.p3
                    }
                }
        ),
                                     {
                                         scienceTime: {p0AndP1: 0, p2: 0, p3: 0},
                                         allocationTime: {p0AndP1: 0, p2: 0, p3: 0}
                                     });
    };

    const allAvailableTimes = semesterData.partners.reduce((times, partner) => [...times, ...partner.distributedTimes],
                                                           []);
    return {
        proposals,
        targets,
        availableTime: addAvailableTimes(allAvailableTimes)
    };
};

export function fetchSemesterData(partner, semester) {
    const query = `
{
  partners {
    partnerCode,
    partnerDistributedTimes {
      semester
      scienceTime {
        p0AndP1
        p2
        p3
      }
      allocationTime {
        p0AndP1
        p2
        p3
      }
    }
  }
}
`;

    return graphqlClient.post('/graphql', query)
            .then((response) => {
                if (response.data.errors) {
                    throw new Error(response.data.errors[0].message);
                }
                return convertSemesterData(response.data, semester, partner)
            });
}

const convertUserData = (userData) => {
    let partner = Partner.partnerByCode('NONE');
    if (userData.partnerCode) {
        partner = Partner.partnerByCode(userData.partnerCode);
    }
    delete userData['partnerCode'];
    return {
        ...userData,
        partner
    };
};

export function login(username, password) {
    return jsonClient.post('/token',
                           {
                               username,
                               password
                           })
            .then((response) => {
                return convertUserData(response.data);
            });
}

const USER_STORAGE_KEY = 'salt-tac-pages:user';

export function saveUser(user) {
    if (!user) {
        return;
    }
    localStorage.setItem(USER_STORAGE_KEY,
                         JSON.stringify(
                                 {
                                     ...user,
                                     partner: user.partner ? user.partner.code : null
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

