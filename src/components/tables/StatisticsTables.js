import React from "react";
import propTypes from "prop-types";
import ObservingStatisticsSeeing from "./statisticsTables/ObservingStatisticsSeeing";
import ObservingStatisticsTransparency from "./statisticsTables/ObservingStatisticsTransparacy";
import HRSStatistics from "./statisticsTables/HRSStatistics";
import SALTICAMStatistics from "./statisticsTables/SALTICAMStatistics";
import RSSDetectorModeTable from "./statisticsTables/RSSDetectorModeTable";
import RSSObservingModeTable from "./statisticsTables/RSSObservingModeTable";
import ConfigurationsStatistics from "./statisticsTables/ConfigurationStatistics";

const StatisticsTables = ({proposals, partner}) => {
    return(
        <div>
	        <div className={"stat-wrapper"}>
		        <ObservingStatisticsSeeing
			        proposals={proposals}
			        partner={partner}
		        />
		        <ObservingStatisticsTransparency
			        proposals={proposals}
			        partner={partner}
		        />
	        </div>
	        <div className={"stat-wrapper"}>
	            <ConfigurationsStatistics proposals={proposals}/>
	        </div>
	        <div  className={"stat-wrapper"}>
		        <RSSDetectorModeTable proposals={proposals}/>
		        <RSSObservingModeTable proposals={proposals}/>
	        </div>
	        <div  className={"stat-wrapper"}>
		        <HRSStatistics proposals={proposals}/>
		        <SALTICAMStatistics proposals={proposals}/>
	        </div>
	        
	        
        </div>
    )
};

StatisticsTables.propTypes = {
    proposals: propTypes.array.isRequired,
    partner: propTypes.string.isRequired,
};

export default StatisticsTables;