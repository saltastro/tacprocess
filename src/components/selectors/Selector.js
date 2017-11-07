import React from 'react';
import propTypes from "prop-types";

const Selector =  ({ options, name })  => (
  <div className="selector-div">
    <span> { name } </span>
    <select
      name={ name }
      className="selector">
      {options.map((semester, index) =>
         <option key={index}> {semester} </option>
      )}
    </select>
  </div>

  )

  Selector.propTypes = {
    options: propTypes.array.isRequired,
    name: propTypes.string.isRequired
  }

export default Selector;
