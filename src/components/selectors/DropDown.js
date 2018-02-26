import React from "react";
import propTypes from "prop-types";
import Select from "react-select";
import { listForDropdown } from "../../util/filters";

const compareByValue = (a, b) => {
	const name1 = a.value;
	const name2 = b.value;
	if (name1 < name2) {
		return -1;
	}
	if (name1 > name2) {
		return 1;
	}
	return 0;
};

const DropDown = ({listToDisplay, name, OnChange, value, className}) => {
	return(
		<div className={className || "left"}>
			<label>{name}</label>
			<Select
				className ="selector"
				name={name}
				options={listForDropdown(listToDisplay).sort(compareByValue)}
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
};

export default DropDown;

