import React from "react";
import propTypes from "prop-types";
import Select from "react-select";
import { listForDropdown } from "../../util/filters";

const DropDown = ({listToDisplay, name, OnChange, value, className}) => {
  return(
    <div className={className || "left"}>
      <h2>{name}</h2>
      <Select
          className ="selector"
          name={name}
          options={listForDropdown(listToDisplay)}
          value={value}
          clearable={false}
          focusedOption={value}
          onChange={ event => OnChange(event.value)}
          />
      </div>
)};

DropDown.propTypes = {
  listToDisplay: propTypes.array.isRequired,
  name: propTypes.string,
  className: propTypes.string,
  OnChange: propTypes.func.isRequired,
}

export default DropDown;
