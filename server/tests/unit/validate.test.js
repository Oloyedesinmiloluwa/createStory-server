import storyValidate from '../../validations/StoryValidation';
import chai, {assert} from 'chai';

describe('Validate create Story input', ()=>{
	it('should return error message for missing fields', ()=> {
		const expectedErrors = {
			summary: 'summary field is required',
			description: 'description field is required',
			cost: 'cost field is required',
			estimatedHrs: 'estimatedHrs field is required',
			complexity: 'complexity field is required',
			type: 'type field is required'
		  }
		assert.equal(JSON.stringify(storyValidate.validateCreateStory({body: {}})),JSON.stringify(expectedErrors))
	})
})
