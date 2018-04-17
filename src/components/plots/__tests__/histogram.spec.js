import React from "react";
import renderer from "react-test-renderer";
import { shallow, mount, render } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Histogram from "../Histogram";

const datasets = [
  {
    className: "all-partners",
    data: {Any: 340, Clear: 450, ThickCloud: 0, Thincloud: 2258}
  },
  {
    className: "all-partners",
    data: {Any: 350, Clear: 350, ThickCloud: 10, Thincloud: 1258}
  }
];
const keys = ["Clear", "Thincloud", "ThickCloud", "Any"];
const xLabels = ["X-Lable", "X-Lable1"];
const yLabels = ["Y-Label", "Y-Lable1"];

// Checking if the Histogram Component renders correctly for different inputs
describe("Histogram Component", () => {

  //Enzyme method testing if it renders correctly with empty value of the target
  it("Render the Histogram Component having unpopulated props with no errors", () => {
    const rendered = mount(<Histogram datasets={[]} keys={[]} xLabel={""} yLabel={""} />);
    expect(shallowToJson(rendered)).toMatchSnapshot();
  });

  it("Render the Histogram Component having populated props with no errors", () => {
    const rendered = mount(<Histogram datasets={datasets} keys={keys} xLabel={xLabels[0]} yLabel={yLabels[0]} />);
    expect(shallowToJson(rendered)).toMatchSnapshot();
  });
  it("Render the Histogram Component having populated props with no errors", () => {
    const rendered = mount(<Histogram datasets={datasets} keys={keys} xLabel={xLabels[1]} yLabel={yLabels[1]} />);
    expect(shallowToJson(rendered)).toMatchSnapshot();
  });
});
