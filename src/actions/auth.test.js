import React from "react";
import {shallow, mount, render} from "enzyme";
import renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import fetchMock from 'fetch-mock'
import thunk from 'redux-thunk'
import {Provider} from "react-redux";
import {createStore} from "redux";

import {login} from "./auth";

import * as storage from "../util/storage";
import * as api from "../api/api";
import * as graphQL from "../api/graphQL";
import * as propAction from "./proposalsActions";
import * as targetAction from "./targetsActions";

jest.mock("./targetsActions");
jest.mock("./proposalsActions");
jest.mock("../api/graphQL");
jest.mock("../api/api");
jest.mock("../util/storage");

//Setting up the mocking of the redux store.
const initialState = {};
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let store = mockStore(initialState);

// Testing the auth actions
describe("Auth Actions", () => {
  // afterEach(() => {
  //   fetchMock.reset();
  //   fetchMock.restore();
  // })

  /*
  * The Auth actions contains asynchonous actions, hence the use of async and await
  * as there are functions which returns promises.
  */
  it('Check action add using an async/await', async () => {
    await store.dispatch(login({username:"myezasifiso", password:"Mzukwase11"}));
    console.log(store.getActions());
    //expect the action to be USER_LOGGED_IN
    expect(store.getActions()[0].type).toEqual("USER_LOGGED_IN");
    //expect the action to be PARTNER_CHANGE
    expect(store.getActions()[1].type).toEqual("PARTNER_CHANGE");
    //expect the action to be FETCH_PROPOSALS_START
    expect(store.getActions()[2].type).toEqual("FETCH_PROPOSALS_START");
    //expect the action to be FETCH_TARGETS_START
    expect(store.getActions()[3].type).toEqual("FETCH_TARGETS_START");
    //expect the action to be TIME_ALLOCATIONS_QUERY_START
    expect(store.getActions()[4].type).toEqual("TIME_ALLOCATIONS_QUERY_START");
    //expect the action to be FETCH_PROPOSALS_PASS
    expect(store.getActions()[5].type).toEqual("FETCH_PROPOSALS_PASS");
    //expect the action to be FETCH_TARGETS_PASS
    expect(store.getActions()[6].type).toEqual("FETCH_TARGETS_PASS");
    //expect the action to be TIME_ALLOCATIONS_QUERY_PASS
    expect(store.getActions()[7].type).toEqual("TIME_ALLOCATIONS_QUERY_PASS");


  });
});
