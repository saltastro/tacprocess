import axios from 'axios';


const API_BASE_URL = 'http://127.0.0.1:5001/';

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
      proposalsM(semester: "${semester}", ${partnerArgs}){
        proposalId
        proposalCode
        requesterTime{
          forSemester
          moon
          time
        }
        generalInfo{
          isP4
          status
          transparency
          maxSeeing
        }
      }
      targets(semester: "${semester}", ${partnerArgs}){
        target{
          TargetName
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
      semesters{
        Semester
        Year
      }
      partners{
        PartnerCode
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
