import React from "react"
import { mount } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import PartnerStatPage from "../PartnerStatPage"

// Checking if the PartnerStatPage Component renders correctly for different input
describe("PartnerStatPage Component", () => {
  
  const proposals = [
    { proposalCode: 'Code-1',
      title: 'Title-1',
      principalInvestigator: { givenName: 'PI-1', familyName: 'PI-1'},
      liaisonAstronomer: { givenName: 'LA-1', familyName: 'LA-1'},
      status: 'Status-1',
      statusComment: 'Comment-1',
      completionComments: [{ semester: '2018-1', comment: 'Testing'}],
      timeAllocations: [{ priority: 1, amount: 50000, semester: '2018-1', partnerCode: 'RSA' }],
      observations: [{ status: 'ACCEPTED', block: { length: 2000, priority: 1, semester: '2018-1'} }]
    }
  ]
  
  //Enzyme method testing if it renders correctly with empty values of the proposals
  it("Render the PartnerStatPage Component having unpopulated props with no errors", () => {
    const rendered = mount(<PartnerStatPage
      proposals= {[]}
      filters={{}}
      user={{}}
    />)
    expect(shallowToJson(rendered)).toMatchSnapshot()
  })
  
  it("Render the PartnerStatPage Component having populated props with no errors", () => {
    const rendered = mount(<PartnerStatPage
      proposals= {proposals}
      filters={{selectedSemester: '2018-1'}}
      user={{roles:[{type: 'ADMINISTRATOR'}]}}
    />)
    expect(shallowToJson(rendered)).toMatchSnapshot()
  })
})
