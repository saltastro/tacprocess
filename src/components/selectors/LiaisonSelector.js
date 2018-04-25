import React from 'react';
import propTypes from "prop-types";
import {getSaltAstronomerName, getSaltAstronomerUsername, hasLiaison} from '../../util/salt-astronomer'
import {isLiaisonAstronomerUpdated} from '../../util/proposal-filtering'

const getEventValue = (event, astronomers) => {
  event.preventDefault()
  if (event.target.name === 'selector') {
    if (event.target.value === 'none' ) return null
    return getSaltAstronomerUsername(event.target.value, astronomers)
  }
  if (event.target.checked) return event.target.value
  return null
}

const LiaisonSelector = ({proposal, astronomers, setLiaison, initProposals, inputValue, canAssign}) => {
  const col = isLiaisonAstronomerUpdated(proposal, initProposals) ? {color: 'blue'} : {color: 'black'}
  const liaison = getSaltAstronomerName(proposal.liaisonAstronomer, astronomers)
  return (
    <td>
      {
        canAssign ?
          <select className={'setLiaison'} style={col} defaultValue={liaison} onChange={
            e => setLiaison(getEventValue(e, astronomers), proposal.proposalCode)
          } name={'selector'}>
            {
              !hasLiaison(proposal.proposalCode, initProposals) && <option value={'none'}>none</option>
            }
            {
              astronomers.map(op => (
                <option key={op.username} value={op.name} name={op.username}>
                  {op.name}
                </option>
              ))
            }
          </select> :
          <div>
            <input
              className={'saAssign'}
              checked={proposal.liaisonAstronomer}
              disabled={ hasLiaison(proposal.proposalCode, initProposals)}
              type={'checkbox'}
              value={ inputValue }
              onChange={e => setLiaison(getEventValue(e, astronomers), proposal.proposalCode)}/>
            { proposal.liaisonAstronomer ?
              <a style={col}> {liaison} </a>: <a style={{color: 'red'}}>{'Select'}</a>}
          </div>
      }
    </td>
)}

LiaisonSelector.propTypes = {
  proposal: propTypes.object.isRequired,
  astronomers: propTypes.array.isRequired,
  setLiaison: propTypes.func.isRequired,
  initProposals: propTypes.array.isRequired,
  inputValue: propTypes.string.isRequired,
  canAssign: propTypes.bool.isRequired
};
export default LiaisonSelector