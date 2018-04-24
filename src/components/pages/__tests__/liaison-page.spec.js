import React from "react"
import renderer from "react-test-renderer"
import { shallow, mount, render } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import LiaisonPage from "../LiaisonPage"

const proposals = [
  {
    proposalId: '0',
    proposalCode: '2018-1-SCI-038',
    title: 'Surface Chemistry of Peculiar Hot Subdwarfs',
    pi: 'Jeffery Simon',
    liaisonAstronomer: 'Eric'
  },
  {
    proposalId: '1',
    proposalCode: '2015-2-MLT-006',
    title: 'THE SALT GRAVITATIONAL LENSING LEGACY SURVEY',
    pi: 'Serjeant Stephen',
    liaisonAstronomer: 'brent'
  }
]

const initProposals = [
  {
    proposalId: 'Proposal Id',
    proposalCode: 'Proposal Code',
    title: 'Proposal Title',
    pi: 'Proposal Investigator',
    liaisonAstronomer: 'Proposal Liaison Astronomer'
  },
  {
    proposalId: '1',
    proposalCode: '2015-2-MLT-006',
    title: 'THE SALT GRAVITATIONAL LENSING LEGACY SURVEY',
    pi: 'Serjeant Stephen',
    liaisonAstronomer: 'brent'
  }
]

const filters = {
  selectedSemester: '2018-1',
  selectedLiaison: 'All'
}

const astronomers = [
  {
    username: 'brent',
    name: 'brent'
  },
  {
    username: 'encarni',
    name: 'encarni'
  }
]

const user = {
  name: 'Sifiso',
  username: 'myezasifiso',
  roles: [{
    type: 'ADMINISTRATOR'
  }]
}

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
    expect(submitLiaisons.mock.calls[0][0][0]).toEqual(proposals[1])
  })
})
