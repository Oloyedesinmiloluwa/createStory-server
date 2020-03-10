import express from 'express';
import expressValidator from 'express-validator';
import userController from '../controllers/userController';
import { validateUserDetails, validateSignupDetails } from '../validations/userValidation';

const userRoute = express();
userRoute.use(expressValidator());
userRoute
	.route('/login')
	.post(validateUserDetails, userController.loginUser);
userRoute
	.route('/admin-login')
	.post(userController.loginAdmin)
userRoute
	.route('/signup')
	.post(validateSignupDetails, userController.signupUser);
export default userRoute;
