import React from 'react';
import propTypes from "prop-types";
import LiaisonSelector from '../../selectors/LiaisonSelector'

const LiaisonTableRow = ({proposal, initProposals, requestSummary, semester, setLiaison, astronomers, username, canAssign}) => (
    <tr key={`liaison-${proposal.proposalCode}`}>
      <td>
        <a target="_blank"
           href={`https://www.salt.ac.za/wm/proposal/${proposal.proposalCode}`}>
          {proposal.proposalCode}
        </a>
      </td>
      <td className="width-100">
        <a className="file-download"
           href=""
           onClick={e => requestSummary(e, proposal.proposalCode, semester)}>
          Download
        </a>
      </td>
      <td className=" table-height width-400">{proposal.title}</td>
      <td className="width-100">{proposal.pi}</td>
      <LiaisonSelector
        proposal={proposal}
        astronomers={astronomers}
        setLiaison={setLiaison}
        initProposals={initProposals}
        username={username}
        canAssign={canAssign}/>
    </tr>
)

LiaisonTableRow.propTypes = {
  proposal: propTypes.object.isRequired,
  initProposals: propTypes.array.isRequired,
  canAssign: propTypes.bool.isRequired,
  astronomers: propTypes.array.isRequired,
  username: propTypes.string.isRequired,
  requestSummary: propTypes.func.isRequired,
  setLiaison: propTypes.func.isRequired,
  semester: propTypes.string.isRequired
};
export default LiaisonTableRow