import {ALL_PARTNER, FETCHED_DATA, FETCHING_DATA_FAIL, FETCHING_DATA} from '../types'
import {fetchAllocationsPass} from './timeAllocationActions'
import {convertTargets, fetchTargetsPass} from './targetsActions'
import {fetchProposalsPass} from './proposalsActions'
import {fetchPartnerStatProposalsPass, totalObservation} from './partnerStatProposalsActions'
import {fetchPartnerStat1ProposalsPass} from './partnerStat1ProposalsActions'
import {fetchPartnerShareTimesPass} from './partnerShareTimesActions'
import {convertSA, fetchSAPass} from './saltAstronomerActions'
import {
  queryPartnerAllocations,
  queryProposals,
  queryPartnerStatProposals,
  querySALTAstronomers,
  querySaltUsers,
  queryTacMembers,
  queryTargets,
  queryUserData,
  queryPartnerShareTimes,
  queryPartnerStatObservations,
  queryTimeBreakdown,
  queryStatistics
} from '../api/graphQL'
import { userLoggedIn, partnersFilter } from './auth'
import {convertSaltUsers, convertTacMembers, fetchSaltUsersPass, fetchTacMembersPass} from './adminActions'
import { calculateTotalObservation } from '../util/partner-stat'
import {fetchTimeBreakdownPass} from './timeBreakdownActions'
import {fetchStatisticsPass} from './statisticsActions'

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
      const partnerStat1Proposals = queryProposals(currentSemester, partner)
      const targets = queryTargets(defaultSemester, partner)
      const allocations = queryPartnerAllocations(defaultSemester, partner)
      const tacMembers = queryTacMembers()
      const saltUsers = querySaltUsers()
      const partnerShareTimes = queryPartnerShareTimes(currentSemester, partner)
      const partnerStatObservations = queryPartnerStatObservations(currentSemester)
      const timeBreakdown = queryTimeBreakdown(currentSemester)
      const statistics = queryStatistics(currentSemester, partner)
      await Promise.all([
        saltAstronomers,
        user,
        proposals,
        partnerStatProposals,
        partnerStat1Proposals,
        targets,
        allocations,
        tacMembers,
        saltUsers,
        partnerShareTimes,
        partnerStatObservations,
        timeBreakdown,
        statistics
      ]).then(data => {
        dispatch(fetchSAPass(convertSA(data[ 0 ].data.data)))
        dispatch(userLoggedIn(data[ 1 ]))
        dispatch(partnersFilter(ALL_PARTNER))
        dispatch(fetchProposalsPass(data[ 2 ], defaultSemester, partner), defaultSemester)
        dispatch(fetchPartnerStatProposalsPass(data[ 3 ], currentSemester, partner), currentSemester)
        dispatch(fetchPartnerStat1ProposalsPass(data[ 4 ], currentSemester, partner), currentSemester)
        dispatch(fetchTargetsPass(convertTargets(data[ 5 ].data.data)))
        dispatch(fetchAllocationsPass(data[ 6 ]))
        dispatch(fetchTacMembersPass(convertTacMembers(data[ 7 ].data.data)))
        dispatch(fetchSaltUsersPass(convertSaltUsers(data[ 8 ].data.data)))
        dispatch(fetchPartnerShareTimesPass(data[ 9 ], currentSemester, partner), currentSemester)
        dispatch(totalObservation(calculateTotalObservation(data[ 10 ])))
        dispatch(fetchTimeBreakdownPass(data[ 11 ], currentSemester), currentSemester)
        dispatch(fetchStatisticsPass(data[ 12 ]))
      })
    } catch (e) {
      dispatch(fetchedAllDataFail(e.message))
      return
    }
    dispatch(fetchedAllData())
  }
}
