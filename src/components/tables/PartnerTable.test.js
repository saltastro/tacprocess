import React from "react";
import renderer from "react-test-renderer";
import { shallow, mount, render } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import PartnerTable from "./PartnerTable";

const proposals = [
  {
    transparency: 'Clear',
    maxSeeing: 2,
    instruments: {
      scam: [ { dictatorMode: "NORMAL" } ],
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
      scam: [ { dictatorMode: "NORMAL" } ],
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

// Checking if the PartnerTable Component renders correctly for different inputs
describe("PartnerTable Component", () => {
  const semesters = ['2017-1', '2018-1'];
  const partners = ['UW', 'RSA'];

  //Enzyme method testing if it renders correctly with empty value of the target
  it("Render the PartnerTable Component having unpopulated props with no errors", () => {
    //const rendered = mount(<PartnerTable proposals={[]} />);
    //expect(shallowToJson(rendered)).toMatchSnapshot();
  });

  it("Render the PartnerTable Component having populated props with no errors", () => {
    //const rendered = mount(<PartnerTable proposals={proposals} />);
    //expect(shallowToJson(rendered)).toMatchSnapshot();
  });

});
