import React from 'react';
import propTypes from "prop-types";

const Selector =  ({ options, name })  => (
  <div className="selector-div">
    <span> { name } </span>
    <select
      name="Semester"
      className="selector">
      {options.map(semester =>
         <option> {semester} </option>
      )}
    </select>
  </div>

  )

  Selector.propTypes = {
    options: propTypes.string.isRequired,
    name: propTypes.string.isRequired
  }

export default Selector;
