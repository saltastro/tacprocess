import React from 'react';
import { canDo, astronomerAssigned } from '../../util/index';
import { CHANGE_LIAISON, SELF_ASSIGN_TO_PROPOSAL } from "../../types";
import propTypes from "prop-types";
import '../../styles/components/tables.css';

export const SATable = ({proposals, user, SALTAstronomers, techReportChange, techAssignAstronomer}) => {
  if (!user.roles || !proposals || proposals.length === 0 ){
    return (<div><h1>Loading</h1></div>)
  }

  if (proposals.length === 0 ){
    return (<br />)
  }

    // compare astronomers by their first name
    const compareByFirstName = (a, b) => {
        const name1 = a.name.toUpperCase();
        const name2 = b.name.toUpperCase();
        if (name1 < name2) {
            return -1;
        }
        if (name1 > name2) {
            return 1;
        }
        return 0;
    };

    const saltAstronomerName = (username) => SALTAstronomers.find(a => a.username === username).name;

  return(
    <div className='SATableDiv'>
      <h1>Salt Astronomers Proposal Assigning</h1>
      <table className='SATable' align='center'>
        <thead>
          <tr>
            <th>Proposal ID</th>
            <th>Proposal Code</th>
            <th>Proposal Title</th>
            <th>Proposal Investigator</th>
            <th>Proposal Comment</th>
            <th>Assigned Astronomer</th>
          </tr>
        </thead>
        <tbody>
          {
             proposals.map( p => {
               return(
                 <tr key={p.proposalId}>
                   <td>{p.proposalId}</td>
                   <td>{ p.proposalCode }</td>
                   <td>{ p.title }</td>
                   <td>{p.pi}</td>
                   <td>
                    <textarea
                      value={ p.techReport }
                      onChange={ e =>{
                          techReportChange(p.proposalCode, e.target.value)
                        }
                      }
                    >

                    </textarea>
                   </td>
                   <td>
                     {
                       canDo(user, CHANGE_LIAISON) ?
                        (canDo(user, SELF_ASSIGN_TO_PROPOSAL) && astronomerAssigned(p) ?
                            <div>
                              <input
                                type="checkbox"
                                onChange={e =>{
                                    techAssignAstronomer(p.proposalCode, user.username)
                                  }
                                }
                              /> Assign Yourself
                            </div>
                          : <span>{saltAstronomerName(p.liaisonAstronomer)}</span>)
                        : <select
                               value={p.liaisonAstronomer ? p.liaisonAstronomer : ''}
                            onChange={e => {
                                techAssignAstronomer(p.proposalCode, e.target.value ? e.target.value : null)
                              }
                            }
                          >
                                   <option value="">None</option>
                                   {
                                SALTAstronomers.sort(compareByFirstName).map(astronomer => (
                                <option
                                  key={astronomer.username}
                                  value={astronomer.username}
                                >
                                  {saltAstronomerName(astronomer.username)}
                                </option>
                              ))
                            }
                          </select>
                     }
                   </td>
                 </tr>
               );})
            }
        </tbody>
      </table>
    </div>
  );}

  SATable.propTypes = {
    proposals: propTypes.array.isRequired,
    user: propTypes.object.isRequired,
    SALTAstronomers: propTypes.array.isRequired,
    techAssignAstronomer: propTypes.func.isRequired,
    techReportChange: propTypes.func.isRequired
  }
