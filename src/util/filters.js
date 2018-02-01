import { ALL_PARTNER,
	HOME_PAGE,
	STATISTICS_PAGE,
	DOCUMENTATION_PAGE,
	TECHNICAL_PAGE,
	TAC_PAGE,
	ADMIN_PAGE
} from "../types"


export function totalTimeRequestedPerParner(proposals, semester, partner="All" ){
	/*
	*
	* @param proposals of a selected partner all or single
	* @param semester selected semester
	* @param partner all partners or a single
	* @return total
	*/
	
	let total = 0;
	proposals.forEach( p =>{
		p.timeRequests.forEach( r => {
			if (r.semester === semester){
				r.distribution.forEach(d => {
					if ( partner === "All"){
						total += d.time
					}else if (d.partnerCode === partner){
						total += d.time
					}
				})
				
			}
		})
	});
	return total
}

export const semestersArray = () => {
	let startYear = 2006;
	const today = new Date();
	const year = today.getFullYear();
	let semester = [];
	while (startYear < year + 8){
		semester.push(
			`${ startYear }-1`, `${ startYear }-2`
		);
		startYear += 1
	}
	return semester
};

export const firstSelectedPartner = roles => {
	let first = ALL_PARTNER;
	
	for (let r of roles || []) {
		if (r.type === "ADMINISTRATOR") {
			first = ALL_PARTNER;
			break;
		}
		if (r.type === "SALT_ASTRONOMER") {
			first = ALL_PARTNER;
			break;
		}
		if (r.type === "TAC_CHAIR") {
			first = r.partners[0] || "";
		}
		if (r.type === "TAC_MEMBER") {
			first = r.partners[0] || "";
		}
	}
	
	return first
};

export const getPartnerList = roles => {
	let partnerList = [];
	for (let r of roles || []) {
		if (r.type === "ADMINISTRATOR" || r.type === "SALT_ASTRONOMER") {
			partnerList = r.partners;
			partnerList.includes(ALL_PARTNER) ? partnerList.push() : partnerList.push(ALL_PARTNER);
			break;
		}
		
		if (r.type === "TAC_CHAIR") {
			partnerList = r.partners;
		}
		if (r.type === "TAC_MEMBER") {
			partnerList = r.partners;
		}
	}
	return partnerList
};

/*
* @params list an array of
*/
export const listForDropdown = list => {
	return (list || []).map( l => ({ label: l, value: l }))
};

/**
 * method convert a standard SA object to an array of SA names
 *
 * @params Array of SALT astronomers directly from server
 * @return Array of SALT astronomers names
 * */
export const getAstronomersList = saList => {
	return (saList || []).map( l => (`${l.name}`))
};

/**
 * get a current uri path and return the selected page name
 *
 * @params pathname uri path
 * @return name of selected page or Home page by default
 */
export const loadedPage = pathname => {
	console.log({pathname});
	return pathname === "/"? HOME_PAGE :
		pathname === "/timeallocation"? TAC_PAGE :
			pathname === "/statistics"? STATISTICS_PAGE :
				pathname === "/techreview"? TECHNICAL_PAGE :
					pathname === "/documentation"? DOCUMENTATION_PAGE :
						pathname === "/admin"? ADMIN_PAGE : HOME_PAGE;
};

/**\
 * It reduce the proposals to only proposals that are assigned to @param astronomer
 * if @param astronomer is "All" all are returned
 * if @param astronomer is "Assigned" only assigned proposals returned
 * if @param astronomer is "Not Assigned" only unassigned proposals returned
 * if @param astronomer is "SA name" only proposals that are assigned to "SA name" can be returned
 *
 * @param proposals array of proposals
 * @param astronomer a SALT astronomer
 * @return proposals reduced proposals
 * */

export const reduceProposalsPerAstronomer = (proposals, astronomer) => {
	let prop = [];
	if (astronomer === "All"){
		prop = proposals
	}
	else if (astronomer === "Assigned"){
		proposals.forEach(p => {
			if (p.liaisonAstronomer !== null) {prop.push(p)}
		})
	}
	else if (astronomer === "Not Assigned"){
		proposals.forEach(p => {
			if (p.liaisonAstronomer === null) {prop.push(p)}
		})
	}else {
		proposals.forEach(p => {
			if (p.liaisonAstronomer === astronomer) {prop.push(p)}
		})
	}
	
	return prop
};
