export const checkColumns = columnArray => {
  const p0 = (columnArray || [] ).some( p => p.toLowerCase() === 'p0')
  const p1 = (columnArray || [] ).some( p => p.toLowerCase() === 'p1')
  const p2 = (columnArray || [] ).some( p => p.toLowerCase() === 'p2')
  const p3 = (columnArray || [] ).some( p => p.toLowerCase() === 'p3')
  const p4 = (columnArray || [] ).some( p => p.toLowerCase() === 'p4')
  const code  = (columnArray || [] ).some( p =>
	  p.toLowerCase() === 'code' ||
	  p.toLowerCase() === 'proposalcode' ||
	  p.toLowerCase() === 'proposal code')
  const tacComment  = (columnArray || [] ).some( p =>
	  p.toLowerCase() === 'taccomment' ||
	  p.toLowerCase() === 'tac comment' )
  return ![p0, p1, p2, p3, p4, code, tacComment].some( r => r !== true )
}

export const getIndexOfColumns = columnArray => {
  const columnIndex = {};
  (columnArray || [] ).forEach( (p, i) => {
    if ( p.toLowerCase() === 'p0' ){
      columnIndex.P0 = i
    }
    if ( p.toLowerCase() === 'p1'){
      columnIndex.P1 = i
    }
    if  ( p.toLowerCase() === 'p2'){
      columnIndex.P2 = i
    }
    if ( p.toLowerCase() === 'p3'){
      columnIndex.P3 = i
    }
    if ( p.toLowerCase() === 'p4'){
      columnIndex.P4 = i
    }
    if (p.toLowerCase() === 'code' || p.toLowerCase() === 'proposalcode' || p.toLowerCase() === 'proposal code'){
      columnIndex.proposalCode = i
    }
	  if ( p.toLowerCase() === 'taccomment' || p.toLowerCase() === 'tac comment' ){
		  columnIndex.tacComment = i
	  }
  })
  return columnIndex
}

export const updateProposalFromCSV = (proposals, partner, rowValues, valueIndex) => (proposals || []).map( p => {
  if (p.proposalCode === rowValues[ valueIndex.proposalCode ] ){
    p.allocatedTime[ partner ] = {
      p0: parseFloat(rowValues[ valueIndex.P0 ]).toString(),
      p1: parseFloat(rowValues[ valueIndex.P1 ]).toString(),
      p2: parseFloat(rowValues[ valueIndex.P2 ]).toString(),
      p3: parseFloat(rowValues[ valueIndex.P3 ]).toString(),
      p4: parseFloat(rowValues[ valueIndex.P4 ]).toString(),
    }
    p.tacComment[ partner ] = {comment: rowValues[ valueIndex.tacComment ]}

  }
  return p
})
