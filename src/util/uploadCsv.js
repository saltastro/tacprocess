export const checkColumns = columnArray => {
  const p0 = (columnArray || [] ).some( p => p === "P0" || p === "p0")
  const p1 = (columnArray || [] ).some( p => p === "P1" || p === "p1")
  const p2 = (columnArray || [] ).some( p => p === "P2" || p === "p2")
  const p3 = (columnArray || [] ).some( p => p === "P3" || p === "p3")
  const p4 = (columnArray || [] ).some( p => p === "P4" || p === "p4")
  const code  = (columnArray || [] ).some( p => p === "Code" || p === "code" || p === "ProposalCode" || p === "CODE" || p === "proposalCode" || p === "Proposal Code" || p === "proposal code"|| p === "Proposal code")
  return ![p0, p1, p2, p3, p4, code].some( r => r !== true )
}


export const getIndexOfColumns = columnArray => {
  let columnIndex = {};
  (columnArray || [] ).forEach( (p, i) => {
      if ( p === "P0" || p === "p0"){
        columnIndex["P0"] = i
      }
      if ( p === "P1" || p === "p1"){
        columnIndex["P1"] = i
      }
      if  ( p === "P2" || p === "p2"){
        columnIndex["P2"] = i
      }
      if ( p === "P3" || p === "p3"){
        columnIndex["P3"] = i
      }
      if (p === "P4" || p === "p4"){
        columnIndex["P4"] = i
      }
      if (p === "Code" || p === "code" || p === "ProposalCode" || p === "CODE" || p === "proposalCode" || p === "Proposal Code" || p === "proposal code"|| p === "Proposal code"){
        columnIndex["proposalCode"] = i
      }
    })
    return columnIndex
}

export const updateProposalFromCSV = (proposals, partner, rowValues, valueIndex) => {

  return (proposals || []).map( p => {
    if (p.proposalCode === rowValues[valueIndex.proposalCode] ){
      p.allocatedTime[partner] = {
        p0: rowValues[valueIndex.P0],
        p1: rowValues[valueIndex.P1],
        p2: rowValues[valueIndex.P2],
        p3: rowValues[valueIndex.P3],
        p4: rowValues[valueIndex.P4],
      }

    }
    return p
  })

}
