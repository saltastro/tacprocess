import * as api from '../api';


export function fetchingStatsData(semester) {
  return dispatch => {
    dispatch(fetchingStats());
    api.fetchStatsData(semester)
      .then((statsData) => {
        dispatch(fetchingStatsSucceeded(statsData.proposals));
      })
      .catch((error) => {
        dispatch(fetchingStatsFailed((error.toString())))
      });
  }
}

export function fetchingStatsSucceeded(proposals) {
  return {
    type: FETCH_STATS_SUCCEEDED,
    payload: {
      proposals
    }
  };
}
export function fetchingStatsFailed(message) {
  return {
    type: FETCH_STATS_FAILED,
    payload: {
      error: {
        id: v4(),
        message
      }
    }
  };
}

export function fetchingStats() {
  return {
    type: FETCHING_STATS,
  };
}
