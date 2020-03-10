import chaiHttp from 'chai-http';
import chai, {assert} from 'chai';
import app from '../../main';

chai.use(chaiHttp)

describe('Test create User endpoint', ()=> {
	it('should create users', (done) => {
		chai.request(app)
			.post('/api/signup')
			.send({
				firstName: 'name',
				lastName: 'afsf',
				email: 'test@gmail.com',
				password: 'newpassword'
			})
			.end((err, res)=>{
				assert.equal(res.status, 201);
				assert.isObject(res.body, 'Returned user object')
				assert.isNotEmpty(res.body)
				done()
			})
	})
	it('should not accept wrong email', (done) => {
		chai.request(app)
			.post('/api/login')
			.send({
				email: 'test&&gmail.com',
				password: 'newpassword'
			})
			.end((err, res)=>{
				assert.equal(res.status, 422);
				assert.equal(res.body.message, 'Invalid email address')
				assert.isNotEmpty(res.body)
				done()
			})
	})
	it('should not accept email that is more than 100 characters', (done) => {
		chai.request(app)
			.post('/api/login')
			.send({
				email: 'test@gmasfdfdajflsfjererjelrejruoeuroerelkrkerlsdjfldsffsfsdfdfjulkjl33l3jlj3l3jkl3j3lk3jlk3sfsdfil.com',
				password: 'newpassword'
			})
			.end((err, res)=>{
				assert.equal(res.status, 400);
				assert.equal(res.body.message, 'Email cannot be more than 100 characters')
				done()
			})
	})
	it('should not accept password that is more than 50 characters', (done) => {
		chai.request(app)
			.post('/api/login')
			.send({
				email: 'test@gmasfdl.com',
				password: 'newpasswordnewpasswordnewpasswordnewpasswordnewpasswordnewpasswordnewpasswordn'
			})
			.end((err, res)=>{
				assert.equal(res.status, 400);
				assert.equal(res.body.message, 'Password cannot be more than 50 characters')
				done()
			})
	})
	it('should not create new account for an exisiting user', (done) => {
		chai.request(app)
			.post('/api/signup')
			.send({
				firstName: 'Taiwo',
				lastName: 'Kehinde',
				email:  'test@yahoo.com',
				password: 'passwordnewpassword'
			})
			.end((err, res)=>{
				assert.equal(res.status, 400);
				assert.equal(res.body.message, 'User already exists')
				done()
			})
	})
	it('should not create user is firstname is missing or empty', (done) => {
		chai.request(app)
			.post('/api/signup')
			.send({
				firstName: '',
				lastName: 'Kehinde',
				email: 'testingfakeuser@yahoo.com',
				password: 'passwordnewpassword'
			})
			.end((err, res)=>{
				assert.equal(res.status, 400);
				assert.equal(res.body.message, 'Missing required fields')

				assert.equal(res.body.errors.firstName, 'firstName field is required')
				done()
			})
	})
	it('should not create user if lastname is missing or empty', (done) => {
		chai.request(app)
			.post('/api/signup')
			.send({
				firstName: 'Last Person',
				lastName: '',
				email: 'testingfakeuser@yahoo.com',
				password: 'passwordnewpassword'
			})
			.end((err, res)=>{
				assert.equal(res.status, 400);
				assert.equal(res.body.message, 'Missing required fields')
				assert.equal(res.body.errors.lastName, 'lastName field is required')
				done()
			})
	})
	it('should not create user if email is missing or empty', (done) => {
		chai.request(app)
			.post('/api/signup')
			.send({
				firstName: 'Last Person',
				lastName: 'First person',
				email: '',
				password: 'passwordnewpassword'
			})
			.end((err, res)=>{
				assert.equal(res.status, 400);
				assert.equal(res.body.message, 'Missing required fields')
				assert.equal(res.body.errors.email, 'email field is required')
				done()
			})
	})
	it('should not create user if password is missing or empty', (done) => {
		chai.request(app)
			.post('/api/signup')
			.send({
				firstName: 'Last Person',
				lastName: 'fsfsffsf',
				email: 'testingfakeuser@yahoo.com',
				password: ''
			})
			.end((err, res)=>{
				assert.equal(res.status, 400);
				assert.equal(res.body.message, 'Missing required fields')
				assert.equal(res.body.errors.password, 'password field is required')
				done()
			})
	})
})
