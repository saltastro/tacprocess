import React from "react";
import Propotypes from "prop-types";

const InLineError = ({ text }) => (
  <span style={{ color: '#ae5856' }}>{ text }</span>
  )

  InLineError.propTypes = {
    text: Propotypes.string.isRequired
  }

export default InLineError;
