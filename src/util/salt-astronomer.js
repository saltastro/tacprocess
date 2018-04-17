/**
 * It get a salt astronomer name from the list of astronomers that match salt astronomer username or none
 * @params username
 * @params SALTAstronomers
 * @return name
 * */
export const getSaltAstronomerName = (username, SALTAstronomers) => {
    if ( !username ) return null
    const name = (SALTAstronomers).find(a =>  a.username === username )
    return name ? name.name : null;
};

export const dummyFunction = () => undefined