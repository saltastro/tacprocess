import React from "react"
import renderer from "react-test-renderer"
import { shallow, mount, render } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import LiaisonSelector from "../LiaisonSelector"

const proposals = [
  { proposalCode: 'Code-1', liaisonAstronomer: 'LA-1' },
  { proposalCode: 'Code-2', liaisonAstronomer: 'LA-2' },
  { proposalCode: 'Code-3', liaisonAstronomer: 'LA-3'}
]

const initProposals = [ { proposalCode: 'CODE', liaisonAstronomer: 'LIAISON' }, { proposalCode: 'Code-3', liaisonAstronomer: 'LA-3'} ]

const canAssign = [true, false]

const astronomers = [ { username: 'LA-1', name: 'LA-1' }, { username: 'LA-2', name: 'LA-2' }, { username: 'LA-3', name: 'LA-3' } ]

const username = 'myezasifiso'

const setLiaison = jest.fn()

// Checking if the LiaisonSelector Component renders correctly for different input
describe("LiaisonSelector Component", () => {
  //Enzyme method testing if it renders correctly with empty values of the proposals
  it("Render the LiaisonSelector Component having unpopulated props with no errors", () => {
    const rendered = mount(<LiaisonSelector
      proposal= {{}}
      initProposals= {[]}
      canAssign= {canAssign[1]}
      astronomers= {[]}
      username = {''}
      setLiaison= {setLiaison} />)
    expect(shallowToJson(rendered)).toMatchSnapshot()
  })
  //Enzyme method testing if it renders correctly with populated values of the proposals
  it("Render the LiaisonSelector Component having populated props with no errors", () => {
    const rendered = mount(<LiaisonSelector
      proposal= {proposals}
      initProposals= {initProposals}
      canAssign= {canAssign[0]}
      astronomers= {astronomers}
      username= {username}
      setLiaison= {setLiaison} />)
    expect(shallowToJson(rendered)).toMatchSnapshot()
  })
})

// Checking if the setLiaison function works properly in LiaisonSelector Component
describe("LiaisonSelector Component", () => {
  it("setLiaison function should be called with the correct proposalCode", () => {
    const wrapper = mount(<LiaisonSelector
      proposal= {proposals[0]}
      initProposals= {initProposals}
      canAssign= {canAssign[0]}
      astronomers= {astronomers}
      username= {username}
      setLiaison= {setLiaison} />)

    wrapper.find('select').simulate('change');
    //Expect the setLiaison function to be called once
    expect(setLiaison.mock.calls.length).toBe(1)
    //Expect the setLiaison function to be called with the correct username
    expect(setLiaison.mock.calls[0][0]).toBe(astronomers[0].username)
    //Expect the setLiaison function to be called with the correct proposalCode
    expect(setLiaison.mock.calls[0][1]).toBe(proposals[0].proposalCode)
  })
})

// Checking if the drop down exist only for ADMINISTRATOR in LiaisonSelector Component
describe("LiaisonSelector Component", () => {
  it("Drop down should exist if the user is an ADMINISTRATOR", () => {
    const wrapper = mount(<LiaisonSelector
      proposal= {proposals[1]}
      initProposals= {initProposals}
      canAssign= {canAssign[0]}
      astronomers= {astronomers}
      username= {username}
      setLiaison= {setLiaison} />)
      // Expect the Drop down to exists (select)
      expect(wrapper.find('.setLiaison').type()).toBe('select')
  })

  it("Drop down should not exist but checkbox should if user is not an ADMINISTRATOR", () => {
    const wrapper = mount(<LiaisonSelector
      proposal= {proposals[2]}
      initProposals= {initProposals}
      canAssign= {canAssign[1]}
      astronomers= {astronomers}
      username= {username}
      setLiaison= {setLiaison} />)
      // Expect the Checkbox to exist (input)
      expect(wrapper.find('.setLiaison').type()).toBe('input')
  })
})
