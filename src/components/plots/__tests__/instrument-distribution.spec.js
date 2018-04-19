import React from "react";
import renderer from "react-test-renderer";
import { shallow, mount, render } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import InstrumentDistribution from "../InstrumentDistribution";
import {observingTimeForInstrument} from '../../../util';

const proposals = [{
    transparency: 'Clear',
    maxSeeing: 2,
    instruments: {
      scam: [ {   dictatorMode: "NORMAL" } ],
    },
    timeRequests: [
      {
        semester: '2018-1',
        distribution: [ { partnerCode: 'RSA',   time: 150 }, { partnerCode: 'UW', time: 200 }, { partnerCode: 'IUCAA', time: 250 } ]
      },
      {
        semester: '2017-1',
        distribution: [ { partnerCode: 'RSA', time: 400 }, { partnerCode: 'UW', time: 50 }, ]
      }
    ]
}];

// Checking if the InstrumentDistribution Component renders correctly for different input
describe("InstrumentDistribution Component", () => {
  const semesters = ['2017-1', '2018-1'];
  const partners = ['UW', 'RSA'];

  //Enzyme method testing if it renders correctly with empty values of the proposals, semester, and partner
  it("Render the InstrumentDistribution Component having unpopulated props with no errors", () => {
    const rendered = mount(<InstrumentDistribution proposals={[]} semester={""} partner={""}  />);
    expect(shallowToJson(rendered)).toMatchSnapshot();
  });

  it("Render the InstrumentDistribution Component having populated props with no errors", () => {
    const rendered = mount(<InstrumentDistribution proposals={proposals} semester={semesters[0]} partner={partners[0]}  />);
    expect(shallowToJson(rendered)).toMatchSnapshot();
  });
  it("Render the InstrumentDistribution Component having populated props with no errors", () => {
    const rendered = mount(<InstrumentDistribution proposals={proposals} semester={semesters[1]} partner={partners[1]}  />);
    expect(shallowToJson(rendered)).toMatchSnapshot();
  })
});

// Checking the observing time for the InstrumentDistribution
describe("Observing time for the InstrumentDistribution", () => {
  //Testing for a wrong semester
  it('Should return zero for a wrong semester', () => {
    const result = observingTimeForInstrument(proposals, '2019-1', 'Wrong Intrument', 'Wrong Dictator Mode', 'Wrong Value', 'Wrong Partner');
    expect(result).toBe(0);
  });
  //Testing for the correct semester and partner
  it("Should return the correct observing time for the InstrumentDistribution for a semester and partner", () => {
    const result = observingTimeForInstrument(proposals, '2018-1', 'SCAM', {field: 'dictatorMode', value: 'NORMAL', partner: 'RSA'});
    expect(result).toBe(150);
  });
  it("Should return the correct observing time for the InstrumentDistribution for a semester and partner", () => {
    const result = observingTimeForInstrument(proposals, '2017-1', 'SCAM', {field: 'dictatorMode', value: 'NORMAL', partner: 'RSA'});
    expect(result).toBe(400);
  });
  //Testing for the correct semester and all partners
  it("Should return the correct observing time for the InstrumentDistribution for a semester and all partner", () => {
    const result = observingTimeForInstrument(proposals, '2018-1', 'SCAM', {field: 'dictatorMode', value: 'NORMAL', partner: 'All'});
    expect(result).toBe(600);
    const result1 = observingTimeForInstrument(proposals, '2018-1', 'SCAM', {field: 'dictatorMode', value: 'NORMAL'});
    expect(result1).toBe(600);
  });
  it("Should return the correct observing time for the InstrumentDistribution for a semester and all partner", () => {
    const result = observingTimeForInstrument(proposals, '2017-1', 'SCAM', {field: 'dictatorMode', value: 'NORMAL', partner: 'All'});
    expect(result).toBe(450);
    const result1 = observingTimeForInstrument(proposals, '2017-1', 'SCAM', {field: 'dictatorMode', value: 'NORMAL'});
    expect(result1).toBe(450);
  });
});
