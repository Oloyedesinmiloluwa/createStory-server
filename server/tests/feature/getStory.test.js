import chaiHttp from 'chai-http';
import chai, {assert} from 'chai';
import storyRoute from '../../routes/story';
import generateToken from '../generateToken';

chai.use(chaiHttp)
const token = generateToken();
const adminToken = generateToken(true);
describe('Test get story endpoint', ()=> {
	it('User should retrieve own stories only', (done) => {
		chai.request(storyRoute)
			.get('/getStories')
			.set({'authorization': `Bearer ${token}`})
			.end((err, res)=>{
				assert.equal(res.status, 200);
				assert.isArray(res.body, 'Returned array object')
				assert.isNotEmpty(res.body)
				assert.equal(2, res.body[0].userId)
				assert.equal(2, res.body[1].userId)
				done()
		})
	})
	it('User should not retrieve stories if unauthenticated', (done) => {
		chai.request(storyRoute)
			.get('/getStories')
			.set({'authorization': ''})
			.end((err, res)=>{
				assert.equal(res.status, 401);
				assert.equal(res.body.message, 'Authentication failed')
				done()
		})
	})
	it('Admin should retrieve stories that are pending only', (done) => {
		chai.request(storyRoute)
			.get('/getStories')
			.set({'authorization': `Bearer ${adminToken}`})
			.end((err, res)=>{
				assert.equal(res.status, 200);
				assert.isArray(res.body, 'Returned array object')
				assert.isNotEmpty(res.body)
				assert.equal(null,res.body[0].status)
				done()
		})
	})
})
