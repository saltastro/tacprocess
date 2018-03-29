import React from "react";
import {shallow, mount, render} from "enzyme";
import renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import fetchMock from 'fetch-mock'
import thunk from 'redux-thunk'
import {Provider} from "react-redux";
import {createStore} from "redux";

import {submitTechnicalReviewDetails} from "./technicalReviewActions";

import * as storage from "../util/storage";
import * as api from "../api/api";
import * as graphQL from "../api/graphQL";
import * as index from "../api/index";

jest.mock("../api/index");
jest.mock("../api/graphQL");
jest.mock("../api/api");
jest.mock("../util/storage");

//Setting up the mocking of the redux store.
const initialState = {};
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let store = mockStore(initialState);
const proposals = [
  {
    transparency: 'Clear',
    maxSeeing: 2,
    instruments: {
      hrs: [ { exposureMode: "HIGH RESOLUTION" } ],
      rss: [ { dictatorMode: 'NORMAL', mode: 'Spectroscopy' } ],
      scam: [ { dictatorMode: "NORMAL" } ],
      bvit: [{type: "BVIT"}]
    },
    timeRequests: [
      {
        semester: '2018-1',
        distribution: [ { partnerCode: 'RSA', time: 150 }, { partnerCode: 'UW', time: 200 }, { partnerCode: 'IUCAA', time: 250 } ]
      },
      {
        semester: '2018-1',
        distribution: [ { partnerCode: 'RSA', time: 400 }, { partnerCode: 'UW', time: 50 } ]
      }
    ],
    techReviews : {
      "2018-1": {
        reviewer: { username: "brent"},
        feasible: "yes",
        comment: "Experienced SALT users. Ongoing program",
        details: null
      }
    }
  },
  {
    transparency: 'Thin cloud',
    maxSeeing: 2,
    instruments: {
      hrs: [ { exposureMode: "HIGH RESOLUTION" } ],
      rss: [ { dictatorMode: 'NORMAL', mode: 'Spectroscopy' } ],
      scam: [ { dictatorMode: "NORMAL" } ],
      bvit: [{type: "BVIT"}]
    },
    timeRequests: [
      {
        semester: '2017-1',
        distribution: [ { partnerCode: 'RSA', time: 150 }, { partnerCode: 'UW', time: 200 }, { partnerCode: 'IUCAA', time: 250 } ]
      },
      {
        semester: '2018-1',
        distribution: [ { partnerCode: 'RSA', time: 400 }, { partnerCode: 'UW', time: 50 } ]
      }
    ],
    techReviews : {
      "2018-1": {
        reviewer: { username: "brent"},
        feasible: "yes",
        comment: "Experienced SALT users. Ongoing program",
        details: null
      }
    }
  }
];

// Testing the salt astronomers actions
describe("SALT Astronomers Actions", () => {
  /*
  * The SALT Astronomers actions contains asynchonous functions, hence the use of async and await
  * for the returned promises.
  */
  it('Checks fetchSA actions using an async/await', async () => {
    await store.dispatch(submitTechnicalReviewDetails(proposals, {username: "brent"}, proposals, "RSA", "2018-1"));
    //expect the action to be SUBMIT_TECHNICAL_REVIEWS_START
    expect(store.getActions()[0].type).toEqual("SUBMIT_TECHNICAL_REVIEWS_START");
    //expect the action to be FETCH_PROPOSALS_START
    expect(store.getActions()[1].type).toEqual("FETCH_PROPOSALS_START");
    //expect the action to be SUBMIT_TECHNICAL_REVIEWS_PASS
    expect(store.getActions()[2].type).toEqual("SUBMIT_TECHNICAL_REVIEWS_PASS"); 
  });


});
