import targets from "../targets";

describe("Targets Reducers Testing", () => {
  let initialState = {
  	fetching: false,
  	fetched: false,
  	targets:[],
  	error: null,
  };

  let state = {};

  it("Should test the FETCH_TARGETS_START reducer", () => {
    state = targets(state = initialState, {type:"FETCH_TARGETS_START"});
    expect(state).toEqual({...state, fetching:true});
  });

  it("Should test the FETCH_TARGETS_PASS reducer", () => {
    state = targets(state = initialState, {type:"FETCH_TARGETS_PASS"});
    expect(state).toEqual({...state, fetched:true});
  });

  it("Should test the FETCH_TARGETS_FAIL reducer", () => {
    state = targets(state = initialState, {type:"FETCH_TARGETS_FAIL", payload: {error: "Failed to fetch targets"}});
    expect(state).toEqual({...state, errors:"Failed to fetch targets"});
  });

  it("Should test the USER_LOGGED_OUT reducer", () => {
    state = targets(state = initialState, {type:"USER_LOGGED_OUT"});
    expect(state).toEqual({...state});
  });
});
