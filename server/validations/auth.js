import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
	let token;
	if (req.headers.authorization) {
		token = req.headers.authorization.split(" ")[1];
	} else {
		token = req.headers['x-access-token'];
	}
	return jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
	  if (error){
		return res.status(401).send({ message: 'Authentication failed' });
	  } 
	  req.decoded = decoded;
	  return next();
	});
};

export const signToken = (data) => {
	return jwt.sign(data, process.env.JWT_SECRET, {expiresIn: '24h'})
}

export default auth;
