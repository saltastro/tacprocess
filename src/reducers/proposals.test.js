import proposals from "./proposals";

describe("Proposals Reducers Testing", () => {
  const props = [
    {
      transparency: 'Clear',
      maxSeeing: 2,
      instruments: {
        hrs: [ { exposureMode: "HIGH RESOLUTION" } ],
        rss: [ { dictatorMode: 'NORMAL', mode: 'Spectroscopy' } ],
        scam: [ { dictatorMode: "NORMAL" } ],
        bvit: [{type: "BVIT"}]
      },
      timeRequests: [
        {
          semester: '2018-1',
          distribution: [ { partnerCode: 'RSA', time: 150 }, { partnerCode: 'UW', time: 200 }, { partnerCode: 'IUCAA', time: 250 } ]
        },
        {
          semester: '2018-1',
          distribution: [ { partnerCode: 'RSA', time: 400 }, { partnerCode: 'UW', time: 50 } ]
        }
      ],
      techReviews : {
        "2018-1": {
          reviewer: { username: "brent"},
          feasible: "yes",
          comment: "Experienced SALT users. Ongoing program",
          details: null
        }
      }
    },
    {
      transparency: 'Thin cloud',
      maxSeeing: 2,
      instruments: {
        hrs: [ { exposureMode: "HIGH RESOLUTION" } ],
        rss: [ { dictatorMode: 'NORMAL', mode: 'Spectroscopy' } ],
        scam: [ { dictatorMode: "NORMAL" } ],
        bvit: [{type: "BVIT"}]
      },
      timeRequests: [
        {
          semester: '2017-1',
          distribution: [ { partnerCode: 'RSA', time: 150 }, { partnerCode: 'UW', time: 200 }, { partnerCode: 'IUCAA', time: 250 } ]
        },
        {
          semester: '2018-1',
          distribution: [ { partnerCode: 'RSA', time: 400 }, { partnerCode: 'UW', time: 50 } ]
        }
      ],
      techReviews : {
        "2018-1": {
          reviewer: { username: "brent"},
          feasible: "yes",
          comment: "Experienced SALT users. Ongoing program",
          details: null
        }
      }
    }
  ];
  const sem = "2018-1";

  let initialState = {
    fetching: false,
  	fetched: false,
  	submittingTechnicalReviews: false,
  	submittedTechnicalReviews: false,
  	submittingTimeAllocations: false,
  	submittedTimeAllocations: {},
  	unSubmittedTacChanges: false,
  	proposals:[],
  	initProposals: [],
  	updatedProposals: [],
  	errors: {
  		fetchingError : null,
  		submittingError : null,
  		submittingReviewsError : null,
  	},
  };

  let state = {};

  it("Should test the FETCH_PROPOSALS_START reducer", () => {
    state = proposals(state = initialState, {type:"FETCH_PROPOSALS_START"});
    expect(state).toEqual({...state, fetching:true});
  });

  it("Should test the FETCH_PROPOSALS_PASS reducer", () => {
    state = proposals(state = initialState, {type:"FETCH_PROPOSALS_PASS", payload: {proposals: props, semester: sem}});
    expect(state).toEqual({...state, fetched:true});
  });

  it("Should test the FETCH_PROPOSALS_FAIL reducer", () => {
    state = proposals(state = initialState, {type:"FETCH_PROPOSALS_FAIL", payload: {error: "Failed to fetch proposals"}});
    expect(state).toEqual({...state, errors:{fetchingError: "Failed to fetch proposals", submittingError : null, submittingReviewsError : null,}});
  });

  it("Should test the UPDATE_SINGLE_PROPOSAL reducer", () => {
    state = proposals(state = initialState, {type:"UPDATE_SINGLE_PROPOSAL", payload: {proposals: props[0]}});
    expect(state).toEqual({...state, fetched:true});
  });

  it("Should test the UPDATING_PROPOSALS reducer", () => {
    state = proposals(state = initialState, {type:"UPDATING_PROPOSALS", payload: {proposals: props}});
    expect(state).toEqual({...state, fetched:true});
  });

  it("Should test the UPDATE_TECHNICAL_REVIEW reducer", () => {
    state = proposals(state = initialState, {type:"UPDATE_TECHNICAL_REVIEW", payload: {updatedProposals: props, proposals: props, semester: sem}});
    expect(state).toEqual({...state, submittedTechnicalReports:false});
  });

  it("Should test the SUBMIT_TECHNICAL_REVIEWS_START reducer", () => {
    state = proposals(state = initialState, {type:"SUBMIT_TECHNICAL_REVIEWS_START"});
    expect(state).toEqual({...state, submittingTechnicalReviews:true});
  });

  it("Should test the SUBMIT_TECHNICAL_REVIEWS_PASS reducer", () => {
    state = proposals(state = initialState, {type:"SUBMIT_TECHNICAL_REVIEWS_PASS"});
    expect(state).toEqual({...state, submittedTechnicalReviews:true});
  });

  it("Should test the SUBMIT_TECHNICAL_REVIEWS_FAIL reducer", () => {
    state = proposals(state = initialState, {type:"SUBMIT_TECHNICAL_REVIEWS_FAIL", payload: {error: "Failed to submit a tech review"}});
    expect(state).toEqual({...state, errors:{fetchingError: null, submittingError : null, submittingReviewsError : "Failed to submit a tech review"}});
  });

  it("Should test the UPDATE_TAC_COMMENT reducer", () => {
    state = proposals(state = initialState, {type:"UPDATE_TAC_COMMENT", payload: {partner: "RSA", comment: "No Comment", proposals: props}});
    expect(state).toEqual({...state, unSubmittedTacChanges:{"RSA":true} });
  });

  it("Should test the UPDATE_ALLOCATED_PRIORITY reducer", () => {
    state = proposals(state = initialState, {type:"UPDATE_ALLOCATED_PRIORITY", payload: {partner: "RSA", proposals: props}});
    expect(state).toEqual({...state, unSubmittedTacChanges:{"RSA":true} });
  });

  it("Should test the SUBMIT_TIME_ALLOCATIONS_START reducer", () => {
    state = proposals(state = initialState, {type:"SUBMIT_TIME_ALLOCATIONS_START"});
    expect(state).toEqual({...state, submittingTimeAllocations:true });
  });

  it("Should test the SUBMIT_TIME_ALLOCATIONS_PASS reducer", () => {
    state = proposals(state = initialState, {type:"SUBMIT_TIME_ALLOCATIONS_PASS", payload: {partner: "RSA", proposals: props}});
    expect(state).toEqual({...state, submittedTimeAllocations: {results: true, partner: "RSA"} });
  });

  it("Should test the SUBMIT_TIME_ALLOCATIONS_FAIL reducer", () => {
    state = proposals(state = initialState, {type:"SUBMIT_TIME_ALLOCATIONS_FAIL", payload: {error: "Failed to submit a time allocation"}});
    expect(state).toEqual({...state, errors:{fetchingError: null, submittingError : "Failed to submit a time allocation", submittingReviewsError: null}});
  });

  it("Should test the USER_LOGGED_OUT reducer", () => {
    state = proposals(state = initialState, {type:"USER_LOGGED_OUT"});
    expect(state).toEqual({...state});
  });

});
