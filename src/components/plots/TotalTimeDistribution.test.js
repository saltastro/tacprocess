import React from "react";
import renderer from "react-test-renderer";
import { shallow, mount, render } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import TotalTimeDistribution from "./TotalTimeDistribution";
import {proposalObservingTime} from '../../util';

const proposals = [
  {
    transparency: 'Clear',
    maxSeeing: 2,
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

// Checking if the TotalTimeDistribution Component renders correctly for different input
describe("TotalTimeDistribution Component", () => {
  const semester = '2017-1';
  const partners = ['UW', 'RSA'];

  //Enzyme method testing if it renders correctly with empty values of the proposals, semester, and partner
  it("Render the TotalTimeDistribution Component having unpopulated props with no errors", () => {
    const rendered = mount(<TotalTimeDistribution proposals={[]} semester={""} partner={""}  />);
    expect(shallowToJson(rendered)).toMatchSnapshot();
  });

  it("Render the TotalTimeDistribution Component having populated props with no errors", () => {
    const rendered = mount(<TotalTimeDistribution proposals={proposals} semester={semester} partner={partners[0]}  />);
    expect(shallowToJson(rendered)).toMatchSnapshot();
  });

  it("Render the TotalTimeDistribution Component having populated props with no errors", () => {
    const rendered = mount(<TotalTimeDistribution proposals={proposals} semester={semester} partner={partners[1]}  />);
    expect(shallowToJson(rendered)).toMatchSnapshot();
  });
});

// Checking the observing time for the TotalTimeDistribution
describe("Observing time for the TotalTimeDistribution", () => {
  //Testing for a wrong semester
  it('Should return zero for a wrong semester', () => {
    const result = proposalObservingTime(proposals[0], '2019-1');
    expect(result).toBe(0);
  });
  it('Should return zero for a wrong semester', () => {
    const result = proposalObservingTime(proposals[1], '2019-1');
    expect(result).toBe(0);
  });
  //Testing for the correct semester and partner
  it("Should return the correct observing time for the TotalTimeDistribution for a semester and partner", () => {
    const result = proposalObservingTime(proposals[0], '2018-1', 'RSA');
    expect(result).toBe(550);
  });
  it("Should return the correct observing time for the TotalTimeDistribution for a semester and partner", () => {
    const result = proposalObservingTime(proposals[1], '2017-1', 'RSA');
    expect(result).toBe(150);
  });
  //Testing for the correct semester and all partners
  it("Should return the correct observing time for the TotalTimeDistribution for a semester and all partner", () => {
    const result = proposalObservingTime(proposals[0], '2018-1', 'All');
    expect(result).toBe(1050);
    const result1 = proposalObservingTime(proposals[0], '2018-1');
    expect(result1).toBe(1050);
  });
  it("Should return the correct observing time for the TotalTimeDistribution for a semester and all partner", () => {
    const result = proposalObservingTime(proposals[1], '2017-1', 'All');
    expect(result).toBe(600);
    const result1 = proposalObservingTime(proposals[1], '2017-1');
    expect(result1).toBe(600);
  });
});
