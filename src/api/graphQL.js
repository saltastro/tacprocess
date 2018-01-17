import axios from 'axios';
import { API_BASE_URL } from '../types';
import { jsonClient } from './api';


const graphqlClient = () => axios.create({
  baseURL: API_BASE_URL,
  "routes": {
    "cors": true
  },
  headers: {
    'Authorization': `Token ${localStorage.tacPageJWT}`,
    'Content-Type': 'application/graphql',
  }
});

export function queryStatData(semester, partner){
  let partnerArgs = ""
  if (partner !== "All") {
    partnerArgs = `partnerCode:"${partner}"`
  }
  const query = `
  {
    proposals(semester: "${semester}", ${partnerArgs}){
      id
      code
      title
      abstract
      techReport
      isP4
      status
      transparency
      maxSeeing
      instruments{
        rss{
          mode
          dictatorMode
        }
        hrs{
          exposureMode
        }
        bvit{
          type
        }
        scam{
          dictatorMode
        }
      }
      timeRequests{
        semester
        minimumUsefulTime
        distribution{
          partnerName
          partnerCode
          time
        }
      }
      pi{
        name
        surname
      }
      allocatedTime{
        partnerCode
        p0
        p1
        p2
        p3
        p4
      }
    }

    targets(semester:"${semester}", ${partnerArgs}){
      id
      optional
      coordinates{
        ra
        dec
      }
    }
  }
  `
  return graphqlClient().post(`/graphql?query=${query}`)
  .then(
    response => response
  )
}


export function queryPartnerAllocations(semester, partner="All" ){
  /*
  * This method is only called by pages that will need and allocated time
  * for partner at semester
  *
  * @params semester like "2017-1" type String
  * @params partner is a partner code as it will be shown on partner filter
  * @return GQL results of the below query
  */
  let par = ""
  if ( partner !== "All" ) {
    par = ` , partnerCode:"${ partner}"`
  }

  const query = `
  {
    partnerAllocations(semester:"${ semester }" ${ par }){
      code
      allocatedTime{
        AllocatedP0P1
        AllocatedP2
        AllocatedP3
      }
    }
  }
  `
  return graphqlClient().post(`/graphql?query=${query}`)
  .then(
    response => response
  )
}

export function queryUserData(){
  const query = `{
    user{
      lastName
      firstName
      email
      username
      role{
        type
        partners
      }
    }
  }`
  return graphqlClient().post(`/graphql?query=${query}`)
  .then(
    response => response
  )
}

export function queryTargets(semester, partner){
  let par = ""
  if ( partner !== "All" ) {
    par = ` , partnerCode:"${ partner}"`
  }
  const query = `{
    targets(semester:"${semester}", ${par}){
      id
      optional
      coordinates{
        ra
        dec
      }
    }
  }`
  return graphqlClient().post(`/graphql?query=${query}`)
  .then(
    response => response
  )
}

export function queryProposals(semester, partner){
  let par = ""
  if ( partner !== "All" ) {
    par = ` , partnerCode:"${ partner}"`
  } else{
    par = ` allProposals: true `
  }

  const query = `
  {
    proposals(semester: "${semester}", ${par} ){
      id
      code
      title
      abstract
      techReport
      isP4
      status
      transparency
      maxSeeing
      instruments{
        rss{
          mode
          dictatorMode
        }
        hrs{
          exposureMode
        }
        bvit{
          type
        }
        scam{
          dictatorMode
        }
      }
      timeRequests{
        semester
        minimumUsefulTime
        distribution{
          partnerName
          partnerCode
          time
        }
      }
      pi{
        name
        surname
      }
      allocatedTime{
        partnerCode
        p0
        p1
        p2
        p3
        p4
      }
      tacComment{
        partnerCode
        comment
      }
    }
  }
  `
  return graphqlClient().post(`/graphql?query=${query}`)
  .then(
    response => response
  )
}



export function submitAllocations(query){
  return jsonClient().post(`/graphql`, { query })
  .then(
    response => response
  )
}
