export const statusPriority = (proposal, priorityType, statusType, semester, partnerCode) => {
  if (proposal == null) { return null }
  let timeAllocationPriority = []
  const { observations, timeAllocations } = proposal
  if (partnerCode === 'All') {
    // according to the time allocated for the semester and priority
    timeAllocationPriority = timeAllocations.filter(t => (t.semester === semester && t.priority === priorityType))
  } else {
    // according to the time allocated for the semester and priority and by the partner
    timeAllocationPriority = timeAllocations.filter(t => (t.semester === semester && t.partnerCode === partnerCode && t.priority === priorityType))
  }
  // according to the observation priority and to the block priority and semester
  const observationsPriority = observations.filter(o => (o.status === statusType && o.block.priority === priorityType && o.block.semester === semester))
  // check if the time is allocated
  if (timeAllocationPriority.length) {
    const allocTimes = timeAllocationPriority.map(at => at.amount)
    const obsTimes = observationsPriority.map(op => op.block.length)
    let totalAllocTime = 0
    allocTimes.forEach(item => {
      totalAllocTime += item
      return totalAllocTime
    })
    let totalObsTime = 0
    obsTimes.forEach(item => {
      totalObsTime += item
      return totalObsTime
    })
    const percentage = (totalObsTime / totalAllocTime) * 100
    return percentage.toFixed(2)
  }
  return 0
}

export const semesterComment = (proposal, semester) => {
  const { completionComments } = proposal
  return completionComments.map(c => c.semester === semester ? c.comment : '')[ 0 ]
}
