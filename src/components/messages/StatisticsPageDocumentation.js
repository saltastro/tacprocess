import React from 'react'

const StatisticsPageDocumentation = () => (

  <div  className='doc-div'>
    <h2>Statistics page</h2>
    <p>
      <ul className='doc'>
        <li>Science time available for that partner in hours, not including oversubscription. Science time is divided as 40% P1, 40% P2, and 20% P3.</li><br/>
        <li>Allocation time available for that partner in hours defined as the total amount of time for the partner to allocate. Allocation time is calculated as P1+ P2+3*P3.</li><br/>
        <li>Total Time requested defined as the total time requested from that partner for all submitted proposals in hours. This excludes P4 proposal requests.</li><br/>
        <li>Oversubscription rate defined as Time requested / Science time available.</li><br/>
        <li>Average request per proposal for the partner in hours defined as the total time requested divided by the number of proposals.</li><br/>
        <li>Number of thesis projects is defined as the total number of thesis projects associated with the submitted proposals.</li><br/>
        <li>Number of P4 proposals.</li><br/>
      </ul>
    </p>
    <p>Plots are provided showing the distribution of mandatory and optional targets on the sky. Histograms and tables describe the split between different instruments, instrument modes and requested observing conditions.</p>
  </div>
)

export default StatisticsPageDocumentation