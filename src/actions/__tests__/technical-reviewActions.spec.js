import configureMockStore from "redux-mock-store"
import thunk from 'redux-thunk'
import {submitTechnicalReviewDetails} from "../technicalReviewActions"
import * as index from '../../api/index'

jest.mock("../../api/index")
jest.mock("../../api/graphQL")

// Setting up the mocking of the redux store.
const initialState = {}
const middleware = [thunk]
const mockStore = configureMockStore(middleware)
const store = mockStore(initialState)

// Testing the salt astronomers actions
describe("SALT Astronomers Actions", () => {
  afterEach(() => {
    // Redux Mock store - clear actions after each test to assert the new actions being dispatched
    store.clearActions()
  })

  /*
  * The SALT Astronomers actions contains asynchronous functions, hence the use of async and await
  * for the returned promises.
  */
  it('creates actions when the submitTechnicalReviewDetails function is called. Using async/await for handling asynchronous calls', async () => {
    const proposals = [
      { proposalCode: 'Code-1', techReviews : { "2018-1": { reviewer: { username: "brent"}, feasible: "yes", comment: "Comment 1" } } },
      { proposalCode: 'Code-2', techReviews : { "2018-1": { reviewer: { username: 'eric'}, feasible: "yes", comment: "New Comment 2 by Eric" } } }
    ]
    const initProposals = [
      { proposalCode: 'Code-1', techReviews : { "2018-1": { reviewer: { username: "brent"}, feasible: "yes", comment: "Comment 1"} } },
      { proposalCode: 'Code-2', techReviews : { "2018-1": { reviewer: { username: "encarni"}, feasible: "yes", comment: "Comment 2"} } }
    ]
    const expected = {
      semester: '2018-1',
      reviews: [
        { proposalCode: 'Code-2', reviewer: 'eric', report: 'Feasible: yes\nComments: New Comment 2 by Eric\n' }
      ]
    }
    await store.dispatch(submitTechnicalReviewDetails(proposals, {username: "brent"}, initProposals, "RSA", "2018-1"))
    // expect the api to have been called with the correct arguments to post
    expect(index.jsonClient().getLatestArguments()[0].data).toEqual(expected)
    // expect the first action to be SUBMIT_TECHNICAL_REVIEWS_START
    expect(store.getActions()[0].type).toEqual("SUBMIT_TECHNICAL_REVIEWS_START")
    // expect the second action to be FETCH_PROPOSALS_START
    expect(store.getActions()[1].type).toEqual("FETCH_PROPOSALS_START")
    // expect the third action to be SUBMIT_TECHNICAL_REVIEWS_PASS
    expect(store.getActions()[2].type).toEqual("SUBMIT_TECHNICAL_REVIEWS_PASS")
    // expect the fourth action to be FETCH_PROPOSALS_PASS
    expect(store.getActions()[3].type).toEqual("FETCH_PROPOSALS_PASS")
  })

  it('should fail to submit the tech reviews when the reviewer is null', async () => {
    const proposals = [
     { proposalCode: 'Code-3', techReviews : { "2018-1": { reviewer: { }, feasible: "yes", comment: "New Comment 3 by Eric" } } }
    ]
    const initProposals = [
      { proposalCode: 'Code-3', techReviews : { "2018-1": { reviewer: { }, feasible: "yes", comment: "New Comment 2 by Eric" } } }
    ]

    await store.dispatch(submitTechnicalReviewDetails(proposals, {username: "brent"}, initProposals, "RSA", "2018-1"))
    // expect the first action to be SUBMIT_TECHNICAL_REVIEWS_START
    expect(store.getActions()[0].type).toEqual("SUBMIT_TECHNICAL_REVIEWS_START")
    // expect the second action to be SUBMIT_TECHNICAL_REVIEWS_FAIL
    expect(store.getActions()[1].type).toEqual('SUBMIT_TECHNICAL_REVIEWS_FAIL')
  })

  it('should fail to submit the tech reviews when trying to update reviewer to null', async () => {
    const proposals = [
      { proposalCode: 'Code-3', techReviews : { "2018-1": { reviewer: { }, feasible: "yes", comment: "New Comment 3 by Eric" } } }
    ]
    const initProposals = [
      { proposalCode: 'Code-3', techReviews : { "2018-1": { reviewer: { username: "brent" }, feasible: "yes", comment: "New Comment 2 by Eric" } } }
    ]

    await store.dispatch(submitTechnicalReviewDetails(proposals, {username: "brent"}, initProposals, "RSA", "2018-1"))
    // expect the first action to be SUBMIT_TECHNICAL_REVIEWS_START
    expect(store.getActions()[0].type).toEqual("SUBMIT_TECHNICAL_REVIEWS_START")
    // expect the second action to be SUBMIT_TECHNICAL_REVIEWS_FAIL
    expect(store.getActions()[1].type).toEqual('SUBMIT_TECHNICAL_REVIEWS_FAIL')
  })

  it('should fail to submit the tech reviews if the promise for the API is rejected', async () => {
    index.jsonClient().rejectNextPost()
    await store.dispatch(submitTechnicalReviewDetails([], {username: "brent"}, [], "RSA", "2018-1"))
    // expect the first action to be SUBMIT_TECHNICAL_REVIEWS_START
    expect(store.getActions()[0].type).toEqual("SUBMIT_TECHNICAL_REVIEWS_START")
    // expect the second action to be SUBMIT_TECHNICAL_REVIEWS_FAIL
    expect(store.getActions()[1].type).toEqual('SUBMIT_TECHNICAL_REVIEWS_FAIL')
  })
})
