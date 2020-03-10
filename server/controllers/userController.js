import db from "../models/index";
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import { signToken } from "../validations/auth";

/**
 * Class handling user's business logic
 * An instance with a model is exported by default
 * A plain Object is also exported and accessible via named import
 */
export class UserController {
	constructor(db){
		this.models = db;
	}

	signupUser = (req, res, next) => {
		const { User } = this.models;
		const hashedPassword = bcryptjs.hashSync(req.body.password, 8);

		User.findOne({
			where: {
				email: req.body.email
			}
		}).then(user => {
			if(user){
				return res.status(400).send({message: 'User already exists'})
			}
			return User.create({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			password: hashedPassword,
			roleId: 2, //role id of user.
		}).then(user => {
			const {id,email,firstName,lastName} = user;
			user.getRole()
				.then(role=>{
					const userRoles = [role.name];
					const token = signToken({id,email,firstName,lastName,userRoles});
					return res.status(201).json({id,email,firstName,lastName,userRoles,token});
				})
				.catch(next)
		})
		.catch(err => res.status(500).json({message: 'The server is currently unable to correctly handle the request', detail: err.message}))
		})
	}

	loginUser = (req,res,next) => {
		const {User} = this.models;

		User.findOne({
			where: {
				email: req.body.email
			}
		}).then(user => {
			if(user){
				bcryptjs.compare(req.body.password, user.password)
					.then(response => {
						const {id, email, firstName, lastName} = user;
						if(response){
							return user.getRole()
								.then(role=>{

									const userRoles = [role.name];
									const token = signToken({id,email,firstName,lastName, userRoles});
									return res.status(200).json({id,email,firstName,lastName,userRoles,token});
								})
								.catch(next)
						}
						return res.status(401).json({message: 'Unauthorized access'})
					})
					.catch(error => res.status(500).json({message: 'Server error', detail: error.message}))
			} else {
				return res.status(400).json({message: 'Invalid credentials'})
			}
		})
	}

	loginAdmin = (req,res,next) => {
		const {User} = this.models;
		return User.findByPk(1)
			.then(admin => {
				bcryptjs.compare(req.body.password, admin.password)
					.then(response => {
						const {id, email, firstName, lastName} = admin;
						if(response){
							return admin.getRole()
								.then(role=>{

									const userRoles = [role.name];
									const token = signToken({id,email,firstName,lastName, userRoles});
									return res.status(200).json({id,email,firstName,lastName,userRoles,token});
								})
								.catch(next)
						}
						return res.status(401).json({message: 'Unauthorized access'})
					})
					.catch(error => res.status(500).json({message: 'Server error', detail: error.message}))
			})
			.catch(error => res.status(500).json({message: 'Server error', detail: error.message}))
	}
}
export default new UserController(db);
