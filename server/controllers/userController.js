import db from "../models/index";
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import { signToken } from "../validations/auth";

/**
 * Class handling user's business logic
 * An instance with a model is exported by default
 * A plain instance can also be export via named import
 */
export class UserController {
	constructor(db){
		this.models = db;
	}
	loginUser = (req,res,next) => {
		const {User, Role} = this.models;
		// currently all new users use login as sign up
		const hashedPassword = bcryptjs.hashSync(req.body.password, 8);
		// salt ?
		// return console.log(new User().getRole, 'user')
		return User.create({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			password: hashedPassword,
			roleId: 2, //role id of user.
			include: [{
				model: Role
			}]
		}).then(user => {
			const {id,email,firstName,lastName} = user;
			user.getRole()
				.then(role=>{
					const userRoles = [role.name];
					const token = signToken({id,email,firstName,lastName,userRoles});
					return res.status(200).json({id,email,firstName,lastName,userRoles,token});
				})
				.catch(next)
		})
		.catch(err => res.status(500).json({message: 'The server is currently unable to correctly handle the request', detail: err.message}))
	}

	loginAdmin = (req,res,next) => {
		const {User} = this.models;
		return User.findByPk(1)
			.then(admin => {
				// console.log(admin, 'new admin');
				bcryptjs.compare(req.body.password, admin.password)
					.then(response => {
						const {id, email, firstName, lastName} = admin;
						if(response){
							// delete admin.password;
							return admin.getRole()
								.then(role=>{
									// console.log(admin, 'admin')
									// console.log(role, 'role')

									const userRoles = [role.name];
									const token = signToken({id,email,firstName,lastName, userRoles});
									return res.status(200).json({id,email,firstName,lastName,userRoles,token});
								})
								.catch(next)
							// const token = jwt.sign({id,email,firstName,lastName}, process.env.JWT_SECRET, {expiresIn: '24h'})
							// return res.status(200).json({ firstName,lastName,userRoles,email, token});
						}
						return res.status(401).json({message: 'Unauthorized access'})
					})
					.catch(error => res.status(500).json({message: 'Server error', detail: error.message}))
			})
			.catch(error => res.status(500).json({message: 'Server error', detail: error.message}))
	}
}
export default new UserController(db);
