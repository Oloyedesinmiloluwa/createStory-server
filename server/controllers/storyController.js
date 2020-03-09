
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
			dateRejected: null,
			dateAccepted: null,
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

		// Retrieve based on role, admin or user
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
		// Check if it is admin
		if(req.decoded.id !== 1) {
			return res.status(403).json({message: 'Unauthorized Access'})
		}
		const {Story} = this.models;
		const date = status ? {dateAccepted: new Date()} : {dateRejected: new Date()};
		Story
			.update(
				{
					status,
					...date
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
		
		this.updateStatus(req, res,next, 1)
	}

	reject = (req,res,next) => {
		// set status to rejected
		this.updateStatus(req, res,next, 0)
	}
}
export default new StoryController(db);
