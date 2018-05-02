import {ALL_PARTNER, FETCHED_DATA, FETCHING_DATA_FAIL, FETCHING_DATA} from '../types'
import {convertPartnerAllocations, fetchAllocationsPass} from './timeAllocationActions'
import {convertTargets, fetchTargetsPass} from './targetsActions'
import {fetchProposalsPass} from './proposalsActions'
import {convertSA, fetchSAPass} from './saltAstronomerActions'
import {
  convertProposals, convertUserData,
  queryPartnerAllocations,
  queryProposals,
  querySALTAstronomers, querySaltUsers, queryTacMembers,
  queryTargets,
  queryUserData
} from '../api/graphQL'
import {userLoggedIn, partnersFilter} from './auth'
import {convertSaltUsers, convertTacMembers, fetchSaltUsersPass, fetchTacMembersPass} from './AdminActions'

export const fetchingAllData = () => ({
  type: FETCHING_DATA,
});

export const fetchedAllData = () => ({
  type: FETCHED_DATA,
});

export const fetchedAllDataFail = (message) => ({
  type: FETCHING_DATA_FAIL,
  payload: {
    error: message
  }
});

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
      const allocations = queryPartnerAllocations(semester, partner)
      const tacMembers = queryTacMembers()
      const saltUsers = querySaltUsers()
      await Promise.all([saltAstronomers, user, proposals, targets, allocations, tacMembers, saltUsers])
        .then(data => {
          dispatch(fetchSAPass(convertSA(data[0].data.data)))
          dispatch(userLoggedIn(convertUserData(data[1].data.data.user)))
          dispatch(partnersFilter(ALL_PARTNER))
          dispatch(fetchProposalsPass(convertProposals(data[2].data.data, semester, partner), semester))
          dispatch(fetchTargetsPass(convertTargets(data[3].data.data)))
          dispatch(fetchAllocationsPass(convertPartnerAllocations(data[4].data.data)))
          dispatch(fetchTacMembersPass(convertTacMembers(data[5].data.data)))
          dispatch(fetchSaltUsersPass(convertSaltUsers(data[6].data.data)))
        })

    }catch (e) {
      dispatch(fetchedAllDataFail(e.message))
      return
    }
    dispatch(fetchedAllData())
  }
}
