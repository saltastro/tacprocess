import React from 'react'
import renderer from 'react-test-renderer'
import { shallow, mount, render } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import TransparencyDistribution from './TransparencyDistribution'
import {observingTimeForTransparency} from '../../util'

const proposals = [{
    transparency: 'Clear',
    maxSeeing: 2,
    timeRequests: [
      {
        semester: '2018-1',
        distribution: [ { partnerCode: 'RSA', time: 150 }, { partnerCode: 'UW', time: 200 }, { partnerCode: 'IUCAA', time: 250 } ]
      },
      {
        semester: '2017-1',
        distribution: [ { partnerCode: 'RSA', time: 400 }, { partnerCode: 'UW', time: 50 }, { partnerCode: 'IUCAA', time: 350 } ]
      }
    ]
  },
  {
    maxSeeing: 2,
    transparency: 'Thin cloud',
    timeRequests: [
      {
        semester: '2018-1',
        distribution: [ { partnerCode: 'UW', time: 250 }, { partnerCode: 'RSA', time: 100 }, { partnerCode: 'IUCAA', time: 350 } ]
      },
      {
        semester: '2017-2',
        distribution: [ { partnerCode: 'RSA', time: 800 }, { partnerCode: 'UW', time: 620 } ]
      }
    ]
  },
  {
    transparency: 'Clear',
    maxSeeing: 2,
    timeRequests: [
      {
        semester: '2018-1',
        distribution: [ { partnerCode: 'UW', time: 550 }, { partnerCode: 'RSA', time: 600 }, { partnerCode: 'IUCAA', time: 150 } ]
      },
      {
        semester: '2017-1',
        distribution: [ { partnerCode: 'RSA', time: 400 }, { partnerCode: 'UW', time: 320 } ]
      }
    ]
  }
]

// Checking if the TransparencyDistribution Component renders correctly for different input
describe('TransparencyDistribution Component', () => {
  const semester = '2017-1'
  const partner = 'UW'

  // Enzyme method testing if it renders correctly with empty values of the proposals, semester, and partner
  it('Render the TransparencyDistribution Component having unpopulated props with no errors', () => {
    const rendered = mount(<TransparencyDistribution proposals={ [] } semester='' partner=''  />)
    expect(shallowToJson(rendered)).toMatchSnapshot()
  })

  it('Render the TransparencyDistribution Component having unpopulated props with no errors', () => {
    const rendered = mount(<TransparencyDistribution proposals={ proposals } semester={ semester } partner={ semester }  />)
    expect(shallowToJson(rendered)).toMatchSnapshot()
  })

})

// Checking the observing time for the TransparencyDistribution
describe('Observing time for the TransparencyDistribution', () => {
  // Testing for a wrong semester
  it('Should return zero for a wrong semester', () => {
    const result = observingTimeForTransparency(proposals, '2019-1', 'Thin cloud')
    expect(result).toBe(0)
  })

  // Testing for a wrong transparency
  it('Should return zero for a wrong transparency', () => {
    const result = observingTimeForTransparency(proposals, '2018-1', 'wrong transparency')
    expect(result).toBe(0)
  })

  // Testing for the correct semester and partner
  it('Should return the correct observing time for the TransparencyDistribution for a semester and partner', () => {
    const result = observingTimeForTransparency(proposals, '2018-1', 'Thin cloud', 'RSA')
    expect(result).toBe(100)
  })
  it('Should return the correct observing time for the TransparencyDistribution for a semester and partner', () => {
    const result = observingTimeForTransparency(proposals, '2018-1', 'Clear', 'UW')
    expect(result).toBe(750)
  })
  it('Should return the correct observing time for the TransparencyDistribution for a semester and partner', () => {
    const result = observingTimeForTransparency(proposals, '2017-1', 'Clear', 'RSA')
    expect(result).toBe(800)
  })

  // Testing for the correct semester and all partners
  it('Should return the correct observing time for the TransparencyDistribution for a semester and all partner', () => {
    const result = observingTimeForTransparency(proposals, '2018-1', 'Thin cloud', 'All')
    expect(result).toBe(700)
    const result1 = observingTimeForTransparency(proposals, '2018-1', 'Thin cloud')
    expect(result1).toBe(700)
  })

})
