import axios from 'axios';


const API_BASE_URL = 'http://localhost:5001';

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


export function queryStatData(semester){
  const query = `
    {
      proposals(semester: "${semester}"){
        ProposalId
        proposalcode{
          ProposalCode
        }
      }
    }
  `
  return graphqlClient().post(`/graphql?query=${query}`)
  .then(
    response => response
  )
  .catch( () => {
    "Data could not be fetched"
  })

}

export function getTecData(partner){
  const query = `{
    proposals(partner:"${partner}"){

    }
  }`
  return {query}
}
