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

export const convertData = statData => {
  const proposals = statData.proposals.map( proposal => (
    {
      proposalId: proposal.ProposalId,
      proposalCode: proposal.proposalcode.ProposalCode
    }
  ));
  return {
    proposals
  }
};


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
        ProposalId
        proposalcode{
          ProposalCode
        }
        proposalInfo{
          P4
          proposalstatus{
            ProposalStatusId
          }
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
