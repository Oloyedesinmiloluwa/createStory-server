import chaiHttp from 'chai-http';
import chai, {assert} from 'chai';
import app from '../../main';

chai.use(chaiHttp)

describe('Test create User endpoint', ()=> {
	it('should create users', (done) => {
		chai.request(app)
			.post('/api/login')
			.send({
				email: 'test@gmail.com',
				password: 'newpassword'
			})
			.end((err, res)=>{
				assert.equal(res.status, 200);
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
})
