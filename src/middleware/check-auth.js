const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		jwt.verify(token, 'some-public-key');
		next();
	} 
	catch (error) {
			return res.status(401).json({
					message: 'Authoritzation failed'
			});
	}
};