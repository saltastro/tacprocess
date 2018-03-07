import statistics from "./tac";

describe("Statistics Reducers Testing", () => {
  let initialState = {
    data:{
  		"NONE": {
  			p0p1: 0,
  			p2: 0,
  			p3: 0
  		}
  		},
  	submiting: false,
  	submited: true,
  };

  let state = {};

  it("Should test the TIME_ALLOCATIONS_QUERY_START reducer", () => {
    state = statistics(state = initialState, {type:"TIME_ALLOCATIONS_QUERY_START"});
    expect(state).toEqual({...state, fetching:true});
  });

  it("Should test the TIME_ALLOCATIONS_QUERY_PASS reducer", () => {
    state = statistics(state = initialState, {type:"TIME_ALLOCATIONS_QUERY_PASS", timeallocation:{"UW": {p0p1:24.33, p2:58.3, p3:151.5}}});
    expect(state).toEqual({...state, fetched:true, data:{"UW": {p0p1:24.33, p2:58.3, p3:151.5}}});
  });

  it("Should test the TIME_ALLOCATIONS_QUERY_FAIL reducer", () => {
    state = statistics(state = initialState, {type:"TIME_ALLOCATIONS_QUERY_FAIL", payload: {error: "Failed to fetch astronomers"}});
    expect(state).toEqual({...state, error:"Failed to fetch astronomers"});
  });

  it("Should test the SUBMIT_TIME_ALLOCATIONS_START reducer", () => {
    state = statistics(state = initialState, {type:"SUBMIT_TIME_ALLOCATIONS_START", partner:"RSA"});
    expect(state).toEqual({...state, submiting:true, partner:"RSA"});
  });

  it("Should test the SUBMIT_TIME_ALLOCATIONS_PASS reducer", () => {
    state = statistics(state = initialState, {type:"SUBMIT_TIME_ALLOCATIONS_PASS"});
    expect(state).toEqual({...state, submited:true});
  });

  it("Should test the SUBMIT_TIME_ALLOCATIONS_FAIL reducer", () => {
    state = statistics(state = initialState, {type:"SUBMIT_TIME_ALLOCATIONS_FAIL"});
    expect(state).toEqual({...state, submited:false});
  });

  it("Should test the USER_LOGGED_OUT reducer", () => {
    state = statistics(state = initialState, {type:"USER_LOGGED_OUT"});
    expect(state).toEqual({...state});
  });

});
