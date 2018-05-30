export function convertTacUsers(users){
	let newUsers = {}
	users.forEach(user => {
		if ( !newUsers[ user.partner.code ] ) {
			newUsers = {
				...newUsers,
				[ user.partner.code ] : []
			}

		}
		newUsers = {
			...newUsers,
			[ user.partner.code ]: [
				...newUsers[ user.partner.code ],
				{
					firstName: user.firstName,
					username: user.username,
					lastName: user.lastName,
					isTacChair: user.isChair
				}
			]
		}

	})
	return newUsers
}

export function convertUsers(users){
	return users.map(user => ({
		firstName: user.firstName,
		username: user.username,
		lastName: user.lastName,
		isTacChair: user.isChair
	}))
}
