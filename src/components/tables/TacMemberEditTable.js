import React from 'react'
import propTypes from 'prop-types'
import Select from 'react-select'
import { ALL_PARTNER } from '../../types'
import { compareByFirstName } from '../../util/salt-astronomer'

const TacMemberEditTable = ({ newMembers,  removedMembers, tacMembers, addMember, removeMember, saltUsers, partners, saveMembers, makeChair }) => {
  const saltUsersList = ( saltUsers || [] ).map( u => ({ value: u, label: `${ u.surname } ${ u.name }` }))
  return(
    <div>
      { (partners || [] ).filter(f => !(f === ALL_PARTNER || f === 'OTH')).map( (p, i) => (
        <div className='stat-item' key={ `${ i }a` }>
          <h2>{p}</h2>
          <table className='admin-table'>
            <thead>
              <tr>
                <th>Surname</th>
                <th>Name</th>
                <th>Is chair</th>
                <th/>
              </tr>
            </thead>
            <tbody>
            {
              (tacMembers[p] || []).map((m, b) => (
                <tr key={ `${b}b` }>
                  <td>{m.surname}</td>
                  <td>{m.name}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={ m.isTacChair }
                      onChange={ e => {
                        makeChair(m, p, e.target.checked)
                      }
                      }
                    />
                    { m.isTacChair ? 'Remove As Chair' : 'Make Chair' }

                  </td>
                  <td>
                    {
                      <button onClick={ () => removeMember(m, p) }>- Remove</button>
                    }
                  </td>
                </tr>))
            }
            <tr>
              { (newMembers[p] || []).length > 0 && <th colSpan={4}>New or Updated Members</th>}
            </tr>
            {
              (newMembers[p] || []).sort(compareByFirstName).map((m, c) => (
                <tr key={ `${c}c` } className="new-tac-row">
                  <td>{ m.surname }</td>
                  <td>{ m.name }</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={ m.isTacChair }
                      onChange={ e => {
                        makeChair(m, p, e.target.checked)
                      }
                      }
                    /> { m.isTacChair ? 'Remove As Chair' : 'Make Chair' }</td>
                  <td>
                    <button onClick={ () => removeMember(m, p) }>- Remove</button>
                  </td>
                </tr>))
            }
            <tr>
              { (removedMembers[p] || []).length > 0 && <th colSpan={4}>Members to Remove</th> }
            </tr>
            {
              (
                removedMembers[p] || []).sort(compareByFirstName).map((m, c) => (
                  <tr key={`${c}c`} className="removed-tac-row">
                    <td>{ m.surname }</td>
                    <td>{ m.name }</td>
                    <td>{ m.isTacChair ? 'True' : 'False' }</td>
                    <td>{ <button onClick={() => addMember(m, p) }>+ Add</button> }</td>
                    <td/>
                  </tr>
                )
              )
            }
            <tr key="newValue">
              <td colSpan="5">
                <Select
                  className="full-width"
                  options={ saltUsersList }
                  clearable={ false }
                  focusedOption="value"
                  onChange={ event => addMember(event.value, p) }
                />
              </td>
            </tr>
            </tbody>
          </table>
          <button onClick={ () => saveMembers(p) }>save</button>
        </div>))
      }
    </div>)
}

TacMemberEditTable.propTypes = {
  newMembers: propTypes.object.isRequired,
  removedMembers: propTypes.object.isRequired,
  tacMembers: propTypes.object.isRequired,
  saveMembers: propTypes.func.isRequired,
  saltUsers: propTypes.array.isRequired,
  addMember: propTypes.func.isRequired,
  removeMember: propTypes.func.isRequired,
  partners: propTypes.array.isRequired,
  makeChair: propTypes.func.isRequired
}

export default TacMemberEditTable
