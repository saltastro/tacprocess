import React from "react";

import propTypes  from "prop-types"

const InLineError = ({ text}) => (
  <span style={{ color: "#ae5856"}}>
    {text}<br />
  </span>
);

InLineError.propTypes = {
  text: propTypes.string.isRequired
}

export default InLineError
