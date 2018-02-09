import React from "react";
import renderer from "react-test-renderer";
import { shallow, mount, render } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import ProposalTable from "./ProposalTable";

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
    ]
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

// Checking if the ProposalTable Component renders correctly for different inputs
describe("ProposalTable Component", () => {

  //Enzyme method testing if it renders correctly with empty value of the target
  it("Render the ProposalTable Component having unpopulated props with no errors", () => {
    const rendered = mount(<ProposalTable proposals={[]} />);
    expect(shallowToJson(rendered)).toMatchSnapshot();
  });

  it("Render the ProposalTable Component having populated props with no errors", () => {
    const rendered = mount(<ProposalTable proposals={proposals} />);
    expect(shallowToJson(rendered)).toMatchSnapshot();
  });

});
