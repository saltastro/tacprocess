import React from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import Plot from '../plots/Plot'
import DeclinationDistribution from '../plots/DeclinationDistribution'
import RightAscensionDistribution from '../plots/RightAscensionDistribution'
import TotalTimeDistribution from '../plots/TotalTimeDistribution'
import TransparencyDistributionHistogram from '../plots/TransparencyDistributionHistogram'
import TargetDistributionContourMap from '../plots/TargetDistributionContourMap'
import TargetDistributionScatterPlot from '../plots/TargetDistributionScatterPlot'
import PartnerTimeTable from '../tables/statisticsTables/PartnerTimeTable'
import ProposalCountTable from '../tables/statisticsTables/ProposalsCountTable'
import PartnerProposals from '../../util/proposal'
import { getPartnerList } from '../../util/filters'
import {ALL_PARTNER} from '../../types'
import TargetStatistics from '../tables/statisticsTables/TargetStatistics'
import ObservingStatisticsSeeing from '../tables/statisticsTables/ObservingStatisticsSeeing'
import ObservingStatisticsTransparency from '../tables/statisticsTables/ObservingStatisticsTransparacy'
import ConfigurationsStatistics from '../tables/statisticsTables/ConfigurationStatistics'
import RSSDetectorModeTable from '../tables/statisticsTables/RSSDetectorModeTable'
import HRSStatistics from '../tables/statisticsTables/HRSStatistics'
import RSSObservingModeTable from '../tables/statisticsTables/RSSObservingModeTable'
import SALTICAMStatistics from '../tables/statisticsTables/SALTICAMStatistics'

class StatisticsPage extends React.Component {
	
  render() {
    /* this will require me to define a shape on PropTypes  */
		
    const { filters, allocatedTime, targets, proposalsData, roles, statistics } = this.props
    const { observingConditions, instruments, proposals: proposalStatistics } = statistics
    const partner = filters.selectedPartner || ''
    const semester = filters.selectedSemester
    if(proposalsData.fetching){
      return(
        <div className='spinner'>
          <div className ='dot1'/>
          <div className='dot2'/>
        </div>
      )
    }

    let proposals
    if (partner === ALL_PARTNER) { // eslint-disable-next-line
      proposals = proposalsData.proposals
    }else{
      proposals = PartnerProposals(proposalsData.proposals, getPartnerList(roles))[ partner ] || []
    }

    return(
      <div>
        <div className='stat-wrapper'>
          <div className='stat-item'>
            <ProposalCountTable proposalStatistics={ proposalStatistics } />
          </div>
          <div className='stat-item'>
            <PartnerTimeTable proposals={ proposals } allocatedTime={ allocatedTime } partner={ partner } semester={ semester }/>
          </div>
        </div>

        <div className='stat-wrapper-center'>
          <div className='stat-item'>
            <h2>Number of proposals vs Requested time</h2>
            <TotalTimeDistribution
              proposals={ proposals }
              semester={ semester }
              partner={ partner }
            />
          </div>
        </div>

        <div className='stat-wrapper-center'>
          <TargetStatistics targets={ targets }/>
        </div>

        <div className='stat-wrapper'>
          <Plot caption='Smoothed distribution of all targets on the sky.'>
            <TargetDistributionContourMap targets={ targets }/>
          </Plot>
          <Plot caption='Distribution of mandatory targets <em style="color:green;">(squares)</em> and optional targets <em style="color:purple;">(circles)</em> on the sky.'>
            <TargetDistributionScatterPlot targets={ targets }/>
          </Plot>
        </div>

        <div className='stat-wrapper'>
          <RightAscensionDistribution targets={ targets }/>
          <DeclinationDistribution targets={ targets }/>
        </div>

        <h2>Observing Conditions</h2>
        <div className='stat-wrapper'>
          <TransparencyDistributionHistogram
            transparencyDistribution={ observingConditions.transparency }
          />
          <div className='stat-item'>
            <ObservingStatisticsTransparency
              transparencyDistribution={ observingConditions.transparency }
            />
            <div >
              <h2>Seeing requests</h2>
              <ObservingStatisticsSeeing seeingDistribution={ observingConditions.seeing }/>
            </div>
          </div>

        </div>

        <div className='stat-wrapper-center'>

            <ConfigurationsStatistics numberOfConfigurationsPerInstrument={ {
              salticam: instruments.scamTotal,
              rss: instruments.rssTotal,
              hrs: instruments.hrsTotal,
            } }/>

        </div>

        <div  className='stat-wrapper'>
          <RSSDetectorModeTable numberOfConfigurationsPerRssDetectorMode={ instruments.rssDetectorModeTotal }/>
          <RSSObservingModeTable numberOfConfigurationsPerRssObservingMode={ instruments.rssObservingModeTotal }/>
        </div>

        <div  className='stat-wrapper'>
          <HRSStatistics numberOfConfigurationsPerHrsResolution={ instruments. hrsResolutionTotal }/>
          <SALTICAMStatistics
            numberOfConfigurationsPerSalticamDetectorMode={ instruments.salticamDetectorModeTotal }
          />
        </div>
      </div>
    )
  }
}

StatisticsPage.propTypes = {
  proposalsData: propTypes.object.isRequired,
  targets: propTypes.array.isRequired,
  statistics: propTypes.object.isRequired,
  filters: propTypes.object.isRequired,
  allocatedTime: propTypes.object.isRequired,
  roles: propTypes.array.isRequired,
}

export default connect(
  store => ({
    proposalsData: store.proposals,
    targets: store.statistics.statistics.targets,
    statistics: store.statistics.statistics,
    filters:store.filters,
    allocatedTime:store.tac.data,
    roles: store.user.user.roles
  }), null
)(StatisticsPage) 
