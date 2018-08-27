/**
 * Checks if the user has the role the role and return true if so
 *
 * @param user
 * @param role
 *
 */
export const isUser = (user, role) => (user.roles || [] ).some(r => r.type === role)

export const dummy = () => undefined