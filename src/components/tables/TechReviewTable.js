import React from 'react';
import propTypes from "prop-types";
import { canDo, astronomerAssigned, getLiaisonName } from '../../util/index';
import { CHANGE_LIAISON, SELF_ASSIGN_TO_PROPOSAL } from "../../types";
import { getAstronomersList, reduceProposals } from '../../util/filters'
import DropDown from "./DropDown"

export const SATable = ({proposals, user, SALTAstronomers, technicalCommentChange, techAssignAstronomer, assignedAstronomerChange, proposalsFilter}) => {
  if (!user.roles || !proposals || proposals.length === 0 ){
    return (<div><h1>Loading</h1></div>)
  }

  if (proposals.length === 0 ){
    return (<br />)
  }
  const reducedProposals = proposalsFilter === "All" ? proposals : reduceProposals(proposals, proposalsFilter)
  const AstronomersList = ["Not Assigned"].concat(getAstronomersList(SALTAstronomers))

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
             reducedProposals.map( p => {
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
                          technicalCommentChange(p.proposalCode, e.target.value)
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
                                value={p.SALTAstronomer}
                                onChange={e =>{
                                    techAssignAstronomer(p.proposalCode, user.username)
                                  }
                                }
                              /> Assign Yourself
                            </div>
                          : <span>{p.liaisonAstronomer}</span>)
                        : <DropDown
                              listToDisplay={AstronomersList}
                              value={getLiaisonName(p.liaisonAstronomer, SALTAstronomers) ||"Not Assigned"}
                              className={"left"}
                              OnChange={e => assignedAstronomerChange(p.proposalCode, e)}/>
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
    technicalCommentChange: propTypes.func.isRequired,
    proposalsFilter: propTypes.string
  }
