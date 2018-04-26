import React from "react"
import renderer from "react-test-renderer"
import { shallow, mount, render } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import LiaisonPage from "../LiaisonPage"

const proposals = [
  { proposalId: '0', proposalCode: 'Code-1', title: 'Title-1', pi: 'PI-1', liaisonAstronomer: 'LA-1' },
  { proposalId: '1', proposalCode: 'Code-2', title: 'Title-2', pi: 'PI-2', liaisonAstronomer: 'LA-2' },
  { proposalId: '2', proposalCode: 'Code-3', title: 'Title-3', pi: 'PI-3', liaisonAstronomer: 'LA-3'}
]

const initProposals = [
  { proposalId: 'ID', proposalCode: 'CODE', title: 'TITLE', pi: 'INVESTIGATOR', liaisonAstronomer: 'LIAISON' },
  { proposalId: '2', proposalCode: 'Code-3', title: 'Title-3', pi: 'PI-3', liaisonAstronomer: 'LA-3'}
]

const filters = { selectedSemester: '2018-1', selectedLiaison: 'All' }

const astronomers = [ { username: 'LA-1', name: 'LA-1' }, { username: 'LA-2', name: 'LA-2' }, { username: 'LA-3', name: 'LA-3' } ]

const user = { name: 'Sifiso', username: 'myezasifiso', roles: [{ type: 'ADMINISTRATOR' }] }

const setLiaison = jest.fn()
const submitLiaisons = jest.fn()

// Checking if the LiaisonPage Component renders correctly for different input
describe("LiaisonPage Component", () => {

  //Enzyme method testing if it renders correctly with empty values of the proposals
  it("Render the LiaisonPage Component having unpopulated props with no errors", () => {
    const rendered = mount(<LiaisonPage
      proposals= {[]}
      initProposals= {[]}
      filters= {{}}
      astronomers= {[]}
      user = {{}}
      setLiaison= {setLiaison}
      submitLiaisons= {submitLiaisons} />)
    expect(shallowToJson(rendered)).toMatchSnapshot()
  })

  it("Render the LiaisonPage Component having populated props with no errors", () => {
    const rendered = mount(<LiaisonPage
      proposals= {proposals}
      initProposals= {initProposals}
      filters= {filters}
      astronomers= {astronomers}
      user = {user}
      setLiaison= {setLiaison}
      submitLiaisons= {submitLiaisons} />)
    expect(shallowToJson(rendered)).toMatchSnapshot()
  })
})

// Testing the click of a button if it triggers the event accordingly
describe("LiaisonPage Component", () => {

  it("Should trigger the event with the correct proposals infomation", () => {
    let expectedProposals = [
      { proposalId: '0', proposalCode: 'Code-1', title: 'Title-1', pi: 'PI-1', liaisonAstronomer: 'LA-1' },
      { proposalId: '1', proposalCode: 'Code-2', title: 'Title-2', pi: 'PI-2', liaisonAstronomer: 'LA-2' }
    ]

    const wrapper = mount(<LiaisonPage
      proposals= {proposals}
      initProposals= {initProposals}
      filters= {filters}
      astronomers= {astronomers}
      user = {user}
      setLiaison= {setLiaison}
      submitLiaisons= {submitLiaisons} />)

    wrapper.find('button').simulate('click')
    //Expect the submitLiaisons function to be called once
    expect(submitLiaisons.mock.calls.length).toBe(1);
    //Expect the submitLiaisons function to be called with the correct proposal
    expect(submitLiaisons.mock.calls[0][0]).toEqual(expectedProposals)
  })
})
