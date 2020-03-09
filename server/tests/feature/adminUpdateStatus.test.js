import chaiHttp from 'chai-http';
import chai, {assert} from 'chai';
import app from '../../main';
import { signToken } from '../../validations/auth';
import generateToken from '../generateToken';

chai.use(chaiHttp)
const adminToken = generateToken(true)
describe('Test acceptance/rejection of story', ()=> {
	it('admin should be able to approve', (done) => {
		chai.request(app)
			.put('/api/stories/1/approve')
			.set({'Authorization': `Bearer ${adminToken}`})
			.end((err, res)=>{
				assert.equal(res.status, 200);
				assert.isObject(res.body, 'Returned story object')
				assert.isNotEmpty(res.body)
				assert.equal(res.body.status, true)
				done()
			})
	})
	it('admin should be able to reject story', (done) => {
		chai.request(app)
			.put('/api/stories/1/reject')
			.set({'Authorization': `Bearer ${adminToken}`})
			.end((err, res)=>{
				assert.equal(res.status, 200);
				assert.isObject(res.body, 'Returned story object')
				assert.isNotEmpty(res.body)
				assert.equal(res.body.status, false)
				done()
			})
	})
})
