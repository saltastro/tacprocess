import configureMockStore from "redux-mock-store"
import thunk from 'redux-thunk'
import fetchSA from "../saltAstronomerActions"

jest.mock("../../api/graphQL")

// Setting up the mocking of the redux store.
const initialState = {}
const middleware = [thunk]
const mockStore = configureMockStore(middleware)
const store = mockStore(initialState)

// Testing the salt astronomers actions
describe("SALT Astronomers Actions", () => {
  /*
  * The SALT Astronomers actions contains asynchronous functions, hence the use of async and await
  * for the returned promises.
  */
  it('creates the correct actions when the fetchSA function is called.', async () => {
    await store.dispatch(fetchSA())
    // expect the first action to be FETCH_SA_START
    expect(store.getActions()[0].type).toEqual("FETCH_SA_START")
    // expect the second action to be FETCH_SA_PASS
    expect(store.getActions()[1].type).toEqual("FETCH_SA_PASS")
  })
})
