export function queryUserData(){
	return {
    firstName:"Sifiso",
    lastName:"Myeza",
    email:"sifiso@saao.ac.za",
    username: "myezasifiso",
    role:{type:"ADMINISTRATOR", partner:"All"}
  };
}

export function queryProposals(semester, partner){
  return new Promise((resolve) => {
    resolve({
      proposals: [
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
          ]
        }
      ]
    });
  })
}

export function queryTargets(semester, partner){
	return new Promise((resolve) => {
    resolve({
      data:{
        data : {
          targets:[
            { id: "Target: 8062", optional: false, coordinates:{ ra: 4.3256, dec: -3.5896 }}
          ]
        }
      }
    })
  })
}

export function queryPartnerAllocations(semester, partner="All" ){
	/**
	* This method is only called by pages that will need and allocated time
	* for partner at semester
	*
	* @params semester like "2017-1" type String
	* @params partner is a partner code as it will be shown on partner filter
	* @return GQL results of the below query
	*/
  return new Promise((resolve) => {
    resolve({
      data:{
        data:{
          partnerAllocations:[
            {
              code: "UW",
              allocatedTime: {
                AllocatedP0P1: 57.02,
                AllocatedP2: 57.02,
                AllocatedP3: 85.53
              }
            }
          ]
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
          SALTAstronomers:[
            { name: "Sifiso", surname: "Myeza", username: "myezasifiso" }
          ]
        }
      }
    })
	});
}
