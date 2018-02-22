import {
	isNewProposal
} from '../../util/proposal';

describe('isNewProposal', () => {
	it('should work', () => {
		const requestedTime = {
			timeRequests: [
			{
				semester: "2018-1",
			},
			{
				semester: "2017-2",
			},
			{
				semester: "2018-2",
			},
		]};
		
		expect(isNewProposal(requestedTime, "2018-1")).toBe(false);
		expect(isNewProposal(requestedTime, "2018-2")).toBe(false);
		expect(isNewProposal(requestedTime, "2017-2")).toBe(true);
		expect(isNewProposal(requestedTime, "2017-1")).toBe(true);
	})
});