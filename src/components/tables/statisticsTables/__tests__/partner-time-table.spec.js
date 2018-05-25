import React from 'react'
import renderer from 'react-test-renderer'
import { shallow, mount, render } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import PartnerTimeTable from './PartnerTimeTable'

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
        distribution: [ { partnerCode: 'RSA', time: 150 }, { partnerCode: 'UW', time: 200 }, { partnerCode: 'IUCAA', time: 250 } ]
      },
      {
        semester: '2018-1',
        distribution: [ { partnerCode: 'RSA', time: 400 }, { partnerCode: 'UW', time: 50 } ]
      }
    ],
    allocatedTime:
      {
        UW: { p0: 0, p1: 0, p2: 0, p3: 0, p4: 0, p0p1: 0},
        UKSC: { p0: 0, p1: 0, p2: 0, p3: 0, p4: 0, p0p1: 0}
      }
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
        distribution: [ { partnerCode: 'RSA', time: 150 }, { partnerCode: 'UW', time: 200 }, { partnerCode: 'IUCAA', time: 250 } ]
      },
      {
        semester: '2018-1',
        distribution: [ { partnerCode: 'RSA', time: 400 }, { partnerCode: 'UW', time: 50 } ]
      }
    ]
  }
]

const semesters = ['2017-1', '2018-1']
const partners = ['UW', 'RSA']
const allocatedTime = {
  DUR: { p0:0, p1: 54720, p2: 54720, p3: 8200, p4: 0}
}

// Checking if the PartnerTimeTable Component renders correctly for different inputs
describe('PartnerTimeTable Component', () => {
  // Enzyme method testing if it renders correctly with empty value of the target
  it('Render the PartnerTimeTable Component having unpopulated props with no errors', () => {
    const rendered = mount(<PartnerTimeTable proposals={ [] } semester='' partner='' allocatedTime={ {} } />)
    expect(shallowToJson(rendered)).toMatchSnapshot()
  })

  it('Render the PartnerTimeTable Component having populated props with no errors', () => {
    const rendered = mount(<PartnerTimeTable proposals={ proposals } semester={ semesters[ 0 ] } partner={ partners[ 0 ] } allocatedTime={ allocatedTime } />)
    expect(shallowToJson(rendered)).toMatchSnapshot()
  })

})
