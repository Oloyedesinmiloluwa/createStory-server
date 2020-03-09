import express from 'express';
import userController from '../controllers/userController';

const userRoute = express();
userRoute
	.route('/login')
	.post(userController.loginUser);
userRoute
	.route('/admin-login')
	.post(userController.loginAdmin)
// module.exports = userRoute;
export default userRoute;
