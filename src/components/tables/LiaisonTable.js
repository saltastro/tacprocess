import React from 'react';
import propTypes from "prop-types";
import '../../styles/components/tables.css';
import {getSaltAstronomerName} from "../../util/salt-astronomer";
import {compareByProposalCode} from '../../util/proposal'
import {isLiaisonAstronomer, isLiaisonAstronomerChanged} from '../../util/proposal-changes'

const LiaisonTable = ({proposals, canAssign, selectArray, requestSummary, username, setLiaison, initProposals}) => (
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
          const col = isLiaisonAstronomerChanged(p, initProposals) ? {color: 'black'} : {color: 'blue'}
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
               onClick={e => requestSummary(e, p.proposalCode)}>
              Download
            </a>
          </td>
          <td className=" table-height width-400">{p.title}</td>
          <td className="width-100">{p.pi}</td>
          {
            canAssign ?
              <td>
                <select style={col} defaultValue={liaison} onChange={e => setLiaison(e, p.proposalCode)} name={'selector'}>
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
                      checked={isLiaisonAstronomer(p.proposalCode, proposals)}
                      disabled={isLiaisonAstronomer(p.proposalCode, initProposals)}
                      type={"checkbox"}
                      value={ username }
                      onChange={e => setLiaison(e, p.proposalCode)}/>
                    { isLiaisonAstronomer(p.proposalCode, proposals) ?
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
  setLiaison: propTypes.func.isRequired
};
export default LiaisonTable
