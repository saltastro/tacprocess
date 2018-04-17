import React from "react";
import renderer from "react-test-renderer";
import { shallow, mount, render } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import TargetDistributionScatterPlot from "../TargetDistributionScatterPlot";

const targets = [{
  targetId: "Target: Target_Id 18378 Target_Id 18378 Name: 0, dtype: object",
  optional: true,
  ra: 0,
  dec: 0
}];

// Checking if the TargetDistributionScatterPlot Component renders correctly for different input
describe("TargetDistributionScatterPlot Component", () => {

  //Enzyme method testing if it renders correctly with empty value of the target
  it("Render the TargetDistributionScatterPlot Component having unpopulated props with no errors", () => {
    const rendered = mount(<TargetDistributionScatterPlot targets={[]}  />);
    expect(shallowToJson(rendered)).toMatchSnapshot();
  });

  it("Render the TargetDistributionScatterPlot Component having populated props with no errors", () => {
    const rendered = mount(<TargetDistributionScatterPlot targets={targets} />);
    expect(shallowToJson(rendered)).toMatchSnapshot();
  });
});
