/* eslint-env jest */
import MockDate from "mockdate"
import {semestersArray} from "../filters"
import {ADMINISTRATOR, SALT_ASTRONOMER, TAC_CHAIR, TAC_MEMBER} from "../../types"

describe('it should return correct semester for different users', () => {
	
	it('Admins and SAs should have the same semesters', () => {
		expect(semestersArray([{type: ADMINISTRATOR}])).toEqual(semestersArray([{type: SALT_ASTRONOMER}]));
	});
	it('Tac chair and TAC members should have the same semesters', () => {
		expect(semestersArray([{type: TAC_MEMBER}])).toEqual(semestersArray([{type: TAC_CHAIR}]));
	});
	it('should have at least 2016-1 for admins', () => {
		expect(semestersArray([{type: ADMINISTRATOR}])).toContain("2016-1")
	});
	it('should not have 2016-1 for Tac chair and members', () => {
		expect(semestersArray([{type: TAC_CHAIR}, {type: TAC_MEMBER}])).not.toContain("2016-1");
	});
	it('should have at least 2018-1 and 2020-2 if date is 04/01/2018 for ADMINs and SAs', () => {
		MockDate.set('04/01/2018');
		expect(semestersArray([{type: ADMINISTRATOR}])).toContain("2018-1");
		expect(semestersArray([{type: SALT_ASTRONOMER}])).toContain("2020-2");
	});
	it('should be exactly [2017-2, 2018-1] if date is 04/01/2018 for Tac chair and members', () => {
		MockDate.set('04/01/2018');
		expect(semestersArray([{type: TAC_CHAIR}]).sort()).toEqual(["2017-2", "2018-1"])
	});
	it('should only have 2018-1 if date is 05/01/2018 for Tac chair and members', () => {
		MockDate.set('05/01/2018');
		expect(semestersArray([{type: TAC_CHAIR}])).toEqual(["2018-1"]);
		expect(semestersArray([{type: TAC_MEMBER}])).toEqual(["2018-1"]);
	});
	it('Any user should not get semester less that 2006-1', () => {
		expect(semestersArray([{type: ADMINISTRATOR}]).sort()).not.toContain("2005-2")
	});
	afterEach(() => {
		MockDate.reset();
	});
	
	
});