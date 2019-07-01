/**
 * A function that sums up the numbers in a list or array and returns the total
 * @param array
 * @returns {number}
 */
export const sumNumbers = (array) => array.reduce((a, b) => a + b, 0)

/**
 * A function that calculates the percentage and returns it
 * @param dividend
 * @param divisor
 * @returns {number}
 */
export const calculatePercentage = (dividend, divisor) => {
  if (divisor === 0) {
    return 0
  }
  return (dividend / divisor) * 100
}

/**
 * A function to calculate total observation
 * @param observations
 * @returns {number}
 */
export const calculateTotalObservation = (observations) => {
  let total = 0
  // filter the observed time by status, semester and priorities < 4
  observations = observations.filter((o) =>
    (o.status === 'ACCEPTED')
  )
  total += sumNumbers(observations.map((o) => o.observationTime))

  return total
}

/**
 * A function that calculates the allocated and observed time for the specific proposal with regards to the observation
 * priorities. It also calculates the percentage of those priorities.
 * @param proposal
 * @param priorityType
 * @param statusType
 * @param semester
 * @param partnerCode
 * @returns {
 *  null|
 *  {
 *    percentage: number,
 *    allocatedTime: number,
 *    observedTime: number,
 *    remainder: number
 *  }}
 */
export const statusPriority = (proposal, priorityType, statusType, semester, partnerCode) => {
  if (proposal == null) { return null }
  let timeAllocationPriority = []
  const { observations, timeAllocations } = proposal
  if (partnerCode === 'All') {
    // according to the time allocated for the semester and priority
    timeAllocationPriority = timeAllocations.filter((t) =>
      (t.semester === semester && t.priority === priorityType)
    )
  } else {
    // according to the time allocated for the semester and priority and by the partner
    timeAllocationPriority = timeAllocations.filter((t) =>
      (t.semester === semester && t.partnerCode === partnerCode && t.priority === priorityType)
    )
  }
  // according to the observation status and to the block priority and semester
  const observationsPriority = observations.filter((o) =>
    (o.status === statusType && o.block.priority === priorityType && o.block.semester === semester)
  )

  // calculating the total allocated time
  const totalAllocTime = sumNumbers(timeAllocationPriority.map((t) => t.amount))

  // calculating the total observed time
  const totalObsTime = sumNumbers(observationsPriority.map((o) => o.block.length))
  // calculating the remained allocated time
  const remainedAllocatedTime = totalObsTime ? totalAllocTime % totalObsTime : 0

  return {
    priority: priorityType,
    allocatedTime: totalAllocTime,
    observedTime: totalObsTime,
    percentage: calculatePercentage(totalObsTime, totalAllocTime),
    remainder: remainedAllocatedTime
  }
}

/**
 * A function that handles the comment of the Partner's statistics per proposal on a given semester.
 * @param proposal
 * @param semester
 * @returns {string}
 */
export const semesterComment = (proposal, semester) => {
  const { completionComments } = proposal
  if (completionComments.length) {
    return completionComments.filter(c => c.semester === semester).length ? completionComments.filter(c => c.semester === semester)[ 0 ].comment || '' : ''
  }
  return ''
}

/**
 * A function that checks if there has been observation done
 * @param priorityObservations
 * @returns {boolean}
 */
export const neverObserved = (priorityObservations) => priorityObservations.filter(op =>
  typeof (op.percentage) === 'string' ? parseFloat(op.percentage) !== 0 : op.percentage !== 0)

/**
 * A function that calculates the overall completion rate for a proposal.
 * @param proposal
 * @param statusType
 * @param semester
 * @param partnerCode
 * @returns {string|null}
 */
export const overallCompletionRate = (proposal, statusType, semester, partnerCode) => {
  if (proposal == null) { return null }
  let { observations, timeAllocations } = proposal

  if (partnerCode === 'All') {
    // according to the time allocated for the semester
    timeAllocations = timeAllocations.filter(t => (t.semester === semester))
  } else {
    // according to the time allocated for the semester and by the partner
    timeAllocations = timeAllocations.filter(t => (t.semester === semester && t.partnerCode === partnerCode))
  }

  // according to the observation status and semester
  observations = observations.filter(o => (o.status === statusType && o.block.semester === semester))

  // calculating the allocated time according to the priority.
  const allocatedTimeP0 = sumNumbers(timeAllocations.filter(t => t.priority === 0).map((t) => t.amount))
  const allocatedTimeP1 = sumNumbers(timeAllocations.filter(t => t.priority === 1).map((t) => t.amount))
  const allocatedTimeP2 = sumNumbers(timeAllocations.filter(t => t.priority === 2).map((t) => t.amount))
  const allocatedTimeP3 = sumNumbers(timeAllocations.filter(t => t.priority === 3).map((t) => t.amount))

  // calculating the observed time according to the priority.
  const observedTimeP0 = sumNumbers(observations.filter(o => o.block.priority === 0).map((o) => o.block.length))
  const observedTimeP1 = sumNumbers(observations.filter(o => o.block.priority === 1).map((o) => o.block.length))
  const observedTimeP2 = sumNumbers(observations.filter(o => o.block.priority === 2).map((o) => o.block.length))
  const observedTimeP3 = sumNumbers(observations.filter(o => o.block.priority === 3).map((o) => o.block.length))

  // calculating the total allocated time
  const allocatedTime = (allocatedTimeP0 + allocatedTimeP1 + allocatedTimeP2 + (allocatedTimeP3 / 3))

  // calculating the total observed time
  const observedTime = (observedTimeP0 + observedTimeP1 + observedTimeP2 + (observedTimeP3 / 3))

  // completion overall rate
  const completionOverallRate = allocatedTime !== 0 ? observedTime / allocatedTime : 0

  return completionOverallRate.toFixed(2)
}

