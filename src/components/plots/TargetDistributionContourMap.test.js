import React from "react";
import renderer from "react-test-renderer";
import { shallow, mount, render } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import TargetDistributionContourMap from "./TargetDistributionContourMap";

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
    ra: 55.363,
    dec: 489.331
  }
];

// Checking if the TargetDistributionContourMap Component renders correctly for different inputs
describe("TargetDistributionScatterPlot Component", () => {

  //Enzyme method testing if it renders correctly with empty value of the target
  it("Render the TargetDistributionContourMap Component having unpopulated props with no errors", () => {
    const rendered = mount(<TargetDistributionContourMap targets={[]}  />);
    expect(shallowToJson(rendered)).toMatchSnapshot();
  });

  it("Render the TargetDistributionContourMap Component having populated props with no errors", () => {
    const rendered = mount(<TargetDistributionContourMap targets={targets} />);
    expect(shallowToJson(rendered)).toMatchSnapshot();
  });
});
