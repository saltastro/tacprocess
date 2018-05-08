export function queryProposals(semester, partner){
  return new Promise((resolve) => {
    resolve({
      data: {
        data: {
          proposals: [
            {
              id: 'ID-1',
              title: 'Title-1',
              abstract: 'Abstract-1',
              code: 'Code-1',
              isP4: true,
              status: 'active',
              actOnAlert: true,
              maxSeeing: 5.5,
              transparency: 'Clear',
              instruments: { hrs: [ { exposureMode: "HIGH RESOLUTION" } ], rss: [ { dictatorMode: 'NORMAL', mode: 'Spectroscopy' } ], scam: [ { dictatorMode: "NORMAL" } ], bvit: [{type: "BVIT"}] },
              timeRequests: [
                { semester: '2018-1', distribution: [ { partnerCode: 'RSA', time: 150 }, { partnerCode: 'UW', time: 200 }, { partnerCode: 'IUCAA', time: 250 } ] },
                { semester: '2018-1', distribution: [ { partnerCode: 'RSA', time: 400 }, { partnerCode: 'UW', time: 50 } ] }
              ],
              isThesis: true,
              pi: {surname: 'PI-S1', name: 'PI-N1'},
              SALTAstronomer: {username: 'SA-1'},
              techReviews:{},
              allocatedTime: {},
              tacComment: {}
            }
          ]
        }
      }
    })
  })
}

export function queryTargets(semester, partner){
	return new Promise((resolve) => {
    resolve({
      data:{
        data : { targets:[ { id: "Target: 8062", optional: false, coordinates:{ ra: 4.3256, dec: -3.5896 }} ] }
      }
    })
  })
}

export function queryTacMembers(){
  return new Promise((resolve) => {
    resolve({
      data: {
        data: {
          tacMembers : [{name: 'tacM-1', surname: 'tacM-1', isTac: true}]
        }
      }
    })
  })
}

export function querySaltUsers(){
  return new Promise((resolve) => {
    resolve({
      data:{
        data : {
          saltUsers: [{firstName: 'user', lastName: 'user', username: 'user-user'}]
        }
      }
    })
  })
}

export function queryUserData(){
  return new Promise((resolve) => {
    resolve({
      data:{
        data : {
          user: {firstName: 'name', lastName: 'surname', email: 'name@saao.ac.za', username: 'username', role: [{type: 'ADMINISTRATOR', partners:['RSA']}]}
        }
      }
    })
  })
}

export function queryPartnerAllocations(semester, partner="All" ){
  return new Promise((resolve) => {
    resolve({
      data:{
        data:{
          partnerAllocations:[ { code: "UW", allocatedTime: { AllocatedP0P1: 57.02, AllocatedP2: 57.02, AllocatedP3: 85.53 } } ]
        }
      }
    })
  })
}

export function querySALTAstronomers(){
  return new Promise((resolve) => {
    resolve({
      data:{
        data : {
          SALTAstronomers:[ { name: "Sifiso", surname: "Myeza", username: "myezasifiso" } ]
        }
      }
    })
  })
}

export const convertUserData = rowUser => ({
      firstName: rowUser.firstName,
      lastName: rowUser.lastName,
      email: rowUser.email,
      username: rowUser.username,
      roles:rowUser.role
    }
);

export function convertProposals(proposals, semester, partner){
  if (!proposals.proposals){ return []}
  return proposals.proposals.map( proposal => {
    const minTotal  = {total:1000, minimum:0}
    return ({
      proposalId: proposal.id,
      title: proposal.title,
      abstract: proposal.abstract,
      proposalCode: proposal.code,
      isP4: proposal.isP4,
      status: proposal.status,
      actOnAlert: proposal.actOnAlert,
      maxSeeing: proposal.maxSeeing,
      transparency: proposal.transparency,
      isNew: true,
      isLong: true,
      isThesis: proposal.isThesis,
      totalRequestedTime: minTotal.total,
      timeRequests: proposal.timeRequests,
      minTime: minTotal.minimum,
      instruments: proposal.instruments,
      pi: `${ proposal.pi.surname } ${ proposal.pi.name }`,
      liaisonAstronomer: proposal.SALTAstronomer ? proposal.SALTAstronomer.username : null,
      techReviews: [],
      allocatedTime: {},
      tacComment: {},
      requestedTime: {}
    })
  });
}