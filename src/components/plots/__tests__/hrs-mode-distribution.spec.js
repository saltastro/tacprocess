import React from "react";
import renderer from "react-test-renderer";
import { shallow, mount, render } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import HrsModeDistribution from "../HrsModeDistribution";
import {observingTimeForInstrument} from '../../../util';

const proposals = [{
    transparency: 'Clear',
    maxSeeing: 2,
    instruments: {
      hrs: [ { exposureMode: "HIGH RESOLUTION" } ],
      rss: [ { dictatorMode: 'NORMAL', mode: 'Spectroscopy' } ],
      scam: [ { dictatorMode: "NORMAL" } ],
    },
    timeRequests: [
      {
        semester: '2018-1',
        distribution: [ { partnerCode: 'RSA', time: 150 }, { partnerCode: 'UW', time: 200 }, { partnerCode: 'IUCAA', time: 250 }, ]
      },
      {
        semester: '2018-1',
        distribution: [ { partnerCode: 'RSA', time: 400 }, { partnerCode: 'UW', time: 50 }, ]
      }
    ]
}];

// Checking if the HrsModeDistribution Component renders correctly for different input
describe("HrsModeDistribution Component", () => {
  const semester = '2017-1';
  const partner = 'UW';

  //Enzyme method testing if it renders correctly with empty values of the proposals, semester, and partner
  it("Render the HrsModeDistribution Component having unpopulated props with no errors", () => {
    const rendered = mount(<HrsModeDistribution proposals={[]} semester={""} partner={""}  />);
    expect(shallowToJson(rendered)).toMatchSnapshot();
  });

  it("Render the HrsModeDistribution Component having populated props with no errors", () => {
    const rendered = mount(<HrsModeDistribution proposals={proposals} semester={semester} partner={partner}  />);
    expect(shallowToJson(rendered)).toMatchSnapshot();
  });
});

// Checking the observing time for the InstrumentDistribution
describe("Observing time for the HrsModeDistribution", () => {
  //Testing for a wrong semester
  it('Should return zero for a wrong semester', () => {
    const result = observingTimeForInstrument(proposals, '2019-1', 'Wrong Intrument', 'Wrong Dictator Mode', 'Wrong Value', 'Wrong Partner');
    expect(result).toBe(0);
  });
  //Testing for the correct semester and partner
  it("Should return the correct observing time for the HrsModeDistribution for a semester and partner", () => {
    const result = observingTimeForInstrument(proposals, '2018-1', 'HRS', {field: 'exposureMode', value: 'HIGH RESOLUTION', partner: 'RSA'});
    expect(result).toBe((550)*(1/3));
  });
  //Testing for the correct semester and all partners
  it("Should return the correct observing time for the HrsModeDistribution for a semester and all partner", () => {
    const result = observingTimeForInstrument(proposals, '2018-1', 'HRS', {field: 'exposureMode', value: 'HIGH RESOLUTION', partner: 'All'});
    expect(result).toBe((1050)*(1/3));
    const result1 = observingTimeForInstrument(proposals, '2018-1', 'HRS', {field: 'exposureMode', value: 'HIGH RESOLUTION'});
    expect(result1).toBe(1050*(1/3));
  });
});
