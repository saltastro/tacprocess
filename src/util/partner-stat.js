/**
 * A function that sums up the numbers in a list or array and returns the total
 * @param array
 * @returns {number}
 */
import { getPercentage, rounded } from './index'

export const sumNumbers = (array) => array.reduce((a, b) => a + b, 0)

/**
 * A function to calculate total observation
 * @param completionStats
 * @returns {number}
 */
export const calculateTotalObservation = (completionStats) => {

  const allCompletionStats = completionStats
  .find(c => c.partner.toUpperCase() === 'ALL').summary.observedTime

  return allCompletionStats.p0 + allCompletionStats.p1 + allCompletionStats.p2 + allCompletionStats.p3
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
  const remainingAllocatedTime = totalObsTime ? totalAllocTime - totalObsTime : totalAllocTime

  return {
    priority: priorityType,
    allocatedTime: totalAllocTime,
    observedTime: totalObsTime,
    percentage: rounded(getPercentage(totalObsTime, totalAllocTime)),
    remainder: remainingAllocatedTime
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
  const allocatedTime = allocatedTimeP0 + allocatedTimeP1 + allocatedTimeP2 + allocatedTimeP3

  // calculating the total observed time
  const observedTime = (observedTimeP0 + observedTimeP1 + observedTimeP2 + observedTimeP3)

  // completion overall rate
  const completionOverallRate = allocatedTime !== 0
    ? observedTime / (allocatedTimeP0 + allocatedTimeP1 + allocatedTimeP2 + allocatedTimeP3 / 3) : 0

  return allocatedTime !== 0 ? rounded(completionOverallRate) : 'Nan'
}
