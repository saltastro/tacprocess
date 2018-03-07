import user from "./user";
import * as storage from "../util/storage";

jest.mock("../util/storage");

describe("Targets Reducers Testing", () => {
  let initialState = {
    user: {
  		firstName: undefined,
  		lastName: undefined,
  		email: undefined,
  		username: undefined,
  		roles: undefined,
  		isAuthenticated: !!storage.getStorage()
  	}
  };

  let state = {};

  it("Should test the USER_LOGGED_IN reducer", () => {
    state = user(state = initialState, {type:"USER_LOGGED_IN", payload: {firstName: "Sifiso", lastName: "Myeza", email: "Sifiso@sooa.ac.za", username: "myezasifiso", roles: ["ADMINISTRATOR"]}});
    expect(state).toEqual({...state, fetching:false, error:null});
  });

  it("Should test the FETCHING_USER reducer", () => {
    state = user(state = initialState, {type:"FETCHING_USER"});
    expect(state).toEqual({...state, fetching:true});
  });

  it("Should test the FAIL_TO_GET_USER reducer", () => {
    state = user(state = initialState, {type:"FAIL_TO_GET_USER", payload: {error: "Failed to get user"}});
    expect(state).toEqual({...state, error:"Failed to get user"});
  });

  it("Should test the SWITCH_USER_START reducer", () => {
    state = user(state = initialState, {type:"SWITCH_USER_START"});
    expect(state).toEqual({...state, fetching:true});
  });

  it("Should test the SWITCH_USER_FAIL reducer", () => {
    state = user(state = initialState, {type:"SWITCH_USER_FAIL", payload: {error: "Failed to switch user"}});
    expect(state).toEqual({...state, error: "Failed to switch user"});
  });

  it("Should test the USER_LOGGED_OUT reducer", () => {
    state = user(state = initialState, {type:"USER_LOGGED_OUT"});
    expect(state).toEqual({...state});
  });
});
