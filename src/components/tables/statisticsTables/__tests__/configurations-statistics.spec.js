import React from "react";
import renderer from "react-test-renderer";
import { shallow, mount, render } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import ConfigurationsStatistics from "../ConfigurationStatistics";

const proposals = [
  {
    transparency: 'Clear',
    maxSeeing: 2,
    instruments: {
      hrs: [ { exposureMode: "HIGH RESOLUTION" } ],
      rss: [ { dictatorMode: 'NORMAL', mode: 'Spectroscopy' } ],
      scam: [ { dictatorMode: "NORMAL" } ],
      bvit: [{type: "BVIT"}]
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
    ]
  },
  {
    transparency: 'Thin cloud',
    maxSeeing: 2,
    instruments: {
      hrs: [ { exposureMode: "HIGH RESOLUTION" } ],
      rss: [ { dictatorMode: 'NORMAL', mode: 'Spectroscopy' } ],
      scam: [ { dictatorMode: "NORMAL" } ],
      bvit: [{type: "BVIT"}]
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
];

// Checking if the ConfigurationsStatistics Component renders correctly for different input
describe("ConfigurationsStatistics Component", () => {

  //Enzyme method testing if it renders correctly with empty values of the proposals, semester, and partner
  it("Render the ConfigurationsStatistics Component having unpopulated props with no errors", () => {
    const rendered = mount(<ConfigurationsStatistics proposals={[]}  />);
    expect(shallowToJson(rendered)).toMatchSnapshot();
  });

  it("Render the ConfigurationsStatistics Component having populated props with no errors", () => {
    const rendered = mount(<ConfigurationsStatistics proposals={proposals}  />);
    expect(shallowToJson(rendered)).toMatchSnapshot();
  });
});
