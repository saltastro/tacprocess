TargetStatistics
import React from 'react'
import renderer from 'react-test-renderer'
import { shallow, mount, render } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import TargetStatistics from './TargetStatistics'

const targets = [
  {
    targetId: 'Target: Target_Id 18378 Target_Id 18378 Name: 0, dtype: object',
    optional: true,
    ra: 0,
    dec: 0
  },
  {
    targetId: 'Target: Target_Id 18378 Target_Id 18378 Name: 0, dtype: object',
    optional: true,
    ra: 231.25,
    dec: 358.333
  }
]

// Checking if the TargetStatistics Component renders correctly for different input
describe('TargetStatistics Component', () => {

  // Enzyme method testing if it renders correctly with empty values of the proposals, semester, and partner
  it('Render the TargetStatistics Component having unpopulated props with no errors', () => {
    const rendered = mount(<TargetStatistics targets={ [] }  />)
    expect(shallowToJson(rendered)).toMatchSnapshot()
  })

  it('Render the TargetStatistics Component having populated props with no errors', () => {
    const rendered = mount(<TargetStatistics targets={ targets }  />)
    expect(shallowToJson(rendered)).toMatchSnapshot()
  })
})
