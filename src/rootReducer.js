import { combineReducers } from 'redux';

import user from "./reducers/user";
import statistics from "./reducers/statistics";
import selectors from "./reducers/selectors";

export default combineReducers({
  user,
  statistics,
  selectors
});
