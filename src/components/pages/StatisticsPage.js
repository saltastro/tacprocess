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
    // eslint-disable-next-line
    const { statistics, selectors } = this.props
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
              <TargetDistributionContourMap targets={statistics.data.targets}/>
          </Plot>
          <Plot caption="Distribution of mandatory targets <em>(squares)</em> and optional targets <em>(circles)</em> on the sky.">
              <TargetDistributionScatterPlot targets={statistics.data.targets}/>
          </Plot>
          <RightAscensionDistribution targets={statistics.data.targets}/>
          <DeclinationDistribution targets={statistics.data.targets}/>
          <HrsModeDistribution
                  proposals={statistics.data.proposals}
                  semester={selectors.selectedSemester}
                  partner={selectors.selectedPartner}
          />
          <SalticamModeDistribution
                  proposals={statistics.data.proposals}
                  semester={selectors.selectedSemester}
                  partner={selectors.selectedPartner}
          />
          <RssModeDistribution
                  proposals={statistics.data.proposals}
                  semester={selectors.selectedSemester}
                  partner={selectors.selectedPartner}
          />
          <InstrumentDistribution
                  proposals={statistics.data.proposals}
                  semester={selectors.selectedSemester}
                  partner={selectors.selectedPartner}
          />
          <TotalTimeDistribution
                  proposals={statistics.data.proposals}
                  semester={selectors.selectedSemester}
                  partner={selectors.selectedPartner}
          />

          <TransparencyDistribution
                  proposals={statistics.data.proposals}
                  semester={selectors.selectedSemester}
                  partner={selectors.selectedPartner}
          />
        <StatTable
          proposals = { statistics.data.proposals }
          targets = { statistics.data.targets }
        />
        <br />
        <br />
      </div>
      );
    }
  }



export default connect(
  store => ({statistics: store.statistics, selectors:store.selectors}),null
)(StatisticsPage) ;
