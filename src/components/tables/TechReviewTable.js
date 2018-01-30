import React from 'react';
import propTypes from "prop-types";
import '../../styles/components/tables.css';
import { canDo, astronomerAssigned, makeTechComment, addDetailedCheckToTechComment, getTechReportFields } from '../../util/index';
import { CHANGE_LIAISON, SELF_ASSIGN_TO_PROPOSAL } from "../../types";
import {addCommentToTechComment} from "../../util";

const feasibleChange = (e, reportFields) => {
    reportFields.feasible = e.target.value;
	return makeTechComment(reportFields);
};
const detailsCheckChange  = (e, reportFields) => {
	reportFields.details = e.target.value;
	return makeTechComment(reportFields);
};
const commentChange  = (e, reportFields) => {
	reportFields.comment = e.target.value;
	return makeTechComment(reportFields);
};

export const SATable = ({proposals, user, SALTAstronomers, techReportChange, techAssignAstronomer, proposalsFilter}) => {
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
            <th>Proposal Code</th>
            <th>Proposal Title</th>
            <th>Proposal Investigator</th>
              <th>Feasible</th>
            <th>Proposal Comment</th>
              <th>Detailed check</th>
            <th>Assigned Astronomer</th>
          </tr>
        </thead>
        <tbody>
          {
             proposals.map( p => {
	             const reportFields = getTechReportFields(p.techReport);
	             console.log(">>: ", reportFields);
               return(
                 <tr key={p.proposalId}>
                   <td className="width-150">{ p.proposalCode }</td>
                   <td className=" table-height width-400">{ p.title }</td>
                   <td className="width-100">{p.pi}</td>
	                 <td >
		                 <select defaultValue={reportFields.feasible} onChange={e => techReportChange(p.proposalCode, feasibleChange(e, reportFields))}>
			                 <option>{"none"}</option>
			                 <option>{"yes"}</option>
			                 <option>{"yes with caveats"}</option>
			                 <option>{"no"}</option>
		                 </select>
	                 </td>
                     <td>
                    <textarea
	                    className="table-height-fixed width-400"
                        value={ reportFields.comment  || "" }
                      onChange={ e =>{
                          techReportChange(p.proposalCode, commentChange(e, reportFields))
                        }
                      }
                    >

                    </textarea>
                   </td>
	                 <td className="width-100">
		                 <select defaultValue={reportFields.details}  onChange={e => techReportChange(p.proposalCode, detailsCheckChange(e, reportFields))}>
                             <option>{"none"}</option>
                             <option>{"yes"}</option>
                             <option>{"no"}</option>
                         </select>
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
    techReportChange: propTypes.func.isRequired,
    proposalsFilter: propTypes.string

  }
