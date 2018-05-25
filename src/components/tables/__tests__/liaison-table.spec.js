import React from "react"
import renderer from "react-test-renderer"
import { shallow, mount, render } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import LiaisonTable from "../LiaisonTable"

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

// Checking if the LiaisonTable Component renders correctly for different input
describe("LiaisonTable Component", () => {

  //Enzyme method testing if it renders correctly with empty values of the proposals
  it("Render the LiaisonTable Component having unpopulated props with no errors", () => {
    const rendered = mount(<LiaisonTable
      proposals= {[]}
      initProposals= {[]}
      semester= {''}
      canAssign= {canAssign[1]}
      astronomers= {[]}
      username = {''}
      requestSummary= {requestSummary}
      setLiaison= {setLiaison} />)
    expect(shallowToJson(rendered)).toMatchSnapshot()
  })

  it("Render the LiaisonTable Component having populated props with no errors", () => {
    const rendered = mount(<LiaisonTable
      proposals= {proposals}
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
