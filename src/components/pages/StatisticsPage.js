/* eslint-disable */
import React from "react";
import { connect } from "react-redux"
import StatisticsTables from "../tables/StatisticsTables";
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

class StatisticsPage extends React.Component {
	
	render() {
		/* this will require me to difine a shape on PropTypes  */
		
		const {  filters, allocatedTime, targets, proposals } = this.props;
		const partner = filters.selectedPartner || "";
		const semester = filters.selectedSemester;
		if(proposals.fetching){
			return(
				<div className='spinner'>
					<div className ='dot1'/>
					<div className='dot2'/>
				</div>
			)
		}
		
		return(
			<div>
				<div className={"stat-wrapper"}>
					<PartnerTimeTable proposals={proposals} allocatedTime={allocatedTime} partner={partner} semester={semester}/>
					<ProposalCountTable proposals={proposals}/>
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
				<div className={"stat-wrapper"}>
					<HrsModeDistribution
						proposals={proposals}
						semester={semester}
						partner={partner}
					/>
					<SalticamModeDistribution
						proposals={proposals}
						semester={semester}
						partner={partner}
					/>
				</div>
				<div className={"stat-wrapper"}>
					<RssModeDistribution
						proposals={proposals}
						semester={semester}
						partner={partner}
					/>
					<InstrumentDistribution
						proposals={proposals}
						semester={semester}
						partner={partner}
					/>
				</div>
				<div className={"stat-wrapper"}>
					<TotalTimeDistribution
						proposals={proposals}
						semester={semester}
						partner={partner}
					/>
					
					<TransparencyDistribution
						proposals={proposals}
						semester={semester}
						partner={partner}
					/>
				</div>
					
				<StatisticsTables
					proposals={proposals}
					partner={partner}
					allocatedTime = {allocatedTime}
				/>
			</div>
		);
	}
}

export default connect(
	store => ({
		statistics: store.statistics,
		proposals: store.proposals.proposals,
		targets: store.targets,
		filters:store.filters,
		allocatedTime:store.tac.data,
	}), null
)(StatisticsPage) ;
