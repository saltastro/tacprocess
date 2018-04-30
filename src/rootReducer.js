import { combineReducers } from 'redux';

import user from "./reducers/user";
import filters from "./reducers/filters";
import proposals from "./reducers/proposals";
import targets from "./reducers/targets";
import tac from "./reducers/tac";
import SALTAstronomers from "./reducers/astronomers";
import data from "./reducers/data";

export default combineReducers({
	data,
	user,
	filters,
	tac,
	proposals,
	targets,
	SALTAstronomers
});
