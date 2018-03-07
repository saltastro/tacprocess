import SALTAstronomers from "./astronomers";

describe("SALTAstronomers Reducers Testing", () => {
  let initialState = {
    fetching: false,
    fetched: false,
    SALTAstronomer:[],
    error: null,
  };

  let state = {};

  it("Should test the FETCH_SA_START reducer", () => {
    state = SALTAstronomers(state = initialState, {type:"FETCH_SA_START"});
    expect(state).toEqual({...state, fetching:true});
  });

  it("Should test the FETCH_SA_PASS reducer", () => {
    state = SALTAstronomers(state = initialState, {type:"FETCH_SA_PASS"});
    expect(state).toEqual({...state, fetched:true});
  });

  it("Should test the FETCH_SA_FAIL reducer", () => {
    state = SALTAstronomers(state = initialState, {type:"FETCH_SA_FAIL", payload: {error: "Failed to fetch astronomers"}});
    expect(state).toEqual({...state, error:"Failed to fetch astronomers"});
  });

  it("Should test the USER_LOGGED_OUT reducer", () => {
    state = SALTAstronomers(state = initialState, {type:"USER_LOGGED_OUT"});
    expect(state).toEqual({...state});
  });

});
