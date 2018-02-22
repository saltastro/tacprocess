import React from "react";
import renderer from "react-test-renderer";
import { shallow, mount, render } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import ObservingStatisticsSeeing from "./ObservingStatisticsSeeing";

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
    requestedTime: {
      minimum: 26350,
      semester: "2018-1",
      requests: { OTH: 0, POL: 85000}
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
    requestedTime: {
      minimum: 26350,
      semester: "2017-2",
      requests: { OTH: 0, POL: 85000}
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

const partners = ['UW', 'RSA'];

// Checking if the ObservingStatisticsSeeing Component renders correctly for different input
describe("ObservingStatisticsSeeing Component", () => {

  //Enzyme method testing if it renders correctly with empty values of the proposals, semester, and partner
  it("Render the ObservingStatisticsSeeing Component having unpopulated props with no errors", () => {
    const rendered = mount(<ObservingStatisticsSeeing proposals={[]} partner={""} />);
    expect(shallowToJson(rendered)).toMatchSnapshot();
  });

  // it("Render the ObservingStatisticsSeeing Component having populated props with no errors", () => {
  //   const rendered = mount(<ObservingStatisticsSeeing proposals={proposals} partner={partners[0]} />);
  //   expect(shallowToJson(rendered)).toMatchSnapshot();
  // });
});
