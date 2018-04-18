import React from "react";
import propTypes from "prop-types";
import LiaisonTable from '../tables/LiaisonTable'
import {downloadSummary, getLiaisonUsername} from '../../util';
import {reduceProposalsPerAstronomer} from '../../util/filters'
import {ADMINISTRATOR} from '../../types'



const requestSummary = (event, proposalCode) => {
  event.preventDefault();
  downloadSummary(proposalCode, this.props.selectedSemester)
}

const LiaisonPage = ({proposals, filters, astronomers, user, setLiaison, initProposals}) => {
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
        requestSummary={requestSummary} />
      <button>Submit</button>
    </div>
)}

LiaisonPage.propTypes = {
  proposals: propTypes.array.isRequired,
  initProposals: propTypes.array.isRequired,
  astronomers: propTypes.array.isRequired,
  filters: propTypes.object.isRequired,
  user: propTypes.object.isRequired,
  setLiaison: propTypes.func.isRequired,
};
export default LiaisonPage