import React from "react";
import {shallow, mount, render} from "enzyme";
import renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import fetchMock from 'fetch-mock'
import thunk from 'redux-thunk'
import {Provider} from "react-redux";
import {createStore} from "redux";

import fetchSA from "../saltAstronomerActions";

import * as storage from "../../util/storage";
import * as api from "../../api/api";
import * as graphQL from "../../api/graphQL";


jest.mock("../../api/graphQL");
jest.mock("../../api/api");
jest.mock("../../util/storage");

//Setting up the mocking of the redux store.
const initialState = {};
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let store = mockStore(initialState);

// Testing the salt astronomers actions
describe("SALT Astronomers Actions", () => {
  /*
  * The SALT Astronomers actions contains asynchonous functions, hence the use of async and await
  * for the returned promises.
  */
  it('Checks fetchSA actions using an async/await', async () => {
    await store.dispatch(fetchSA());
    //expect the action to be FETCH_SA_START
    expect(store.getActions()[0].type).toEqual("FETCH_SA_START");
    //expect the action to be FETCH_SA_PASS
    expect(store.getActions()[1].type).toEqual("FETCH_SA_PASS");
  });


});
