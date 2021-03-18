import {ALL_PARTNER, FETCHED_DATA, FETCHING_DATA_FAIL, FETCHING_DATA} from '../types'
import {fetchAllocationsPass} from './timeAllocationActions'
import {fetchProposalsPass} from './proposalsActions'
import {fetchPartnerStatProposalsPass, totalObservation} from './partnerStatProposalsActions'
import {convertSA, fetchSAPass} from './saltAstronomerActions'
import {
  queryPartnerAllocations,
  queryProposals,
  queryPartnerStatProposals,
  querySALTAstronomers,
  querySaltUsers,
  queryTacMembers,
  queryUserData,
  queryStatistics
} from '../api/graphQL'
import { userLoggedIn, partnersFilter } from './auth'
import {convertSaltUsers, convertTacMembers, fetchSaltUsersPass, fetchTacMembersPass} from './adminActions'
import { calculateTotalObservation } from '../util/partner-stat'
import { fetchPartnerStatisticsPass, fetchStatisticsPass } from './statisticsActions'

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
 *  proposals, user, salt astronomers, partners allocated times, tac members of all partners
 *  and all salt users
 *  @param defaultSemester the default semester for all other pages data
 *  @param currentSemester the current semester for the partner stats page data
 *  @param partner
 * */
export function fetchAllData (defaultSemester, currentSemester, partner) {
  return async (dispatch) => {
    dispatch(fetchingAllData())
    try {
      const saltAstronomers = querySALTAstronomers()
      const user = queryUserData()
      const proposals = queryProposals(defaultSemester, partner)
      const partnerStatProposals = queryPartnerStatProposals(currentSemester, partner)
      const allocations = queryPartnerAllocations(defaultSemester, partner)
      const tacMembers = queryTacMembers()
      const saltUsers = querySaltUsers()
      const statistics = queryStatistics(defaultSemester, partner)
      const partnerStatistics = queryStatistics(currentSemester, partner)
      await Promise.all([
        saltAstronomers,
        user,
        proposals,
        partnerStatProposals,
        allocations,
        tacMembers,
        saltUsers,
        statistics,
        partnerStatistics
      ]).then(data => {
        dispatch(fetchSAPass(convertSA(data[ 0 ].data.data)))
        dispatch(userLoggedIn(data[ 1 ]))
        dispatch(partnersFilter(ALL_PARTNER))
        dispatch(fetchProposalsPass(data[ 2 ], defaultSemester, partner), defaultSemester)
        dispatch(fetchPartnerStatProposalsPass(data[ 3 ], currentSemester, partner), currentSemester)
        dispatch(fetchAllocationsPass(data[ 4 ]))
        dispatch(fetchTacMembersPass(convertTacMembers(data[ 5 ].data.data)))
        dispatch(fetchSaltUsersPass(convertSaltUsers(data[ 6 ].data.data)))
        dispatch(totalObservation(calculateTotalObservation(data[ 7 ].completion)))
        dispatch(fetchStatisticsPass(data[ 7 ]))
        dispatch(fetchPartnerStatisticsPass(data[ 8 ]))
      })
    } catch (e) {
      dispatch(fetchedAllDataFail(e.message))
      return
    }
    dispatch(fetchedAllData())
  }
}
