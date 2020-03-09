
import db from "../models/index";

/**
 * A class for handling business logic pertaining to stories.
 * 
 * An instance initialized with models is exported by default.
 * An uninitialized instance is also exported and is accessible
 * via named import.
 */
export class StoryController {

	constructor(db){
		this.models = db;
	}
	createStory = (req, res) => {
		const {Story} = this.models;
		return Story.create({
			summary: req.body.summary,
			description: req.body.description,
			cost: req.body.cost,
			estimatedHrs: req.body.estimatedHrs,
			type: req.body.type,
			complexity: req.body.complexity,
			userId: req.decoded.id,
			status: null // make it pending
		})
		.then(story => {
			return res.status(201).json(story);
		})
		.catch(err => res.status(500).send({ message: 'The server is currently unable to correctly handle the request', detail: err}));
	}

	getStory = (req, res, next) => {
		const {Story} = this.models;
		let options;

		// is Admin
		options = req.decoded.id === 1 ? {status: null} : {userId: req.decoded.id}
		return Story.findAll({
			where: options
		})
		.then(stories => {
			res.status(200).json(stories);
		})
		.catch(next)	
	}
	updateStatus = (req, res,next, status) => {
		const {Story} = this.models;
		Story
			.update(
				{
					status
				},
				{
					where: {
					id: req.params.storyId
				}
			})
			.then(() => {
				Story.findByPk(req.params.storyId)
					.then(story => res.status(200).json(story))
					.catch(next)
			
		})
	}
	approve = (req, res,next) => {
		if(req.decoded.id !== 1) {
			return res.status(403).json({message: 'Unauthorized Access'})
		}
		this.updateStatus(req, res,next, 1)
	}

	reject = (req,res,next) => {
		// move to single file
		if(req.decoded.id !== 1) {
			return res.status(403).json({message: 'Unauthorized Access'})
		}
		// set status to rejected
		this.updateStatus(req, res,next, 0)
	}
}
export default new StoryController(db);
