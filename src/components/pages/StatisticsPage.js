/* eslint-disable */
import React from "react";
import { connect } from "react-redux"
import Plot from '../plots/Plot';
import InstrumentDistribution from '../plots/InstrumentDistribution';
import HrsModeDistribution from '../plots/HrsModeDistribution';
import RssModeDistribution from '../plots/RssModeDistribution';
import DeclinationDistribution from '../plots/DeclinationDistribution';
import RightAscensionDistribution from '../plots/RightAscensionDistribution';
import SalticamModeDistribution from '../plots/SalticamModeDistribution';
import TotalTimeDistribution from '../plots/TotalTimeDistribution';
import TransparencyDistribution from '../plots/TransparencyDistribution';
import TargetDistributionContourMap from "../plots/TargetDistributionContourMap";
import TargetDistributionScatterPlot from "../plots/TargetDistributionScatterPlot";
import PartnerTimeTable from "../tables/statisticsTables/PartnerTimeTable";
import ProposalCountTable from "../tables/statisticsTables/ProposalsCountTable";
import PartnerProposals from "../../util/proposal";
import {getPartnerList} from "../../util/filters";
import {ALL_PARTNER} from "../../types";
import TargetStatistics from "../tables/statisticsTables/TargetStatistics";
import ObservingStatisticsSeeing from "../tables/statisticsTables/ObservingStatisticsSeeing";
import ObservingStatisticsTransparency from "../tables/statisticsTables/ObservingStatisticsTransparacy";
import ConfigurationsStatistics from "../tables/statisticsTables/ConfigurationStatistics";
import RSSDetectorModeTable from "../tables/statisticsTables/RSSDetectorModeTable";
import HRSStatistics from "../tables/statisticsTables/HRSStatistics";
import RSSObservingModeTable from "../tables/statisticsTables/RSSObservingModeTable";
import SALTICAMStatistics from "../tables/statisticsTables/SALTICAMStatistics";

class StatisticsPage extends React.Component {
	
	render() {
		/* this will require me to difine a shape on PropTypes  */
		
		const {  filters, allocatedTime, targets, proposalsData, roles } = this.props;
		const partner = filters.selectedPartner || "";
		const semester = filters.selectedSemester;
		if(proposalsData.fetching){
			return(
				<div className='spinner'>
					<div className ='dot1'/>
					<div className='dot2'/>
				</div>
			)
		}
		
		let proposals = [];
		if (partner === ALL_PARTNER) {
			
			  proposals = proposalsData.proposals;
		}else{
			proposals = PartnerProposals(proposalsData.proposals, getPartnerList(roles))[partner] || [];
		}
		return(
			<div>
				
				<div className={"stat-wrapper"}>
					<ProposalCountTable proposals={proposals}/>
					<PartnerTimeTable proposals={proposals} allocatedTime={allocatedTime} partner={partner} semester={semester}/>
				</div>
				<h2><br/>Number of proposals vs Requested time</h2>
				<div className={"stat-wrapper-center"}>
					<TotalTimeDistribution
						proposals={proposals}
						semester={semester}
						partner={partner}
					/>
				</div>
				
				<div className={"stat-wrapper"}>
					<InstrumentDistribution
						proposals={proposals}
						semester={semester}
						partner={partner}
					/>
					<ConfigurationsStatistics proposals={proposals}/>
				</div>
				<div  className={"stat-wrapper-center"}>
					<RSSDetectorModeTable proposals={proposals}/>
				</div>
				<div  className={"stat-wrapper"}>
					<RssModeDistribution
					proposals={proposals}
					semester={semester}
					partner={partner}
					/>
					<RSSObservingModeTable proposals={proposals}/>
				</div>
				<h2>HRS Detector Mode</h2>
				<div  className={"stat-wrapper"}>
					<HrsModeDistribution
						proposals={proposals}
						semester={semester}
						partner={partner}
					/>
					<HRSStatistics proposals={proposals}/>
				</div>
				<h2>Salticam Detector Mode</h2>
				<div className={"stat-wrapper"}>
					<SalticamModeDistribution
						proposals={proposals}
						semester={semester}
						partner={partner}
					/>
					<SALTICAMStatistics proposals={proposals}/>
				</div>
				<div className={"stat-wrapper"}>
				
					
				</div>
				<div className={"stat-wrapper-center"}>
					<TargetStatistics targets={targets.targets}/>
				</div>
				<div className={"stat-wrapper"}>
					<Plot caption={"Smoothed distribution of all targets on the sky."}>
						<TargetDistributionContourMap targets={targets.targets}/>
					</Plot>
					<Plot caption='Distribution of mandatory targets <em style="color:green;">(squares)</em> and optional targets <em style="color:purple;">(circles)</em> on the sky.'>
						<TargetDistributionScatterPlot targets={targets.targets}/>
					</Plot>
				</div>
				<div className={"stat-wrapper"}>
					<RightAscensionDistribution targets={targets.targets}/>
					<DeclinationDistribution targets={targets.targets}/>
				</div>
				<h2>Observing Conditions</h2>
				<div className={"stat-wrapper"}>
					<TransparencyDistribution
						proposals={proposals}
						semester={semester}
						partner={partner}
					/>
					<ObservingStatisticsTransparency
						proposals={proposals}
						partner={partner}
					/>
				</div>
			</div>
		);
	}
}

export default connect(
	store => ({
		statistics: store.statistics,
		proposalsData: store.proposals,
		targets: store.targets,
		filters:store.filters,
		allocatedTime:store.tac.data,
		roles: store.user.user.roles
	}), null
)(StatisticsPage) ;
