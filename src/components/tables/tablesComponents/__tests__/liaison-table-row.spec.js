import React from "react"
import renderer from "react-test-renderer"
import { shallow, mount, render } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import LiaisonTableRow from "../LiaisonTableRow"

const proposals = [
  { proposalId: '0', proposalCode: 'Code-1', title: 'Title-1', pi: 'PI-1', liaisonAstronomer: 'LA-1' },
  { proposalId: '1', proposalCode: 'Code-2', title: 'Title-2', pi: 'PI-2', liaisonAstronomer: 'LA-2' },
  { proposalId: '2', proposalCode: 'Code-3', title: 'Title-3', pi: 'PI-3', liaisonAstronomer: 'LA-3'}
]

const initProposals = [
  { proposalId: 'ID', proposalCode: 'CODE', title: 'TITLE', pi: 'INVESTIGATOR', liaisonAstronomer: 'LIAISON' },
  { proposalId: '2', proposalCode: 'Code-3', title: 'Title-3', pi: 'PI-3', liaisonAstronomer: 'LA-3'}
]

const semester = "2018-1"

const canAssign = [true, false]

const astronomers = [ { username: 'LA-1', name: 'LA-1' }, { username: 'LA-2', name: 'LA-2' }, { username: 'LA-3', name: 'LA-3' } ]

const username = 'myezasifiso'

const requestSummary = jest.fn()

const setLiaison = jest.fn()

// Checking if the LiaisonTableRow Component renders correctly for different input
describe("LiaisonTableRow Component", () => {
  //Enzyme method testing if it renders correctly with empty values of the proposals
  it("Render the LiaisonTableRow Component having unpopulated props with no errors", () => {
    const rendered = mount(<LiaisonTableRow
      proposal= {{}}
      initProposals= {[]}
      semester= {''}
      canAssign= {canAssign[1]}
      astronomers= {[]}
      username = {''}
      requestSummary= {requestSummary}
      setLiaison= {setLiaison} />)
    expect(shallowToJson(rendered)).toMatchSnapshot()
  })

  it("Render the LiaisonTableRow Component having populated props with no errors", () => {
    const rendered = mount(<LiaisonTableRow
      proposal= {proposals[0]}
      initProposals= {initProposals}
      semester= {semester}
      canAssign= {canAssign[0]}
      astronomers= {astronomers}
      username = {username}
      requestSummary= {requestSummary}
      setLiaison= {setLiaison} />)
    expect(shallowToJson(rendered)).toMatchSnapshot()
  })
})

// Checking if the requestSummary function works properly in LiaisonTableRow Component
describe("LiaisonTable Component", () => {
  it("requestSummary function should be called with the correct proposalCode", () => {
    const wrapper = mount(<LiaisonTableRow
      proposal= {proposals[0]}
      initProposals= {initProposals}
      semester= {semester}
      canAssign= {canAssign[0]}
      astronomers= {astronomers}
      username = {username}
      requestSummary= {requestSummary}
      setLiaison= {setLiaison} />)

    wrapper.find('.file-download').simulate('click');
    //Expect the requestSummary function to be called once
    expect(requestSummary.mock.calls.length).toBe(1)
    //Expect the requestSummary function to be called with the correct semester
    expect(requestSummary.mock.calls[0][1]).toBe(proposals[0].proposalCode)
    //Expect the requestSummary function to be called with the correct semester
    expect(requestSummary.mock.calls[0][2]).toBe(semester)
  })
})
