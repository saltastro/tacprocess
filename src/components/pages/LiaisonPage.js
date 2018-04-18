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

const LiaisonPage = ({proposals, filters, astronomers, user}) => {
  const canAssign = (user.roles || [] ).some(r => r.type === ADMINISTRATOR)
  const semester = filters.selectedSemester
  const selectedSA = filters.selectedLiaison
  const saUser = selectedSA === "All" || selectedSA === "Not Assigned" || selectedSA === "Assigned" ?
    selectedSA : getLiaisonUsername(selectedSA, astronomers);
  const filteredProposals = reduceProposalsPerAstronomer(proposals || [], saUser, semester);
  return (
    <div>
      <h1> Liaison page</h1>
      <LiaisonTable
        proposals={filteredProposals}
        canAssign={canAssign}
        username={"this guy"}
        selectArray={astronomers}
        requestSummary={requestSummary} />
      <button>Submit</button>
    </div>
)}

LiaisonPage.propTypes = {
  proposals: propTypes.array.isRequired,
  initProposals: propTypes.array.isRequired,
  astronomers: propTypes.array.isRequired,
  filters: propTypes.array.isRequired,
  user: propTypes.array.isRequired,
};
export default LiaisonPage