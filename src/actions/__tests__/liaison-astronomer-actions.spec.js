import configureMockStore from "redux-mock-store"
import thunk from 'redux-thunk'
import submitProposalsLiaison from "../liaison-astronomer-actions"
import * as index from '../../api/index'

jest.mock("../../api/index")
jest.mock("../../api/graphQL")

// Setting up the mocking of the redux store.
const initialState = {}
const middleware = [thunk]
const mockStore = configureMockStore(middleware)
const store = mockStore(initialState)

// Testing the liaison astronomers actions
describe("Liaison Astronomers Actions", () => {
  afterEach(() => {
    // Redux Mock store - clear actions after each test to assert the new actions being dispatched
    store.clearActions();
  });

  /*
  * The Liaison Astronomer actions contains asynchronous function, hence the use of async and await
  * for the returned promises.
  */
  it('creates actions when the submitProposalsLiaison function is called. Using async/await for handling asynchronous calls', async () => {
    const proposals = [
      { proposalCode: 'Code-1', liaisonAstronomer: 'LA-1' },
      { proposalCode: 'Code-2', liaisonAstronomer: 'LA-2' },
      { proposalCode: 'Code-3', liaisonAstronomer: 'LA-3'}
    ]

    await store.dispatch(submitProposalsLiaison(proposals, '2018-1',  'RSA'))
    // expect the api to have been called with the correct arguments to post
    expect(index.jsonClient().getLatestArguments()[0]).toEqual({ data: {assignments: proposals}, url: 'liaison-astronomers'})
    // expect the first action to be SUBMIT_LIAISON_ASTRONOMERS_START
    expect(store.getActions()[0].type).toEqual('SUBMIT_LIAISON_ASTRONOMERS_START')
    // expect the second action to be FETCH_PROPOSALS_START
    expect(store.getActions()[1].type).toEqual('FETCH_PROPOSALS_START')
    // expect the third action to be SUBMIT_LIAISON_ASTRONOMERS_PASS
    expect(store.getActions()[2].type).toEqual('SUBMIT_LIAISON_ASTRONOMERS_PASS')
    // expect the fourth action to be FETCH_PROPOSALS_PASS
    expect(store.getActions()[3].type).toEqual('FETCH_PROPOSALS_PASS')
  })

  it('should fail to submit the liaison astronomer if the API promise call is rejected', async () => {
    index.jsonClient().rejectNextPost()
    await store.dispatch(submitProposalsLiaison([], '2018-1',  'RSA'))
    // expect the first action to be SUBMIT_LIAISON_ASTRONOMERS_START
    expect(store.getActions()[0].type).toEqual('SUBMIT_LIAISON_ASTRONOMERS_START')
    // expect the second action to be SUBMIT_LIAISON_ASTRONOMERS_FAIL
    expect(store.getActions()[1].type).toEqual('SUBMIT_LIAISON_ASTRONOMERS_FAIL')
  })
})


