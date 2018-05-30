import React from 'react'
import renderer from 'react-test-renderer'
import { shallow, mount, render } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import RssModeDistribution from './RssModeDistribution'
import {observingTimeForInstrument} from '../../util'

const proposals = [
  {
    transparency: 'Clear',
    maxSeeing: 2,
    instruments: {
      scam: [ { dictatorMode: 'NORMAL' } ],
    },
    timeRequests: [
      {
        semester: '2018-1',
        distribution: [ { partnerCode: 'RSA', time: 350 }, { partnerCode: 'UW', time: 200 }, { partnerCode: 'IUCAA', time: 250 }, ]
      },
      {
        semester: '2017-2',
        distribution: [ { partnerCode: 'RSA', time: 500 }, { partnerCode: 'UW', time: 50 }, ]
      }
    ]
  },
  {
      transparency: 'Thin cloud',
      maxSeeing: 2,
      instruments: {
        scam: [ { dictatorMode: 'NORMAL' } ],
      },
      timeRequests: [
        {
          semester: '2017-1',
          distribution: [ { partnerCode: 'RSA', time: 150 }, { partnerCode: 'UW', time: 300 }, { partnerCode: 'IUCAA', time: 550 }, ]
        },
        {
          semester: '2017-2',
          distribution: [ { partnerCode: 'RSA', time: 400 }, { partnerCode: 'UW', time: 100 }, ]
        }
      ]
    }
]

// Checking if the RssModeDistribution Component renders correctly for different input
describe('RssModeDistribution Component', () => {
  const semesters = ['2017-1', '2018-1']
  const partners = ['UW', 'RSA']

  // Enzyme method testing if it renders correctly with empty values of the proposals, semester, and partner
  it('Render the RssModeDistribution Component having unpopulated props with no errors', () => {
    const rendered = mount(<RssModeDistribution proposals={ [] } semester='' partner=''  />)
    expect(shallowToJson(rendered)).toMatchSnapshot()
  })

  it('Render the RssModeDistribution Component having populated props with no errors', () => {
    const rendered = mount(<RssModeDistribution proposals={ proposals } semester={ semesters[ 0 ] } partner={ partners[ 0 ] }  />)
    expect(shallowToJson(rendered)).toMatchSnapshot()
  })
  it('Render the RssModeDistribution Component having populated props with no errors', () => {
    const rendered = mount(<RssModeDistribution proposals={ proposals } semester={ semesters[ 1 ] } partner={ partners[ 1 ] }  />)
    expect(shallowToJson(rendered)).toMatchSnapshot()
  })
})

// Checking the observing time for the RssModeDistribution
describe('Observing time for the RssModeDistribution', () => {
  // Testing for a wrong semester
  it('Should return zero for a wrong semester', () => {
    const result = observingTimeForInstrument(proposals, '2019-1', 'Wrong Intrument', 'Wrong Dictator Mode', 'Wrong Value', 'Wrong Partner')
    expect(result).toBe(0)
  })
  // Testing for the correct semester and partner
  it('Should return the correct observing time for the SalticamModeDistribution for a semester and partner', () => {
    const result = observingTimeForInstrument(proposals, '2018-1', 'SCAM', {field: 'dictatorMode', value: 'NORMAL', partner: 'RSA'})
    expect(result).toBe(350)
  })
  it('Should return the correct observing time for the SalticamModeDistribution for a semester and partner', () => {
    const result = observingTimeForInstrument(proposals, '2017-1', 'SCAM', {field: 'dictatorMode', value: 'NORMAL', partner: 'RSA'})
    expect(result).toBe(150)
  })
  it('Should return the correct observing time for the SalticamModeDistribution for a semester and partner', () => {
    const result = observingTimeForInstrument(proposals, '2017-2', 'SCAM', {field: 'dictatorMode', value: 'NORMAL', partner: 'RSA'})
    expect(result).toBe(900)
  })
  // Testing for the correct semester and all partners
  it('Should return the correct observing time for the SalticamModeDistribution for a semester and all partner', () => {
    const result = observingTimeForInstrument(proposals, '2018-1', 'SCAM', {field: 'dictatorMode', value: 'NORMAL', partner: 'All'})
    expect(result).toBe(800)
    const result1 = observingTimeForInstrument(proposals, '2018-1', 'SCAM', {field: 'dictatorMode', value: 'NORMAL'})
    expect(result1).toBe(800)
  })
  it('Should return the correct observing time for the SalticamModeDistribution for a semester and all partner', () => {
    const result = observingTimeForInstrument(proposals, '2017-1', 'SCAM', {field: 'dictatorMode', value: 'NORMAL', partner: 'All'})
    expect(result).toBe(1000)
    const result1 = observingTimeForInstrument(proposals, '2017-1', 'SCAM', {field: 'dictatorMode', value: 'NORMAL'})
    expect(result1).toBe(1000)
  })
  it('Should return the correct observing time for the SalticamModeDistribution for a semester and all partner', () => {
    const result = observingTimeForInstrument(proposals, '2017-2', 'SCAM', {field: 'dictatorMode', value: 'NORMAL', partner: 'All'})
    expect(result).toBe(1050)
    const result1 = observingTimeForInstrument(proposals, '2017-2', 'SCAM', {field: 'dictatorMode', value: 'NORMAL'})
    expect(result1).toBe(1050)
  })
})