/**
 * A function for calculating the observed time per partner.
 * All the quantities are for one proposal.
 * @param timeAllocations
 * @param observations
 * @param partnerTimeAllocations
 * @returns {number}
 */
const calculateObservedTime = (timeAllocations, observations, partnerTimeAllocations) => {
  const partnerAllocatedTime = sumNumbers(partnerTimeAllocations.map((t) => t.amount))
  const allocatedTime = sumNumbers(timeAllocations.map((t) => t.amount))
  const observedTime = sumNumbers(observations.map((o) => o.block.length))

  if (!allocatedTime) {
    return 0
  }

  return (partnerAllocatedTime / allocatedTime) * observedTime
}

/**
 * A function for calculating the partner's summary statistics for a specific semester.
 * @param proposals
 * @param semester
 * @param partnerCode
 * @param partnerShareTimes
 * @param totalObservation
 * @returns {
 * {
 *    partnerAllocatedShareTime: number,
 *    partnerObservedShareTime: number,
 *    completeness: {p0p1: (string|number), p2: (string|number), total: (string|number), p3: (string|number)},
 *    allocatedTime: {p0p1: number, p2: number, total: number, p3: number},
 *    observedTime: {p0p1: number, p2: number, total: number, p3: number}
 * }|null
 * }
 */
export const partnerSummaryStat = (proposals, semester, partnerCode, partnerShareTimes, totalObservation) => {
  if (!proposals.length) { return null }

  let partnerAllocatedShareTime = 0

  if (partnerShareTimes && partnerShareTimes.length) {
    partnerAllocatedShareTime = partnerShareTimes[ 0 ].sharePercent
  }

  let p0p1Allocated = 0
  let p2Allocated = 0
  let p3Allocated = 0

  let p0p1Observed = 0
  let p2Observed = 0
  let p3Observed = 0

  proposals.forEach(p => {
    // filter the time allocated by semester and priorities
    const p0p1TimeAllocations = p.timeAllocations.filter((t) =>
      (t.semester === semester && (t.priority === 0 || t.priority === 1))
    )

    const p2TimeAllocations = p.timeAllocations.filter((t) =>
      (t.semester === semester && t.priority === 2)
    )

    const p3TimeAllocations = p.timeAllocations.filter((t) =>
      (t.semester === semester && t.priority === 3)
    )

    // filter the time allocated by partner
    const p0p1PartnerTimeAllocations = p0p1TimeAllocations.filter((t) => t.partnerCode === partnerCode)
    const p2PartnerTimeAllocations = p2TimeAllocations.filter((t) => t.partnerCode === partnerCode)
    const p3PartnerTimeAllocations = p3TimeAllocations.filter((t) => t.partnerCode === partnerCode)

    // filter the observed time by status, semester and priorities
    const p0p1Observations = p.observations.filter((o) =>
      (o.status === 'ACCEPTED' && o.block.semester === semester && (o.block.priority === 0 || o.block.priority === 1))
    )

    const p2Observations = p.observations.filter((o) =>
      (o.status === 'ACCEPTED' && o.block.semester === semester && o.block.priority === 2)
    )

    const p3Observations = p.observations.filter((o) =>
      (o.status === 'ACCEPTED' && o.block.semester === semester && o.block.priority === 3)
    )

    // calculate the time allocated per proposal according to the priorities (P0+P1, P2, P3)
    p0p1Allocated += sumNumbers(p0p1PartnerTimeAllocations.map((t) => t.amount))
    p2Allocated += sumNumbers(p2PartnerTimeAllocations.map((t) => t.amount))
    p3Allocated += sumNumbers(p3PartnerTimeAllocations.map((t) => t.amount))

    // calculate the observed time per proposal according to priorities and partner
    p0p1Observed += calculateObservedTime(p0p1TimeAllocations, p0p1Observations, p0p1PartnerTimeAllocations)
    p2Observed += calculateObservedTime(p2TimeAllocations, p2Observations, p2PartnerTimeAllocations)
    p3Observed += calculateObservedTime(p3TimeAllocations, p3Observations, p3PartnerTimeAllocations)
  })

  // calculating the total allocated time for the partner
  const totalAllocated = p0p1Allocated + p2Allocated + p3Allocated
  // calculating the total observed time for the partner
  const totalObserved = p0p1Observed + p2Observed + p3Observed
  // Observed share time in percent
  const partnerObservedShareTime = calculatePercentage(totalObserved, totalObservation)

  return {
    allocatedTime: {
      p0p1: p0p1Allocated,
      p2: p2Allocated,
      p3: p3Allocated,
      total: totalAllocated
    },
    observedTime: {
      p0p1: p0p1Observed.toFixed(0),
      p2: p2Observed.toFixed(0),
      p3: p3Observed.toFixed(0),
      total: totalObserved.toFixed(0)
    },
    completeness: {
      p0p1: calculatePercentage(p0p1Observed, p0p1Allocated).toFixed(2),
      p2: calculatePercentage(p2Observed, p2Allocated).toFixed(2),
      p3: calculatePercentage(p3Observed, p3Allocated).toFixed(2),
      total: calculatePercentage(totalObserved, (totalAllocated / 1.5)).toFixed(2)
    },
    partnerAllocatedShareTime,
    partnerObservedShareTime: partnerObservedShareTime.toFixed(2)
  }
}