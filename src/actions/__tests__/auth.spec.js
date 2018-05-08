import configureMockStore from "redux-mock-store";
import thunk from 'redux-thunk'
import {login, switchUser, logout} from "../auth";

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
  it('should check the login actions using an async/awai for handling asynchronous callst', async () => {
    await store.dispatch(login({username:"myezasifiso", password:"Mzukwase11"}))
    // expect the first action to be FETCHING_DATA
    expect(store.getActions()[0].type).toEqual("FETCHING_DATA")
    // expect the second action to be FETCH_SA_PASS
    expect(store.getActions()[1].type).toEqual("FETCH_SA_PASS")
    // expect the third action to be USER_LOGGED_IN
    expect(store.getActions()[2].type).toEqual("USER_LOGGED_IN")
    // expect the fourth action to be PARTNER_CHANGE
    expect(store.getActions()[3].type).toEqual("PARTNER_CHANGE")
    // expect the fifth action to be FETCH_PROPOSALS_PASS
    expect(store.getActions()[4].type).toEqual("FETCH_PROPOSALS_PASS")
    // expect the sixth action to be FETCH_TARGETS_PASS
    expect(store.getActions()[5].type).toEqual('FETCH_TARGETS_PASS')
    // expect the seventh action to be TIME_ALLOCATIONS_QUERY_PASS
    expect(store.getActions()[6].type).toEqual('TIME_ALLOCATIONS_QUERY_PASS')
    // expect the eight action to be TAC_MEMBERS_QUERY_PASS
    expect(store.getActions()[7].type).toEqual('TAC_MEMBERS_QUERY_PASS')
    // expect the ninth action to be SALT_USERS_QUERY_PASS
    expect(store.getActions()[8].type).toEqual('SALT_USERS_QUERY_PASS')
  });


  /*
  * The Auth switch user actions contains asynchonous functions, hence the use of async and await
  * for the returned promises.
  */
  it('should check the switch user actions using an async/await for handling asynchronous calls', async () => {
    await store.dispatch(switchUser("myezasifiso"))
    // expect the first action to be SWITCH_USER_START
    expect(store.getActions()[0].type).toEqual("SWITCH_USER_START")
    // expect the second action to be FETCHING_DATA
    expect(store.getActions()[1].type).toEqual("FETCHING_DATA")
    // expect the third action to be FETCH_SA_PASS
    expect(store.getActions()[2].type).toEqual("FETCH_SA_PASS")
    // expect the fourth action to be USER_LOGGED_IN
    expect(store.getActions()[3].type).toEqual("USER_LOGGED_IN")
    // expect the fifth action to be PARTNER_CHANGE
    expect(store.getActions()[4].type).toEqual("PARTNER_CHANGE")
    // expect the sith action to be FETCH_PROPOSALS_PASS
    expect(store.getActions()[5].type).toEqual("FETCH_PROPOSALS_PASS")
    // expect the seventh action to be FETCH_TARGETS_PASS
    expect(store.getActions()[6].type).toEqual('FETCH_TARGETS_PASS')
    // expect the eight action to be TIME_ALLOCATIONS_QUERY_PASS
    expect(store.getActions()[7].type).toEqual('TIME_ALLOCATIONS_QUERY_PASS')
    // expect the ninth action to be TAC_MEMBERS_QUERY_PASS
    expect(store.getActions()[8].type).toEqual('TAC_MEMBERS_QUERY_PASS')
    // expect the tenth action to be SALT_USERS_QUERY_PASS
    expect(store.getActions()[9].type).toEqual('SALT_USERS_QUERY_PASS')
  });

  /*
  * The Auth logout actions testing
  */
  it('should check the logout actions', () => {
    store.dispatch(logout());
    // expect the first action to be USER_LOGGED_OUT
    expect(store.getActions()[0].type).toEqual("USER_LOGGED_OUT");
  });
});
