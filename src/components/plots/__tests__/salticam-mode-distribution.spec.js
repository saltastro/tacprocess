import React from "react";
import renderer from "react-test-renderer";
import { shallow, mount, render } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import SalticamModeDistribution from "../SalticamModeDistribution";
import {observingTimeForInstrument} from '../../../util';

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

// Checking if the SalticamModeDistribution Component renders correctly for different input
describe("SalticamModeDistribution Component", () => {
  const semesters = ['2017-1', '2018-1'];
  const partners = ['UW', 'RSA'];

  //Enzyme method testing if it renders correctly with empty values of the proposals, semester, and partner
  it("Render the SalticamModeDistribution Component having unpopulated props with no errors", () => {
    const rendered = mount(<SalticamModeDistribution proposals={[]} semester={""} partner={""}  />);
    expect(shallowToJson(rendered)).toMatchSnapshot();
  });

  it("Render the SalticamModeDistribution Component having populated props with no errors", () => {
    const rendered = mount(<SalticamModeDistribution proposals={proposals} semester={semesters[0]} partner={partners[0]}  />);
    expect(shallowToJson(rendered)).toMatchSnapshot();
  });
  it("Render the SalticamModeDistribution Component having populated props with no errors", () => {
    const rendered = mount(<SalticamModeDistribution proposals={proposals} semester={semesters[1]} partner={partners[1]}  />);
    expect(shallowToJson(rendered)).toMatchSnapshot();
  });
});

// Checking the observing time for the SalticamModeDistribution
describe("Observing time for the SalticamModeDistribution", () => {
  //Testing for a wrong semester
  it('Should return zero for a wrong semester', () => {
    const result = observingTimeForInstrument(proposals, '2019-1', 'Wrong Intrument', 'Wrong Dictator Mode', 'Wrong Value', 'Wrong Partner');
    expect(result).toBe(0);
  });
  //Testing for the correct semester and partner
  it("Should return the correct observing time for the SalticamModeDistribution for a semester and partner", () => {
    const result = observingTimeForInstrument(proposals, '2018-1', 'SCAM', {field: 'dictatorMode', value: 'NORMAL', partner: 'RSA'});
    expect(result).toBe(950);
  });
  it("Should return the correct observing time for the SalticamModeDistribution for a semester and partner", () => {
    const result = observingTimeForInstrument(proposals, '2017-1', 'SCAM', {field: 'dictatorMode', value: 'NORMAL', partner: 'RSA'});
    expect(result).toBe(150);
  });
  //Testing for the correct semester and all partners
  it("Should return the correct observing time for the SalticamModeDistribution for a semester and all partner", () => {
    const result = observingTimeForInstrument(proposals, '2018-1', 'SCAM', {field: 'dictatorMode', value: 'NORMAL', partner: 'All'});
    expect(result).toBe(1500);
    const result1 = observingTimeForInstrument(proposals, '2018-1', 'SCAM', {field: 'dictatorMode', value: 'NORMAL'});
    expect(result1).toBe(1500);
  });
  it("Should return the correct observing time for the SalticamModeDistribution for a semester and all partner", () => {
    const result = observingTimeForInstrument(proposals, '2017-1', 'SCAM', {field: 'dictatorMode', value: 'NORMAL', partner: 'All'});
    expect(result).toBe(600);
    const result1 = observingTimeForInstrument(proposals, '2017-1', 'SCAM', {field: 'dictatorMode', value: 'NORMAL'});
    expect(result1).toBe(600);
  });
});
