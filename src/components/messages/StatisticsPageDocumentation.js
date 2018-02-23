import React from "react";

const StatisticsPageDocumentation = () => {
	return(
		<div  className={"doc-div"}>
			<h2>Statistics page</h2>
			<ul className={"doc"}>
				<li>Science time available for that partner, not including oversubscription.  Science time is divided as 40% P1, 40% P2, and 20% P3.</li>
				<li>Allocation time available for that partner defined as the total amount of time for the partner to allocate.   Allocation time is calculated as P1+ P2+3*P3.</li>
				<li>Total Time requested defined as the total time requested from that partner for all submitted proposals.  This excludes P4 requests.</li>
				<li>Oversubscription rate  defined as Time requested / Science time available</li>
				<li>Average request per proposal for the partner in hours defined as the total time requested divided by the number of proposals</li>
				<li>Number of thesis projects is defined as the total number of thesis projects associated with the submitted proposals</li>
				<li>Number of P4 proposals</li>
			</ul>
			<br/>
		</div>
	)
};

export default StatisticsPageDocumentation;