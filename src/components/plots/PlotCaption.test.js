import React from 'react'
import renderer from 'react-test-renderer'
import { shallow, mount, render } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import PlotCaption from './PlotCaption'

const caption ='The Plot Caption'

// Checking if the PlotCaption Component renders correctly for different inputs
describe('PlotCaption Component', () => {

  // Enzyme method testing if it renders correctly with empty value of the target
  it('Render the PlotCaption Component having unpopulated props with no errors', () => {
    const rendered = mount(<PlotCaption caption='' />)
    expect(shallowToJson(rendered)).toMatchSnapshot()
  })

  it('Render the PlotCaption Component having populated props with no errors', () => {
    const rendered = mount(<PlotCaption caption={ caption } />)
    expect(shallowToJson(rendered)).toMatchSnapshot()
  })

})
