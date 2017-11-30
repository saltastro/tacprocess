import axios from 'axios';
import { API_BASE_URL } from '../types';


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
  let partnerArgs
  if (partner === "All"){
    partnerArgs = ``
  }else{
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
      }
    }
  `
  return graphqlClient().post(`/graphql?query=${query}`)
  .then(
    response => response
  )
}


export function querySelectorData(){
  const query = `
    {
      selectors{
        partner
        semester
      }
    }
  `
  return graphqlClient().post(`/graphql?query=${query}`)
  .then(
    response => response
  )

}


export function getTecData(partner){
  const query = `{
    proposals(partner:"${partner}"){

    }
  }`
  return {query}
}
