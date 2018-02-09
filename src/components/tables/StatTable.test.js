import React from "react";
import renderer from "react-test-renderer";
import { shallow, mount, render } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import StatPropos from "./StatTable";

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

const allocatedTimes = [
  {
    UW: { p0: 0, p1: 0, p2: 0, p3: 0, p4: 0},
    UKSC: { p0: 0, p1: 0, p2: 0, p3: 0, p4: 0}
  },
  {
    UKSC: { p0: 0, p1: 0, p2: 0, p3: 0, p4: 0},
  }
];

// Checking if the StatPropos Component renders correctly for different input
describe("StatPropos Component", () => {
  const semesters = ['2017-1', '2018-1'];
  const partners = ['UW', 'RSA'];

  //Enzyme method testing if it renders correctly with empty values of the proposals, semester, and partner
  it("Render the StatPropos Component having unpopulated props with no errors", () => {
    const rendered = mount(<StatPropos proposals={[]} allocatedTime={{}} semester={""} partner={""}  />);
    expect(shallowToJson(rendered)).toMatchSnapshot();
  });

  it("Render the StatPropos Component having populated props with no errors", () => {
    const rendered = mount(<StatPropos proposals={proposals} allocatedTime={allocatedTimes[0]} semester={semesters[0]} partner={partners[0]}  />);
    expect(shallowToJson(rendered)).toMatchSnapshot();
  });
  it("Render the StatPropos Component having populated props with no errors", () => {
    const rendered = mount(<StatPropos proposals={proposals} allocatedTime={allocatedTimes[1]} semester={semesters[1]} partner={partners[1]}  />);
    expect(shallowToJson(rendered)).toMatchSnapshot();
  });
});
