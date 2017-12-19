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

    const { statistics, filters, allocatedTime, targets, proposals } = this.props
    if(statistics.fetching){
      return(
        <div>
          <h2>Loading...</h2>
        </div>
      )
    }
    if(!statistics.fetched){
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
                  proposals={statistics.data.proposals}
                  semester={filters.selectedSemester}
                  partner={filters.selectedPartner}
          />
          <SalticamModeDistribution
                  proposals={statistics.data.proposals}
                  semester={filters.selectedSemester}
                  partner={filters.selectedPartner}
          />
          <RssModeDistribution
                  proposals={statistics.data.proposals}
                  semester={filters.selectedSemester}
                  partner={filters.selectedPartner}
          />
          <InstrumentDistribution
                  proposals={statistics.data.proposals}
                  semester={filters.selectedSemester}
                  partner={filters.selectedPartner}
          />
          <TotalTimeDistribution
                  proposals={statistics.data.proposals}
                  semester={filters.selectedSemester}
                  partner={filters.selectedPartner}
          />

          <TransparencyDistribution
                  proposals={statistics.data.proposals}
                  semester={filters.selectedSemester}
                  partner={filters.selectedPartner}
          />
        <StatTable
            proposals={ statistics.data.proposals }
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
