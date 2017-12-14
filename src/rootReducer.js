import { combineReducers } from 'redux';

import user from "./reducers/user";
import statistics from "./reducers/statistics";
import filters from "./reducers/filters";
import targets from "./reducers/targets";
import tac from "./reducers/tac";

export default combineReducers({
  user,
  statistics,
  filters,
  tac,
  targets
});
