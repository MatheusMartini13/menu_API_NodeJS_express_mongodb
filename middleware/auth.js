const jwt = require('jsonwebtoken');

exports.isAuth = (req, res, next) => {
	try {
		const authHeader = req.get('Authorization');
		if (!authHeader) {
			throw new Error('Not authenticated! Header not Found.');
		}
		const token = authHeader.split(' ')[1];
		let decodedToken;
		decodedToken = jwt.verify(token, process.env.SECRETJWT);
		if (!decodedToken) {
			throw new Error('Not authenticated! Token not match!');
		}
		req.userId = decodedToken.userId;
		req.isAuth = true;
	} catch (error) {
		error.code = 401;
		return next(error);
	}
	next();
};