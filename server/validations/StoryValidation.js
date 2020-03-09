class StoryValidation {

	handleRequestResponse = (req, res, next) => {
		const isRequiredErrors =	this.isRequired(req.body);
		if(this.isNotEmpty(isRequiredErrors)){
			return res.status(400).json(isRequiredErrors);
		}
		req.checkBody('summary', 'Summary cannot be more than 180 characters').isLength({ max: 180 });
		req.checkBody('description', 'Description cannot be more than 255 characters').isLength({ max: 255 });
		req.checkBody('cost', 'Cost cannot be more than 10 characters').isLength({ max: 10 });
		req.checkBody('complexity', 'Complexity cannot be more than 20 characters').isLength({ max: 15 });
		req.checkBody('estimatedHrs', 'EstimatedHrs cannot be more than 3 characters').isLength({ max: 3 });
		req.checkBody('type', 'Type cannot be more than 20 characters').isLength({ max: 20 });
		const errors = req.validationErrors();
		if (errors) {
			return res.status(400).json({ message: errors[0].msg });
		}
		return next()
	}

	isNotEmpty = (object) => {
		return !!Object.keys(object).length
	}

	isRequired = (object) => {
		const requiredkeys = ['summary', 'description', 'cost', 'estimatedHrs', 'complexity', 'type'];
		let error = requiredkeys.reduce((prev,curr)=>{
			if(!object[curr] || (typeof object[curr] === 'string'  && !object[curr].trim())){
				return {...prev, [curr]:  `${curr} field is required`};
			}
			return {}
		},{})
		return error;
	}
}
export default new StoryValidation();
