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
	it('should not create story if summary is more than 250 characters', (done) => {
		chai.request(app)
			.post('/api/createStories')
			.set({'authorization': `Bearer ${token}`})
			.send({
				summary: 'should not create story if summary is more than 250 characters should not create story if summary is more than 250 characters should not create story if summary is more than 250 characters',
				description: 'we are new',
				cost: 100,
				estimatedHrs: 8,
				time: 3,
				complexity: 'high',
				type: 'qa'
			})
			.end((err, res)=>{
				assert.equal(res.status, 400);
				assert.equal(res.body.message, 'Summary cannot be more than 180 characters')
				done()
			})
	})
	it('should not create story if description is more than 255 characters', (done) => {
		chai.request(app)
			.post('/api/createStories')
			.set({'authorization': `Bearer ${token}`})
			.send({
				description: 'not create story if summary is more than 250 characters should not create story if summary is more than 250 characters should not create story if summary is more than 250 characters should not create story if summary is more than 250 characters should not create story if summaryers',
				summary: 'we are new',
				cost: 100,
				estimatedHrs: 8,
				time: 3,
				complexity: 'high',
				type: 'qa'
			})
			.end((err, res)=>{
				assert.equal(res.status, 400);
				assert.equal(res.body.message, 'Description cannot be more than 255 characters')
				done()
			})
	})
	it('should not create story if cost is more than 10 characters', (done) => {
		chai.request(app)
			.post('/api/createStories')
			.set({'authorization': `Bearer ${token}`})
			.send({
				description: 'should not create if summary is more than 250 characters',
				summary: 'we are new',
				cost: 10049494848444,
				estimatedHrs: 8,
				time: 3,
				complexity: 'high',
				type: 'qa'
			})
			.end((err, res)=>{
				assert.equal(res.status, 400);
				assert.equal(res.body.message, 'Cost cannot be more than 10 characters')
				done()
			})
	})
	it('should not create story if complexity is more than 15 characters', (done) => {
		chai.request(app)
			.post('/api/createStories')
			.set({'authorization': `Bearer ${token}`})
			.send({
				description: 'should not create if summary is more than 250 characters',
				summary: 'we are new',
				cost: 144,
				estimatedHrs: 8,
				time: 3,
				complexity: 'highfsfsfdsfsdffsdfdkjlsf jdsklfjdslfldsjflkjfdskljflkdsjfdf',
				type: 'qa'
			})
			.end((err, res)=>{
				assert.equal(res.status, 400);
				assert.equal(res.body.message, 'Complexity cannot be more than 20 characters')
				done()
			})
	})
	it('should not create story if time is more than 3 characters', (done) => {
		chai.request(app)
			.post('/api/createStories')
			.set({'authorization': `Bearer ${token}`})
			.send({
				description: 'should not create if summary is more than 250 characters',
				summary: 'we are new',
				cost: 144,
				estimatedHrs: 8345,
				complexity: 'enhancement',
				type: 'qa'
			})
			.end((err, res)=>{
				assert.equal(res.status, 400);
				assert.equal(res.body.message, 'EstimatedHrs cannot be more than 3 characters')
				done()
			})
	})
	it('should not create story if type is more than 20 characters', (done) => {
		chai.request(app)
			.post('/api/createStories')
			.set({'authorization': `Bearer ${token}`})
			.send({
				description: 'should not create if summary is more than 250 characters',
				summary: 'we are new',
				cost: 144,
				estimatedHrs: 84,
				time: 3,
				complexity: 'mid',
				type: 'enhancement that i too long for normal input'
			})
			.end((err, res)=>{
				assert.equal(res.status, 400);
				assert.equal(res.body.message, 'Type cannot be more than 20 characters')
				done()
			})
	})
})
