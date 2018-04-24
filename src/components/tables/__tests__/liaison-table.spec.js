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
    liaisonAstronomer: 'encarni'
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
  }
]

const semester = "2018-1"

const canAssign = [true, false]

const selectArray = [
  {
    username: 'brent',
    name: 'brent'
  },
  {
    username: 'encarni',
    name: 'encarni'
  },
  {
    username: 'eric',
    name: 'eric'
  }
]

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
      selectArray= {[]}
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
      selectArray= {selectArray}
      username = {username}
      requestSummary= {requestSummary}
      setLiaison= {setLiaison} />)
    expect(shallowToJson(rendered)).toMatchSnapshot()
  })
})

// Checking if the setLiaison function works properly in LiaisonTable Component
describe("LiaisonTable Component", () => {
  it("setLiaison function should be called with the correct proposalCode", () => {
    const wrapper = mount(<LiaisonTable
      proposals= {proposals}
      initProposals= {initProposals}
      semester= {semester}
      canAssign= {canAssign[0]}
      selectArray= {selectArray}
      username = {username}
      requestSummary= {requestSummary}
      setLiaison= {setLiaison} />)

    wrapper.find('select').at(0).simulate('change');
    //Expect the setLiaison function to be called once
    expect(setLiaison.mock.calls.length).toBe(1)
    //Expect the setLiaison function to be called with the correct username
    expect(setLiaison.mock.calls[0][0]).toBe(selectArray[0].username)
    //Expect the setLiaison function to be called with the correct proposalCode
    expect(setLiaison.mock.calls[0][1]).toBe(proposals[0].proposalCode)

    wrapper.find('select').at(1).simulate('change');
    //Expect the setLiaison function to be called twice
    expect(setLiaison.mock.calls.length).toBe(2)
    //Expect the setLiaison function to be called with the correct username
    expect(setLiaison.mock.calls[1][0]).toBe(selectArray[1].username)
    //Expect the setLiaison function to be called with the correct proposalCode
    expect(setLiaison.mock.calls[1][1]).toBe(proposals[1].proposalCode)

    wrapper.find('select').at(1).simulate('change');
    //Expect the setLiaison function to be called three times
    expect(setLiaison.mock.calls.length).toBe(3)
    //Expect the setLiaison function to be called with the incorrect username
    expect(setLiaison.mock.calls[1][0]).not.toBe(selectArray[2].username)
    //Expect the setLiaison function to be called with the incorrect proposalCode
    expect(setLiaison.mock.calls[1][1]).not.toBe(proposals[0].proposalCode)
  })
})

// Checking if the requestSummary function works properly in LiaisonTable Component
describe("LiaisonTable Component", () => {
  it("requestSummary function should be called with the correct proposalCode", () => {
    const wrapper = mount(<LiaisonTable
      proposals= {proposals}
      initProposals= {initProposals}
      semester= {semester}
      canAssign= {canAssign[0]}
      selectArray= {selectArray}
      username = {username}
      requestSummary= {requestSummary}
      setLiaison= {setLiaison} />)

    wrapper.find('.file-download').at(0).simulate('click');
    //Expect the requestSummary function to be called once
    expect(requestSummary.mock.calls.length).toBe(1)
    //Expect the requestSummary function to be called with the correct semester
    expect(requestSummary.mock.calls[0][1]).toBe(proposals[0].proposalCode)
    //Expect the requestSummary function to be called with the correct semester
    expect(requestSummary.mock.calls[0][2]).toBe(semester)

    wrapper.find('.file-download').at(1).simulate('click');
    //Expect the requestSummary function to be called twice
    expect(requestSummary.mock.calls.length).toBe(2)
    //Expect the requestSummary function to be called with the proposalCode
    expect(requestSummary.mock.calls[1][1]).toBe(proposals[1].proposalCode)
    //Expect the requestSummary function to be called with the correct semester
    expect(requestSummary.mock.calls[1][2]).toBe(semester)

    wrapper.find('.file-download').at(1).simulate('click');
    //Expect the requestSummary function to be called three times
    expect(requestSummary.mock.calls.length).toBe(3)
    //Expect the requestSummary function to be called with the incorrect proposalCode
    expect(requestSummary.mock.calls[1][1]).not.toBe(proposals[0].proposalCode)
    //Expect the requestSummary function to be called with the incorrect semester
    expect(requestSummary.mock.calls[1][2]).not.toBe('2017-1')
  })
})

// Checking if the drop down exist only for ADMINISTRATOR in LiaisonTable Component
describe("LiaisonTable Component", () => {
  it("Drop down should exist if the user is an ADMINISTRATOR", () => {
    const wrapper = mount(<LiaisonTable
      proposals= {proposals}
      initProposals= {initProposals}
      semester= {semester}
      canAssign= {canAssign[0]}
      selectArray= {selectArray}
      username = {username}
      requestSummary= {requestSummary}
      setLiaison= {setLiaison} />)
      // Drop down exists
      expect(wrapper.find('.setLiaison').exists()).toBe(true)
      // Checkbox does not exist
      expect(wrapper.find('.saAssign').exists()).toBe(false)
  })

  it("Drop down should not exist but checkbox should if user is not an ADMINISTRATOR", () => {
    const wrapper = shallow(<LiaisonTable
      proposals= {proposals}
      initProposals= {initProposals}
      semester= {semester}
      canAssign= {canAssign[1]}
      selectArray= {selectArray}
      username = {username}
      requestSummary= {requestSummary}
      setLiaison= {setLiaison} />)
      // Drop down does not exists
      expect(wrapper.find('.setLiaison').exists()).toBe(false)
      // Checkbox exist
      expect(wrapper.find('.saAssign').exists()).toBe(true)
  })
})
