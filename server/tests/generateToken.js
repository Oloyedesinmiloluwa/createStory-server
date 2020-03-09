import { signToken } from "../validations/auth"

export default (isAdmin, data) => {
	let seededUser;
	seededUser = isAdmin ? {email: 'admin@weCreate.com', id: 1, userRoles: ['Admin']} : {email: 'test@yahoo.com', id: 2, userRoles: ['User'] }
	return signToken(data || seededUser)
}
