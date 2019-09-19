import { querySaltUsers, queryTacMembers } from '../api/graphQL'
import {
    FAIL_TO_GET_SALT_USERS,
    FAIL_TO_GET_TAC_MEMBERS,
    SALT_USERS_QUERY_PASS,
    TAC_MEMBERS_QUERY_PASS,
    FETCHING_SALT_USERS_START,
    FETCHING_TAC_MEMBERS_START
} from '../types'

const failToGetSaltUsers = () => ({
    type: FAIL_TO_GET_SALT_USERS
})
const failToGetTacMembers = () => ({
    type: FAIL_TO_GET_TAC_MEMBERS
})

export const fetchSaltUsersPass = (users) => ({
    type: SALT_USERS_QUERY_PASS,
    payload: users
})
export const fetchTacMembersPass = (tacs) => ({
    type: TAC_MEMBERS_QUERY_PASS,
    payload: tacs
})

const fetchingSaltUsersStart = () => ({
    type: FETCHING_SALT_USERS_START
})
const fetchingTacMembersStart = () => ({
    type: FETCHING_TAC_MEMBERS_START
})

export function convertSaltUsers(users) {
    return users.saltUsers.map(user => ({
        name: user.firstName,
        username: user.username,
        surname: user.lastName
    }))
}

export function convertTacMembers(tacs) {
    const tacMembers = {}
    tacs.tacMembers.forEach(tac => {
        if (!tacMembers[ tac.partner.code ]) {
            tacMembers[ tac.partner.code ] = []
        }
        tacMembers[ tac.partner.code ].push({
            name: tac.firstName,
            username: tac.username,
            surname: tac.lastName,
            isTacChair: tac.isChair
        })

    })
    return tacMembers
}

export function fetchSaltUsers() {
    return function disp(dispatch) {
        dispatch(fetchingSaltUsersStart())
        querySaltUsers().then(res => {
            dispatch(fetchSaltUsersPass(convertSaltUsers(res.data.data)))
        }).catch((e) => {
            dispatch(failToGetSaltUsers(e.message))
        })
    }
}

export function fetchTacMembers() {
    return function disp(dispatch) {
        dispatch(fetchingTacMembersStart())
        queryTacMembers().then(res => {
            dispatch(fetchTacMembersPass(convertTacMembers(res.data.data)))
        }).catch((e) => {
            dispatch(failToGetTacMembers(e.message))
        })
    }
}