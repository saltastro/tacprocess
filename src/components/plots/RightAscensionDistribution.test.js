import React from "react";
import renderer from "react-test-renderer";
import { shallow, mount, render } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import RightAscensionDistribution from "./RightAscensionDistribution";

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
    ra: 5698.3330,
    dec: 4586.235
  }
];

// Checking if the RightAscensionDistribution Component renders correctly for different inputs
describe("RightAscensionDistribution Component", () => {

  //Enzyme method testing if it renders correctly with empty value of the target
  it("Render the RightAscensionDistribution Component having unpopulated props with no errors", () => {
    const rendered = mount(<RightAscensionDistribution targets={[]}  />);
    expect(shallowToJson(rendered)).toMatchSnapshot();
  });

  it("Render the RightAscensionDistribution Component having populated props with no errors", () => {
    const rendered = mount(<RightAscensionDistribution targets={targets} />);
    expect(shallowToJson(rendered)).toMatchSnapshot();
  });
});
