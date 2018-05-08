import configureMockStore from "redux-mock-store";
import thunk from 'redux-thunk'
import {login, switchUser, logout} from "../auth";

jest.mock("../targetsActions");
jest.mock("../proposalsActions");
jest.mock("../../api/graphQL");
jest.mock("../../api/api");
jest.mock("../../util/storage");

// Setting up the mocking of the redux store.
const initialState = {};
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore(initialState);

// Testing the auth actions
describe("Auth Actions", () => {
  afterEach(() => {
    // Redux Mock store - clear actions after each test to assert the new actions being dispatched
    store.clearActions();
  });

  /*
  * The Auth login actions contains asynchronous functions, hence the use of async and await
  * for the returned promises.
  */
  it('Checks login actions using an async/await', async () => {
    await store.dispatch(login({username:"myezasifiso", password:"Mzukwase11"}));
    // expect the first action
    expect(store.getActions()[0].type).toEqual("FETCHING_DATA");
    // expect the second action
    expect(store.getActions()[1].type).toEqual("FETCH_SA_PASS");
    // expect the third action
    expect(store.getActions()[2].type).toEqual("USER_LOGGED_IN");
    // expect the fourth action
    expect(store.getActions()[3].type).toEqual("PARTNER_CHANGE");
    // expect the fifth action
    expect(store.getActions()[4].type).toEqual("FETCH_PROPOSALS_PASS");
  });


  /*
  * The Auth switch user actions contains asynchonous functions, hence the use of async and await
  * for the returned promises.
  */
  it('Checks switch user actions using an async/await', async () => {
    await store.dispatch(switchUser("myezasifiso"));
    // expect the first action
    expect(store.getActions()[0].type).toEqual("SWITCH_USER_START");
    // expect the second action
    expect(store.getActions()[1].type).toEqual("FETCHING_DATA");
    // expect the third action
    expect(store.getActions()[2].type).toEqual("FETCH_SA_PASS");
    // expect the fourth action
    expect(store.getActions()[3].type).toEqual("USER_LOGGED_IN");
    // expect the fifth action
    expect(store.getActions()[4].type).toEqual("PARTNER_CHANGE");
    // expect the sith action
    expect(store.getActions()[5].type).toEqual("FETCH_PROPOSALS_PASS");
  });

  /*
  * The Auth logout actions testing
  */
  it('Checks logout actions success', () => {
    store.dispatch(logout());
    // expect the first action
    expect(store.getActions()[0].type).toEqual("USER_LOGGED_OUT");
  });
});
