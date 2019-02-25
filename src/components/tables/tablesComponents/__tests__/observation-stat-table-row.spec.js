import React from "react"
import { mount } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import ObservationTableRow from "../ObservationTableRow"

const proposals = [
  { proposalCode: 'Code-1',
    title: 'Title-1',
    principalInvestigator: { givenName: 'PI-1', familyName: 'PI-1'},
    liaisonAstronomer: { givenName: 'LA-1', familyName: 'LA-1'},
    status: 'Status-1',
    statusComment: 'Comment-1',
    timeAllocations: [{ priority: 1, amount: 50000, semester: '2018-1', partnerCode: 'RSA' }],
    observations: [{ status: 'ACCEPTED', block: { length: 2000, priority: 1, semester: '2018-1'} }]
  }
]

// Checking if the ObservationTableRow Component renders correctly for different input
describe("ObservationTableRow Component", () => {
  // Enzyme method testing if it renders correctly with empty values of the proposals
  it("Render the ObservationTableRow Component having unpopulated props with no errors", () => {
    const rendered = mount(<ObservationTableRow
      proposal= {{}}
      semester={''}
    />)
    expect(shallowToJson(rendered)).toMatchSnapshot()
  })
  
  it("Render the ObservationTableRow Component having populated props with no errors", () => {
    const rendered = mount(<ObservationTableRow
      proposal= {proposals[0]}
      semester={'2018-1'}
    />)
    expect(shallowToJson(rendered)).toMatchSnapshot()
  })
})
