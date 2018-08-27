import React from 'react'

const AllocationPageDocumentation = () => (
  <div className='doc-div'>
    <h2>Time Allocation Page</h2>
    <p>The proposal table contains details of each proposal, including the title, abstract, PI, time request, observing conditions and comment from the AstroOps team on technical feasibility. The TAC Chairs are able to fill out columns for the time to allocate in each priority (P0, P1, P2, P3) and a TAC comment. Other TAC members are able to view the table.</p>
    <p>The proposal code in the table links to the entry for the proposal in the web manager. There is a Download column to download the summary of the proposal. This includes the progress report for multi-semester proposals.</p>
    <p>The table can be downloaded as a csv, used as a spreadsheet for example, and then re-uploaded to the system to update all the columns. A tarball containing all the proposal summaries can be downloaded using the button at the bottom of the table.</p>
    <p>
      <strong>Some things to note:</strong>
      <ul className='doc'>
        <li>After changes are made (either directly in the table or uploaded) they must be submitted using the button at the bottom of the table for the changes to be saved.</li>
        <li>The csv file can be edited with excel or google sheets. Please be cautious when editing it in a text editor that might change text formats automatically, making it difficult to distinguish columns when re-uploaded.</li>
        <li>Please do not change the existing column names in the csv file; new columns can be added, however (these will be ignored by the web table).</li>
      </ul>
    </p>
    <br/>
  </div>
)

export default AllocationPageDocumentation