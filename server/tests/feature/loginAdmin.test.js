import chaiHttp from 'chai-http';
import chai, {assert} from 'chai';
import dotenv from 'dotenv';
import app from '../../main';

dotenv.config();
chai.use(chaiHttp)
describe('/POST LOGIN endpoint', ()=> {
	it('admin should be able to login', (done) => {
		chai.request(app)
			.post('/api/admin-login')
			.send({
				email: 'admin@weCreate.com',
				password: 'admin'
			})
			.end((err, res)=>{
				assert.equal(res.status, 200);
				assert.isNotEmpty(res.body.token)
				done()
			})
	})
})
