import React from "react";
import renderer from "react-test-renderer";
import { shallow, mount, render } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Plot from "./Plot";

const caption ="The Plot Caption";

// Checking if the Plot Component renders correctly for different inputs
describe("Plot Component", () => {

  //Enzyme method testing if it renders correctly with empty value of the target
  it("Render the Plot Component having unpopulated props with no errors", () => {
    const rendered = mount(<Plot caption={""} />);
    expect(shallowToJson(rendered)).toMatchSnapshot();
  });

  it("Render the Plot Component having populated props with no errors", () => {
    const rendered = mount(<Plot caption={caption} />);
    expect(shallowToJson(rendered)).toMatchSnapshot();
  });

});
