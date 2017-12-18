import { isFloat } from "../util";


export function illegalAllocation(element, index, array){
  if(
    !(isFloat(element.allocatedTime.p0)) ||
    !(isFloat(element.allocatedTime.p1)) ||
    !(isFloat(element.allocatedTime.p2)) ||
    !(isFloat(element.allocatedTime.p3)) ||
    !(isFloat(element.allocatedTime.p4)) ||
    !(parseFloat(element.allocatedTime.p0) >= 0) ||
    !(parseFloat(element.allocatedTime.p1) >= 0) ||
    !(parseFloat(element.allocatedTime.p2) >= 0) ||
    !(parseFloat(element.allocatedTime.p3) >= 0) ||
    !(parseFloat(element.allocatedTime.p4) >= 0)
){
    return true
  }
  return false
}

export default function checkAllocatedTimes(proposals){
  /*
   *
   *
   * @param proposals and array of proposals
   * @return true if all the allocated times correct else false
   */
  return !proposals.some(illegalAllocation)
}
