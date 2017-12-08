import { combineReducers } from 'redux';

import user from "./reducers/user";
import statistics from "./reducers/statistics";
import filters from "./reducers/filters";

export default combineReducers({
  user,
  statistics,
  filters
});
