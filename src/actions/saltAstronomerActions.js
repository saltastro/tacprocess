import { querySALTAstronomers } from '../api/graphQL'
import {
  FETCH_SA_START,
  FETCH_SA_PASS,
  FETCH_SA_FAIL
} from '../types'

function startFetchSA() {
  return (
    {
      type: FETCH_SA_START
    }
  )

}
function fetchSAFail(error) {
  return (
    {
      type: FETCH_SA_FAIL,
      payload: { error }
    }
  )
}

export function fetchSAPass(sa) {
  return (
    {
      type: FETCH_SA_PASS,
      payload: sa
    }
  )
}

export function convertSA(sa){
  return sa.saltAstronomers.map(ast => (
    {
      name: ast.firstName,
      username: ast.username,
      surname: ast.lastName
    }
  ))
}

export default function fetchSA(){
  return function disp(dispatch){
    dispatch(startFetchSA())
    querySALTAstronomers().then( res =>
    {
      dispatch(fetchSAPass(convertSA(res.data.data)))
    }
    ).catch((e) => {
      dispatch(fetchSAFail(e.message))})
  }
}
