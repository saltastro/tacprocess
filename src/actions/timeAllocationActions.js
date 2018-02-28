import { queryPartnerAllocations } from "../api/graphQL"
import { TIME_ALLOCATIONS_QUERY_START,
	TIME_ALLOCATIONS_QUERY_FAIL,
	TIME_ALLOCATIONS_QUERY_PASS,
	SUBMIT_TIME_ALLOCATIONS_START,
	SUBMIT_TIME_ALLOCATIONS_PASS,
	SUBMIT_TIME_ALLOCATIONS_FAIL,
	ALL_PARTNER
} from "../types";


const startQuery = () => ({
	type: TIME_ALLOCATIONS_QUERY_START
});

const failQuery = (error) => ({
	type: TIME_ALLOCATIONS_QUERY_FAIL,
	payload: { error }
});

export const passQuery = data => ({
	type: TIME_ALLOCATIONS_QUERY_PASS,
	timeallocation: data
});

export const startSubmittingTimeAllocations = () => ({
	type: SUBMIT_TIME_ALLOCATIONS_START,

});

export const TimeAllocationSubmittedSuccessfully = partner => ({
	type: SUBMIT_TIME_ALLOCATIONS_PASS,
	payload: {partner: partner}
});

export const failToSubmitTimeAllocations = (partner, error) => ({
	type: SUBMIT_TIME_ALLOCATIONS_FAIL,
	payload: {
		partner,
		error}
});

const convertData = (data) => {
	let availableTime = {
		[ALL_PARTNER] :{
		p0p1: 0,
		p2: 0,
		p3: 0
	}};
	data.partnerAllocations.forEach( (a, i) => {
		const partner = !!a.code ? a.code : ALL_PARTNER;
		if (partner === ALL_PARTNER){
				availableTime[partner].p0p1 += a.allocatedTime.AllocatedP0P1;
				availableTime[partner].p2 += a.allocatedTime.AllocatedP2;
				availableTime[partner].p3 += a.allocatedTime.AllocatedP3;

		} else {
			availableTime[partner] = {
					p0p1: a.allocatedTime.AllocatedP0P1,
					p2: a.allocatedTime.AllocatedP2,
					p3: a.allocatedTime.AllocatedP3
			}}
	});
	return availableTime
};

export const storePartnerAllocations = (semester, partner="All") => function fits(dispatch) {
	dispatch(startQuery);
	queryPartnerAllocations(semester, partner).then( res => {
		dispatch(passQuery(convertData(res.data.data)))
	}).catch((e) => {
		console.log(e);
		dispatch(failQuery(e.message))
	})

};
