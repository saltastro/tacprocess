import {ALL_PARTNER, FETCHED_DATA, FETCHING_DATA_FAIL, FETCHING_DATA} from '../types'
import { storePartnerAllocations } from './timeAllocationActions'
import {convertTargets, fetchTargetsPass} from './targetsActions'
import {fetchProposalsPass} from './proposalsActions'
import {convertSA, fetchSAPass} from './saltAstronomerActions'
import {
  queryProposals,
  querySALTAstronomers, querySaltUsers, queryTacMembers,
  queryTargets,
  queryUserData
} from '../api/graphQL'
import {userLoggedIn, partnersFilter} from './auth'
import {convertSaltUsers, convertTacMembers, fetchSaltUsersPass, fetchTacMembersPass} from './adminActions'

export const fetchingAllData = () => ({
  type: FETCHING_DATA,
})

export const fetchedAllData = () => ({
  type: FETCHED_DATA,
})

export const fetchedAllDataFail = (message) => ({
  type: FETCHING_DATA_FAIL,
  payload: {
    error: message
  }
})

/**
 * this method fetch and dispatch all the dataStatus needed on the tac pages
 * dataStatus include:
 *  proposals, targets, user, salt astronomers, partners allocated times, tac members of all partners
 *  and all salt users
 *  @param semester
 *  @param partner
 * */
export function fetchAllData(semester, partner){
  return async (dispatch) => {
    dispatch(fetchingAllData())
    try {
      const saltAstronomers = querySALTAstronomers()
      const user = queryUserData()

      const proposals = queryProposals(semester, partner)
      const targets = queryTargets(semester, partner)
      const tacMembers = queryTacMembers()
      const saltUsers = querySaltUsers()
      await Promise.all([saltAstronomers, user, proposals, targets, tacMembers, saltUsers])
        .then(data => {
          dispatch(fetchSAPass(convertSA(data[ 0 ].data.data)))
          dispatch(userLoggedIn(data[ 1 ]))
          dispatch(partnersFilter(ALL_PARTNER))
          dispatch(fetchProposalsPass(data[ 2 ], semester, partner), semester)
          dispatch(fetchTargetsPass(convertTargets(data[ 3 ].data.data)))
          dispatch(storePartnerAllocations(semester))
          dispatch(fetchTacMembersPass(convertTacMembers(data[ 4 ].data.data)))
          dispatch(fetchSaltUsersPass(convertSaltUsers(data[ 5 ].data.data)))
        })

    }catch (e) {
      dispatch(fetchedAllDataFail(e.message))
      return
    }
    dispatch(fetchedAllData())
  }
}
