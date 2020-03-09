import storyValidate from '../../validations/StoryValidation';
import chai, {assert} from 'chai';

describe('Validate isRequired function', ()=>{
	const expectedErrors = {
		summary: 'summary field is required',
		description: 'description field is required',
		cost: 'cost field is required',
		estimatedHrs: 'estimatedHrs field is required',
		complexity: 'complexity field is required',
		type: 'type field is required'
	  }
	it('should return error message for missing fields', ()=> {
		assert.equal(JSON.stringify(storyValidate.isRequired({body: {}})),JSON.stringify(expectedErrors))
	});
	it('should return error message for spaces only', ()=> {
		const input = {
			summary: '     ',
			description: '     ',
			cost: '       ',
			estimatedHrs: '     ',
			complexity: '      ',
			type: '     '
		  }
		assert.equal(JSON.stringify(storyValidate.isRequired({body: {...input}})),JSON.stringify(expectedErrors))
	})
})
