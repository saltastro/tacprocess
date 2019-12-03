import React from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import DropDown from './selectors/DropDown'
import { partnerChange, semesterChange, astronomerChange } from '../actions/filtersActions'
import fetchProposals  from '../actions/proposalsActions'
import fetchPartnerStatProposals  from '../actions/partnerStatProposalsActions'
import fetchPartnerShareTimes from '../actions/partnerShareTimesActions'
import fetchTargets  from '../actions/targetsActions'
import { storePartnerAllocations } from '../actions/timeAllocationActions'
import { semestersArray, getPartnerList, getAstronomersList } from '../util/filters'
import { defaultSemester } from '../util'
import { ADMINISTRATOR, SALT_ASTRONOMER, BOARD, TAC_CHAIR, ALL_PARTNER } from '../types'
import fetchPartnerStat1Proposals from '../actions/partnerStat1ProposalsActions'
import fetchTimeBreakdown from '../actions/timeBreakdownActions'

class Filters extends React.Component {
	updateSemester = value => {
		const { dispatch, filters } = this.props
		dispatch(fetchProposals( value, filters.selectedPartner))
		dispatch(fetchPartnerStatProposals( value, filters.selectedPartner))
		dispatch(fetchPartnerStat1Proposals( value, filters.selectedPartner))
		dispatch(fetchTimeBreakdown( value ))
		dispatch(fetchPartnerShareTimes( value, filters.selectedPartner))
		dispatch(fetchTargets(value, filters.selectedPartner))
		dispatch(storePartnerAllocations(value, filters.selectedPartner))
		dispatch(semesterChange(value))
	};
	updatePartner = value => {
		const { dispatch, filters } = this.props
		dispatch(fetchProposals( filters.selectedSemester, value))
		dispatch(fetchPartnerStatProposals( filters.selectedPartnerStatsSemester, value))
		dispatch(fetchPartnerStat1Proposals( filters.selectedPartnerStatsSemester, value))
		dispatch(fetchTimeBreakdown( filters.selectedPartnerStatsSemester ))
		dispatch(fetchPartnerShareTimes(filters.selectedPartnerStatsSemester, value))
		dispatch(fetchTargets(filters.selectedSemester, value))
		dispatch(storePartnerAllocations(filters.selectedSemester, value))
		dispatch(partnerChange(value))
	};
	updateLiaison = value => {
		const { dispatch } = this.props
		dispatch(astronomerChange(value))
	};

	render() {
		const { filters, user, SALTAstronomers, location, loadingProposals, loadingTargets } = this.props
		const { selectedPartner, selectedSemester, selectedPartnerStatsSemester, selectedLiaison } = filters
		const mayViewAll = user.roles.some(role => ['ADMINISTRATOR', 'BOARD', 'SALT_ASTRONOMER'].includes(role.type));
		const partnerList = mayViewAll ? getPartnerList(user.roles) : getPartnerList(user.roles).filter(partner => partner !== ALL_PARTNER)
		const astronomersList = ['All', 'Assigned'].concat(getAstronomersList(SALTAstronomers)).concat(['Not Assigned'])
		const partnerStatAstronomersList = astronomersList.filter((astronomer) => !['Assigned', 'Not Assigned'].includes(astronomer))
		const partnerStatAstronomer = ['Assigned', 'Not Assigned'].includes(selectedLiaison) ? 'All' : selectedLiaison
		const semesters = ( user.roles || []).some(r => r.type === ADMINISTRATOR || r.type === SALT_ASTRONOMER || r.type === BOARD || r.type === TAC_CHAIR) ? semestersArray() : [defaultSemester()]
		if (location.pathname === '/' ||
			location.pathname === '/admin' ||
			location.pathname === '/documentation') {
			return <b/>
		}
		return(
			<div className='selector-div'>
				{(loadingProposals || loadingTargets) && <div className='dimScreen' />}
				{
					(loadingProposals && loadingTargets) &&
					<div className='dimScreen'>
						<h1 className='loader'>
							<span className='let1 span-loader'>l</span>
							<span className='let2 span-loader'>o</span>
							<span className='let3 span-loader'>a</span>
							<span className='let4 span-loader'>d</span>
							<span className='let5 span-loader'>i</span>
							<span className='let6 span-loader'>n</span>
							<span className='let7 span-loader'>g</span>
							<span className='let8 span-loader'>.</span>
							<span className='let9 span-loader'>.</span>
							<span className='let10 span-loader'>.</span>
						</h1>
					</div>
				}

				{ location.pathname === '/partnerstat' &&
					<div className='left'>
						<DropDown
							className='left-2'
							name='Semester'
							listToDisplay={ semesters }
							OnChange={ this.updateSemester }
							value={ selectedPartnerStatsSemester }/>
					</div>
				}

				{ location.pathname !== '/partnerstat' &&
					<div className='left'>
						<DropDown
							className='left-2'
							name='Semester'
							listToDisplay={ semesters }
							OnChange={ this.updateSemester }
							value={ selectedSemester }/>
					</div>
				}

				<div className='left-2'>
					<DropDown
						name='Partner'
						listToDisplay={ partnerList }
						OnChange={ this.updatePartner }
						value={ selectedPartner }/>
				</div>

				{ location.pathname === '/partnerstat' &&
					<div className='left-2'>
						<DropDown
							name='Liaison SA'
							listToDisplay={ partnerStatAstronomersList }
							OnChange={ this.updateLiaison }
							value={ partnerStatAstronomer }/>
					</div>
				}

				{ location.pathname === '/techreview' &&
					<div className='left-2'>
						<DropDown
							name='SALT Astronomer'
							listToDisplay={ astronomersList }
							OnChange={ this.updateLiaison }
							value={ selectedLiaison }/>
					</div>
				}
			</div>
		)

	}
}

Filters.propTypes = {
	dispatch: propTypes.func.isRequired,
	loadingProposals: propTypes.bool.isRequired,
	loadingTargets: propTypes.bool.isRequired,
	filters: propTypes.object.isRequired,
	user: propTypes.object.isRequired,
	location: propTypes.object.isRequired,
	SALTAstronomers: propTypes.array.isRequired,
}

export default withRouter(connect(
	store => ({
		filters: store.filters,
		loadingTargets: store.targets.fetching,
		loadingProposals: store.proposals.fetching,
		user:store.user.user,
		SALTAstronomers: store.SALTAstronomers.SALTAstronomer
	}) ,null
)(Filters))
