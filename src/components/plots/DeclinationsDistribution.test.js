import React from "react";
import renderer from "react-test-renderer";
import { shallow, mount, render } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import DeclinationDistribution from "./DeclinationDistribution";

const targets = [
  {
    targetId: "Target: Target_Id 18378 Target_Id 18378 Name: 0, dtype: object",
    optional: true,
    ra: 0,
    dec: 0
  },
  {
    targetId: "Target: Target_Id 18378 Target_Id 18378 Name: 0, dtype: object",
    optional: true,
    ra: 231.25,
    dec: 358.333
  }
];

// Checking if the DeclinationDistribution Component renders correctly for different inputs
describe("DeclinationsDistribution Component", () => {

  //Enzyme method testing if it renders correctly with empty value of the target
  it("Render the DeclinationDistribution Component having unpopulated props with no errors", () => {
    const rendered = mount(<DeclinationDistribution targets={[]}  />);
    expect(shallowToJson(rendered)).toMatchSnapshot();
  });

  it("Render the DeclinationDistribution Component having populated props with no errors", () => {
    const rendered = mount(<DeclinationDistribution targets={targets} />);
    expect(shallowToJson(rendered)).toMatchSnapshot();
  });
});
