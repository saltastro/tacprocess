import React from "react"
import renderer from "react-test-renderer"
import { shallow, mount, render } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import LiaisonTable from "../LiaisonTable"

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

const canAssign = [true, false]

const selectArray = [
  {
    username: 'brent',
    name: 'brent'
  },
  {
    username: 'encarni',
    name: 'encarni'
  }
]

const requestSummary = () => {

}

// Checking if the LiaisonTable Component renders correctly for different input
describe("LiaisonTable Component", () => {

  //Enzyme method testing if it renders correctly with empty values of the proposals
  it("Render the LiaisonTable Component having unpopulated props with no errors", () => {
    const rendered = mount(<LiaisonTable proposals= {[]} canAssign= {canAssign[1]} selectArray= {[]} requestSummary= {requestSummary} />)
    expect(shallowToJson(rendered)).toMatchSnapshot()
  })

  it("Render the LiaisonTable Component having populated props with no errors", () => {
    const rendered = mount(<LiaisonTable proposals= {proposals} canAssign= {canAssign[0]} selectArray= {selectArray} requestSummary= {requestSummary} />)
    expect(shallowToJson(rendered)).toMatchSnapshot()
  })
})
