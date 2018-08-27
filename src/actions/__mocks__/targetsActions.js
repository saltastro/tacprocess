import {
  FETCH_TARGETS_START,
  FETCH_TARGETS_PASS,
  FETCH_TARGETS_FAIL,
} from '../../types'
import {queryTargets} from '../../api/__mocks__/graphQL'

function startFetchTargets() {
  return (
    {
      type: FETCH_TARGETS_START
    }
  )

}
function FetchTargetsFail(error) {
  return (
    {
      type: FETCH_TARGETS_FAIL,
      payload: { error }
    }
  )
}

function FetchTargetsPass(targets) {
  return (
    {
      type: FETCH_TARGETS_PASS,
      payload: targets
    }
  )
}

function convertTargets(targets){
  const convertedTargets = targets.targets.map(target => (
    {
      targetId: target.id,
      optional: target.optional,
      ra: target.coordinates.ra / 15,
      dec: target.coordinates.dec
    }
  ))
  return convertedTargets
}

export default function fetchTargets(semester, partner='All'){
  return function disp(dispatch){
    dispatch(startFetchTargets())
    queryTargets(semester, partner).then( res =>
    {
      dispatch(FetchTargetsPass(convertTargets(res.data.data)))
    }
    ).catch((e) => {
      dispatch(FetchTargetsFail(e.message))})
  }
}
