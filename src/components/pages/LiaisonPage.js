import React from "react";
import propTypes from "prop-types";
import LiaisonTable from '../tables/LiaisonTable'
import {downloadSummary, getLiaisonUsername} from '../../util';
import {reduceProposalsPerAstronomer} from '../../util/filters'
import {ADMINISTRATOR} from '../../types'
import {isLiaisonAstronomerUpdated} from '../../util/proposal-filtering'



const requestSummary = (event, proposalCode, semester) => {

  event.preventDefault();
  downloadSummary(proposalCode, semester)
}

const modifiedProposals = ( proposals, initial) => {
  return (proposals||[]).filter(p => isLiaisonAstronomerUpdated(p, initial))
}

function preventEvent(event) {
  event.preventDefault()
}

const LiaisonPage = ({proposals, filters, astronomers, user, setLiaison, initProposals, submitLiaisons}) => {
  const canAssign = (user.roles || [] ).some(r => r.type === ADMINISTRATOR)
  const semester = filters.selectedSemester
  const selectedSA = filters.selectedLiaison
  const saUser = selectedSA === "All" || selectedSA === "Not Assigned" || selectedSA === "Assigned" ?
    selectedSA : getLiaisonUsername(selectedSA, astronomers);
  const filteredProposals = reduceProposalsPerAstronomer(proposals || [], saUser, semester);
  const username = user.username
  return (
    <div>
      <LiaisonTable
        proposals={filteredProposals}
        initProposals={initProposals}
        canAssign={canAssign}
        username={username}
        selectArray={astronomers}
        setLiaison={setLiaison}
        semester={semester}
        requestSummary={requestSummary} />
      <button onClick={e => {
        preventEvent(e)
        submitLiaisons(modifiedProposals(proposals, initProposals))
      }}>Submit</button>
    </div>
)}

LiaisonPage.propTypes = {
  proposals: propTypes.array.isRequired,
  initProposals: propTypes.array.isRequired,
  astronomers: propTypes.array.isRequired,
  filters: propTypes.object.isRequired,
  user: propTypes.object.isRequired,
  setLiaison: propTypes.func.isRequired,
  submitLiaisons: propTypes.func.isRequired
};
export default LiaisonPage
