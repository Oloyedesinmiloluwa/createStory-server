import chaiHttp from 'chai-http';
import chai, {assert} from 'chai';
import app from '../../main';
import generateToken from '../generateToken';

chai.use(chaiHttp)
const token = generateToken();

describe('/POST Stories', ()=> {
	it('should create stories', (done) => {
		chai.request(app)
			.post('/api/createStories')
			.set({'authorization': `Bearer ${token}`})
			.send({
				summary: 'we are one',
				description: 'we are new',
				cost: 100,
				estimatedHrs: 8,
				time: 3,
				complexity: 'high',
				type: 'qa'
			})
			.end((err, res)=>{
				assert.equal(res.status, 201);
				assert.isObject(res.body, 'Returned array object')
				assert.isNotEmpty(res.body)
				assert.equal(res.body.summary, 'we are one');
				done()
			})
	})
	it('should not create stories if user is not authenticated', (done) => {
		chai.request(app)
			.post('/api/createStories')
			.send({
				summary: 'we are one',
				description: 'we are new',
				cost: 100,
				estimatedHrs: 8,
				time: 3,
				complexity: 'high',
				type: 'qa'
			})
			.end((err, res)=>{
				assert.equal(res.status, 401);
				done()
			})
	})
	it('should not create story if missing key parameters', (done) => {
		chai.request(app)
			.post('/api/createStories')
			.set({'authorization': `Bearer ${token}`})
			.send({
				summary: '',
				description: '',
				cost: null,
				estimatedHrs: null
			})
			.end((err, res)=>{
				assert.equal(res.status, 400);
				assert.isObject(res.body, 'Returned array object')
				assert.isNotEmpty(res.body)
				done()
			})
	})
})
