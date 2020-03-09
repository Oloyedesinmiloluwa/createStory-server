import chaiHttp from 'chai-http';
import chai, {assert} from 'chai';
import app from '../../main';
import auth from '../../validations/auth';

const reqMock = {
	body: {},
	headers: []
}
class resMock {
	constructor(){
		this.statusCode = '',
		this.body = ''
	}
	status = (code)=>{
		this.stateCode = code;
		return this;
	}
	send = (object)=>{
		this.data = object;
		return this;
	}
}

describe('/POST Stories', ()=> {
	it('restrict user access if not authenticated', (done) => {
		const response = auth(reqMock,new resMock(),()=>{})
		assert.equal(response.stateCode, 401)
		assert.notStrictEqual(response.data, {message: 'Authentication failed'})
		done()
	})
})
