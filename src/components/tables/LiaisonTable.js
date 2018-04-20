import React from 'react';
import propTypes from "prop-types";
import '../../styles/components/tables.css';
import {getSaltAstronomerName, getSaltAstronomerUsername} from '../../util/salt-astronomer';
import {compareByProposalCode} from '../../util/proposal'
import {isLiaisonAstronomerUpdated} from '../../util/proposal-filtering'

const getEventValue = (event, astronomers) => {
  event.preventDefault()
  if (event.target.name === 'select') return getSaltAstronomerUsername(event.target.value, astronomers)
  return event.target.value
}

const LiaisonTable = ({proposals, canAssign, selectArray, requestSummary, username, setLiaison, initProposals, semester}) => (
  <div className='SATableDiv'>
    <h1>Salt Astronomers Liaison Assigning</h1>
    <table className='SATable' align='center'>
      <thead>
      <tr>
        <th>Proposal Code</th>
        <th>Summary</th>
        <th>Proposal Title</th>
        <th>Proposal Investigator</th>
        <th>Liaison Astronomer</th>
      </tr>
      </thead>
      <tbody>
      {
        proposals.sort(compareByProposalCode).map(p => {
          const liaison = getSaltAstronomerName(p.liaisonAstronomer, selectArray)
          const col = isLiaisonAstronomerUpdated(p, initProposals) ? {color: 'blue'} : {color: 'black'}
          return ( <tr key={`liaison-${p.proposalCode}`}>
          <td>
            <a target="_blank"
               href={`https://www.salt.ac.za/wm/proposal/${p.proposalCode}`}>
              {p.proposalCode}
            </a>
          </td>
          <td className="width-100">
            <a className="file-download"
               href=""
               onClick={e => requestSummary(e, p.proposalCode, semester)}>
              Download
            </a>
          </td>
          <td className=" table-height width-400">{p.title}</td>
          <td className="width-100">{p.pi}</td>
          {
            canAssign ?
              <td>
                <select style={col} defaultValue={liaison} onChange={
                  e => setLiaison(getEventValue(e, selectArray), p.proposalCode, true)
                } name={'selector'}>
                  {
                    !liaison && <option>none</option>
                  }
                  {
                    selectArray.map(op => (
                      <option key={op.username} value={op.name} name={op.username}>
                        {op.name}
                      </option>
                    ))
                  }

                </select>
              </td> :
              <td>
                {
                  <div>
                    <input
                      checked={p.liaisonAstronomer}
                      disabled={initProposals.filter(
                        ip => ip.proposalCode === p.proposalCode)[0].liaisonAstronomer
                      }
                      type={"checkbox"}
                      value={ username }
                      onChange={e => setLiaison(getEventValue(e, selectArray), p.proposalCode, e.target.checked)}/>
                    { p.liaisonAstronomer ?
                      <a style={col}> {liaison} </a>: <a style={{color: 'red'}}>{'Select'}</a>}
                  </div>
                }
              </td>
          }

        </tr>)})
      }

      </tbody>
    </table>
  </div>
  )

LiaisonTable.propTypes = {
  proposals: propTypes.array.isRequired,
  initProposals: propTypes.array.isRequired,
  canAssign: propTypes.bool.isRequired,
  selectArray: propTypes.array.isRequired,
  username: propTypes.string.isRequired,
  requestSummary: propTypes.func.isRequired,  // todo request summary should know the current selected semester
  setLiaison: propTypes.func.isRequired,
  semester: propTypes.string.isRequired
};
export default LiaisonTable
