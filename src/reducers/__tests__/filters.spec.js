import selectors from './filters'
import { defaultSemester } from '../util'

describe('Selectors Reducers Testing', () => {
  const initialState = {
    fetching: false,
    error: false,
    selectedSemester: defaultSemester(),
    selectedLiaison: 'All',
  }

  let state = {}

  it('Should test the FETCH_SELECTOR_DATA_START reducer', () => {
    state = selectors(state = initialState, {type:'FETCH_SELECTOR_DATA_START'})
    expect(state).toEqual({...state, fetching:true})
  })

  it('Should test the FETCH_SELECTOR_DATA_PASS reducer', () => {
    state = selectors(state = initialState, {type:'FETCH_SELECTOR_DATA_PASS', filters: false})
    expect(state).toEqual({...state, fetching: false, filters: false})
  })

  it('Should test the FETCH_SELECTOR_DATA_FAIL reducer', () => {
    state = selectors(state = initialState, {type:'FETCH_SELECTOR_DATA_FAIL', payload: {error: 'Failed to fetch selector data'}})
    expect(state).toEqual({...state, error:'Failed to fetch selector data'})
  })

  it('Should test the SEMESTER_CHANGE reducer', () => {
    state = selectors(state = initialState, {type:'SEMESTER_CHANGE', filters: '2018-1'})
    expect(state).toEqual({...state, selectedSemester: '2018-1'})
  })

  it('Should test the PARTNER_CHANGE reducer', () => {
    state = selectors(state = initialState, {type:'PARTNER_CHANGE', changeTo: 'RSA'})
    expect(state).toEqual({...state, selectedPartner: 'RSA'})
  })

  it('Should test the ASTRONOMER_CHANGE reducer', () => {
    state = selectors(state = initialState, {type:'ASTRONOMER_CHANGE', current: 'Brent'})
    expect(state).toEqual({...state, selectedLiaison: 'Brent'})
  })

  it('Should test the USER_LOGGED_OUT reducer', () => {
    state = selectors(state = initialState, {type:'USER_LOGGED_OUT'})
    expect(state).toEqual({...state})
  })

})
