import { combineReducers } from 'redux';

import user from "./reducers/user";
import statistics from "./reducers/statistics";

export default combineReducers({
  user,
  statistics
});
