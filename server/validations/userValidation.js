export const validateUserDetails = (req, res, next) => {
	req.checkBody('email', 'Email cannot be more than 100 characters').isLength({ max: 100 });
	req.checkBody('password', 'Password cannot be more than 50 characters').isLength({ max: 50 });
	req.check('email').isEmail().withMessage('Invalid email address');

	const errors = req.validationErrors();
		if (errors) {
			if (errors[0].msg === 'Invalid email address') {
				res.status(422).json({ message: errors[0].msg });
			} else {
				res.status(400).json({ message: errors[0].msg });
			}
			return;
		}
		return next();
}
