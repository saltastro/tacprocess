/* Es lint wnat to export default below */
// eslint-disable-next-line
export const count = (array=[],toCount) => {
  /*
    counts how many times does toCount appear on an array
    array of objects
    return total
  */
  let frequency = 0
  array.map(value => {
    if (toCount === 1)
      {frequency += value}
      return frequency
  } )  

}
