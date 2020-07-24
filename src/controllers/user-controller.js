require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const User = require('../models/user-model')

const loginUser = (req, res) => {

	User.findOne({username: req.body.username})
	.exec()
	.then(user => {
		if (user) {
			const passwordMatches = bcrypt.compareSync(req.body.password, user.password)
			if (passwordMatches) {
				const token = jwt.sign({username: req.body.username, password: req.body.password}, process.env.JWT_KEY, {expiresIn: "30m"	} );
				return res.status(200).json(token)
			}
			return res.status(404).json({message: 'Authentication failed'})
			
		}
		return res.status(404).json({message: 'Authentication failed'})
	})
	.catch(err => res.status(400).json({error: err}))
}

module.exports.loginUser = loginUser