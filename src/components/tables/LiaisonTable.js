import React from 'react';
import propTypes from "prop-types";
import '../../styles/components/tables.css';
import {getSaltAstronomerName} from "../../util/salt-astronomer";

const LiaisonTable = ({proposals, canAssign, selectArray, requestSummary}) => (
  <div className='SATableDiv'>
    <h1>Salt Astronomers Proposal Assigning</h1>
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
        proposals.map(p => {
          const liaison = getSaltAstronomerName(p.liaisonAstronomer, selectArray)
          return ( <tr key={p.proposalId}>
          <td>
            <a target="_blank"
               href={`https://www.salt.ac.za/wm/proposal/${p.proposalCode}`}>
              {p.proposalCode}
            </a>
          </td>
          <td className="width-100">
            <a className="file-download"
               href=""
               onClick={() => requestSummary(p.proposalCode)}>
              Download
            </a>
          </td>
          <td className=" table-height width-400">{p.title}</td>
          <td className="width-100">{p.pi}</td>
          {
            canAssign ?
              <td>
                <select defaultValue={liaison}>
                  {
                    !liaison && <option>none</option>
                  }
                  {
                    selectArray.map(op => (
                      <option key={op.username} value={op.name}>
                        { op.name}
                      </option>
                    ))
                  }

                </select>
              </td> :
              <td>!liaison && <option>none</option></td>
          }

        </tr>)})
      }

      </tbody>
    </table>
  </div>
  )

LiaisonTable.propTypes = {
  proposals: propTypes.array.isRequired,
  canAssign: propTypes.bool.isRequired,
  selectArray: propTypes.array.isRequired,
  requestSummary: propTypes.func.isRequired // todo request summary should know the current selected semester
};
export default LiaisonTable
