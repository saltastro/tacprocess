/**
 * It get a salt astronomer name from the list of astronomers that match salt astronomer username or none
 * @params username
 * @params SALTAstronomers
 * @return name
 * */
export const getSaltAstronomerName = (username, SALTAstronomers) => {
    if ( !username ) return null
    const name = (SALTAstronomers || []).find(a =>  a.username === username )
    return name ? name.name : null;
};

/**
 * method used for sorting Salt Astronomers by name
 * */
export const compareByFirstName = (a, b) => {
  const name1 = a.name.toUpperCase();
  const name2 = b.name.toUpperCase();
  if (name1 < name2) {
    return -1;
  }
  if (name1 > name2) {
    return 1;
  }
  return 0;
};