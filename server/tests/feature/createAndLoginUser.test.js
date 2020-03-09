import chaiHttp from 'chai-http';
import chai, {assert} from 'chai';
import app from '../../main';

chai.use(chaiHttp)

describe('Test create User endpoint', ()=> {
	it('should create users', (done) => {
		chai.request(app)
			.post('/api/login')
			.send({
				firstName: 'Myself',
				lastName: 'themselves',
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
})
