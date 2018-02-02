/* eslint-disable */
import React from "react";
import { connect } from "react-redux"
import StatTable from "../tables/StatTable";
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

class StatisticsPage extends React.Component {
	
	render() {
		/* this will require me to difine a shape on PropTypes  */
		
		const {  filters, allocatedTime, targets, proposals } = this.props;
		if(proposals.fetching){
			return(
				<div className='spinner'>
					<div className ='dot1'/>
					<div className='dot2'/>
				</div>
			)
		}
		if(!proposals.fetched){
			return(
				<div>
					<div className="error">
						<h1>Fail to get Data from API.</h1>
						<h1>API might be down</h1>
					</div>
				</div>
			)
		}
		return(
			<div>
				<Plot caption="Smoothed distribution of all targets on the sky.">
					<TargetDistributionContourMap targets={targets.targets}/>
				</Plot>
				<Plot caption="Distribution of mandatory targets <em>(squares)</em> and optional targets <em>(circles)</em> on the sky.">
					<TargetDistributionScatterPlot targets={targets.targets}/>
				</Plot>
				<RightAscensionDistribution targets={targets.targets}/>
				<DeclinationDistribution targets={targets.targets}/>
				<HrsModeDistribution
					proposals={proposals.proposals}
					semester={filters.selectedSemester}
					partner={filters.selectedPartner}
				/>
				<SalticamModeDistribution
					proposals={proposals.proposals}
					semester={filters.selectedSemester}
					partner={filters.selectedPartner}
				/>
				<RssModeDistribution
					proposals={proposals.proposals}
					semester={filters.selectedSemester}
					partner={filters.selectedPartner}
				/>
				<InstrumentDistribution
					proposals={proposals.proposals}
					semester={filters.selectedSemester}
					partner={filters.selectedPartner}
				/>
				<TotalTimeDistribution
					proposals={proposals.proposals}
					semester={filters.selectedSemester}
					partner={filters.selectedPartner}
				/>
				
				<TransparencyDistribution
					proposals={proposals.proposals}
					semester={filters.selectedSemester}
					partner={filters.selectedPartner}
				/>
				<StatTable
					proposals={ proposals.proposals }
					allocatedTime={ allocatedTime }
					semester={filters.selectedSemester}
					partner={filters.selectedPartner}
				/>
				<br />
				<br />
			</div>
		);
	}
}

export default connect(
	store => ({
		statistics: store.statistics,
		proposals: store.proposals,
		targets: store.targets,
		filters:store.filters,
		allocatedTime:store.tac.data,
	}), null
)(StatisticsPage) ;
