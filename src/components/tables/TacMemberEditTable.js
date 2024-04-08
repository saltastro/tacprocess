import React from 'react'
import propTypes from 'prop-types'
import Select from 'react-select'
import { ALL_PARTNER } from '../../types'
import { compareByAttribute } from '../../util/filters'

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
              (tacMembers[ p ] || []).sort(compareByAttribute("surname")).map((m) => (
                <tr key={ `${m.surname + m.name }` }>
                  <td>{ m.surname }</td>
                  <td>{ m.name }</td>
                  <td>
                    <input
                      id={ `isChair_${ m.surname + m.name }` }
                      type='checkbox'
                      checked={ m.isTacChair }
                      onChange={ e => {
                        makeChair(m, p, e.target.checked)
                      }
                      }
                    />
                    <label htmlFor={ `isChair_${ m.surname + m.name }` }>Is a TAC Chair</label>

                  </td>
                  <td>
                    {
                      <button onClick={ () => removeMember(m, p) }>- Remove</button>
                    }
                  </td>
                </tr>))
            }
            {
              (newMembers[ p ] || []).length > 0 && <tr>
                <th colSpan={ 4 }>Members to Add or Update</th>
              </tr>}
            {
              (newMembers[ p ] || []).sort(compareByAttribute("surname")).map((m) => (
                <tr key={ `${ m.surname + m.name }` } className='new-tac-row'>
                  <td>{ m.surname }</td>
                  <td>{ m.name }</td>
                  <td>
                    <input
                      id={ `isNewChair_${ m.surname + m.name }` }
                      type='checkbox'
                      checked={ m.isTacChair }
                      onChange={
                        e => {
                          makeChair(m, p, e.target.checked)
                        }
                      }
                    /> <label htmlFor={ `isNewChair_${ m.surname + m.name }` }>Is a TAC Chair</label></td>
                  <td>
                  <button onClick={ () => removeMember(m, p) }>- Remove</button>
                  </td>
                </tr>))
            }
            {
              (removedMembers[ p ] || []).length > 0 && <tr>
                 <th colSpan={ 4 }>Members to Remove</th>
              </tr>
            }
            {
              (
                removedMembers[ p ] || []).sort(compareByAttribute("surname")).map((m) => (
                  <tr key={ `${ m.surname + m.name }` } className='removed-tac-row'>
                    <td>{ m.surname }</td>
                    <td>{ m.name }</td>
                    <td>{ m.isTacChair ? 'True' : 'False' }</td>
                    <td>{ <button onClick={ () => addMember(m, p) }>+ Add</button> }</td>
                    <td/>
                  </tr>
                )
              )
            }
            <tr key='newValue'>
              <td colSpan='5'>
                <Select
                  className='full-width'
                  options={ saltUsersList }
                  clearable={ false }
                  focusedOption='value'
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
