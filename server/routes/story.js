import storyController from '../controllers/storyController';
import express from 'express';
import auth from '../validations/auth';
import StoryValidation from '../validations/StoryValidation';

const storyRoute = express();
storyRoute.route('/createStories')
	.post(auth,StoryValidation.handleRequestResponse, storyController.createStory);
storyRoute.route('/stories/:storyId/approve')
	.put(auth,storyController.approve);
storyRoute.route('/stories/:storyId/reject')
	.put(auth,storyController.reject);
storyRoute.route('/getStories')
	.get(auth, storyController.getStory)
export default storyRoute;
