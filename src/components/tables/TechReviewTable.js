import React from 'react';
import propTypes from "prop-types";
import { canDo, astronomerAssigned } from '../../util/index';
import { CHANGE_LIAISON, SELF_ASSIGN_TO_PROPOSAL } from "../../types";
import DropDown from "./DropDown"

export const SATable = ({proposals, user, SALTAstronomers, techReportChange, techAssignAstronomer, assignedAstronomerChange}) => {
  if (!user.roles || !proposals || proposals.length === 0 ){
    return (<div><h1>Loading</h1></div>)
  }

  if (proposals.length === 0 ){
    return (<br />)
  }

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
                                value={p.SALTAstronomer.name}
                                onChange={e =>{
                                    techAssignAstronomer(p.proposalCode, user.username)
                                  }
                                }
                              /> Assign Yourself
                            </div>
                          : <span>{p.SALTAstronomer.name}</span>)
                        : <DropDown
                              listToDisplay={SALTAstronomers}
                              value={"Not Assigned"}
                              className={"left"}
                              OnChange={e => assignedAstronomerChange(p.proposalCode, e.value)}/>
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
    assignedAstronomerChange: propTypes.func.isRequired,
    techReportChange: propTypes.func.isRequired
  }
