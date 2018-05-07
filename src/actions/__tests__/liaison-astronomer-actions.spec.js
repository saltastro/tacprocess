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

  /*
  * The Liaison Astronomer actions contains asynchronous function, hence the use of async and await
  * for the returned promises.
  */
  it('Checks submitProposalsLiaison actions using an async/await', async () => {
    const proposals = [
      { proposalCode: 'Code-1', liaisonAstronomer: 'LA-1' },
      { proposalCode: 'Code-2', liaisonAstronomer: 'LA-2' },
      { proposalCode: 'Code-3', liaisonAstronomer: 'LA-3'}
    ]

    await store.dispatch(submitProposalsLiaison(proposals, '2018-1',  'RSA'))
    // expect the api to have been called with the correct arguments to post
    expect(index.jsonClient().getLatestArguments()[0]).toEqual({ data: {assignments: proposals}, url: 'liaison-astronomers'})
    // expect the action type to be SUBMIT_LIAISON_ASTRONOMERS_START
    expect(store.getActions()[0].type).toEqual('SUBMIT_LIAISON_ASTRONOMERS_START')
    // expect the action type to be FETCH_PROPOSALS_START
    expect(store.getActions()[1].type).toEqual('FETCH_PROPOSALS_START')
    // expect the action type to be SUBMIT_LIAISON_ASTRONOMERS_PASS
    expect(store.getActions()[2].type).toEqual('SUBMIT_LIAISON_ASTRONOMERS_PASS')

  })

  it('should fail to submit the liaison astronomer', async () => {
    const proposals = [
      { proposalCode: 'Code-1', liaisonAstronomer: 'LA-1' },
      { proposalCode: 'Code-2', liaisonAstronomer: 'LA-2' },
      { proposalCode: 'Code-3', liaisonAstronomer: 'LA-3'}
    ]

    index.jsonClient().setOnceOfPromiseReject(() => true)
    await store.dispatch(submitProposalsLiaison(proposals, '2018-1',  'RSA'))
    // expect the action type to be SUBMIT_LIAISON_ASTRONOMERS_FAIL
    expect(store.getActions()[5].type).toEqual('SUBMIT_LIAISON_ASTRONOMERS_FAIL')
  })
})


