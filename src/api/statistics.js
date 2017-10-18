

export function fetchingStatsData(semester) {
    const query = `
    {
      proposals(semester:"2017-2"){
        proposalcode{
          ProposalCode
        }
      }
    }`;
