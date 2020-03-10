export const validateUserDetails = (req, res, next) => {
	const isRequiredErrors = isRequired(req.body, ['email', 'password']);
	if (Object.keys(isRequiredErrors).length) {
		return res.status(400).json({message: 'Missing required fields', errors: {...isRequiredErrors}});
	}
	
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

const isRequired = (object, requiredkeys = []) => {
	const error = requiredkeys.reduce((prev,curr)=>{

		if(!object[curr] || (typeof object[curr] === 'string'  && !object[curr].trim())){
			return {...prev, [curr]:  `${curr} field is required`};
		}
		return {...prev}
	},{})
	return error;
}

export const validateSignupDetails = (req, res, next) => {
	// check if empty
	const isRequiredErrors = isRequired(req.body, ['email', 'password', 'firstName', 'lastName']);

	if (Object.keys(isRequiredErrors).length) {
		return res.status(400).json({message: 'Missing required fields', errors: {...isRequiredErrors}});
	}
	
	// check max length
	req.checkBody('firstName', 'FirstName cannot be more than 50 characters').isLength({ max: 50 });
	req.checkBody('lastName', 'LastName cannot be more than 50 characters').isLength({ max: 50 });
	validateUserDetails(req, res, next);
}
