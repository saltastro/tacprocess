import { combineReducers } from 'redux'

import user from './reducers/user'
import filters from './reducers/filters'
import proposals from './reducers/proposals'
import partnerStatProposals from './reducers/partnerStatProposals'
import timeBreakdown from './reducers/timeBreakdown'
import statistics from './reducers/statistics'
import tac from './reducers/tac'
import SALTAstronomers from './reducers/astronomers'
import dataStatus from './reducers/dataStatus'
import partnerShareTimes from './reducers/partnerShareTimes'

export default combineReducers({
	dataStatus,
	user,
	filters,
	tac,
	proposals,
	partnerStatProposals,
	SALTAstronomers,
	partnerShareTimes,
	timeBreakdown,
	statistics
})
