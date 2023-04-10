// password encryptation module
const bcrypt = require('bcryptjs');

// json web token import
const jwt = require('jsonwebtoken');

// models
const User = require('../models/User');

const { validationResult } = require('express-validator');

exports.postLogin = async (req, res, next) => {
	// user input
	const username = req.body.username;
	const password = req.body.password;
  
	try {
    // user validation
		const user = await User.findOne({ username: username });
		if (!user) {
      throw new Error('Login Error - Username');
		}

		// password validation - bcrypt used to encrypt data and ensure safety
		const rightPassword = await bcrypt.compare(password, user.password);
		if (!rightPassword) {
			throw new Error('Login Error - Password');
		}
		//token generation
		const token = jwt.sign(
			{
				username: user.username,
				userId: user.id,
			},
			process.env.SECRETJWT,
			{ expiresIn: 15*60 },
		);

		// response
		return res.status(200).json({ token: token });
	} catch (error) {
		error.statusCode = 401;
		return next(error);
	}
};

exports.postSingUp = async (req, res, next) => {
	try {
		// user input
		const username = req.body.username;
		const password = req.body.password;

		// basic validation verification
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			const error = new Error('Validation error.');
			error.data = errors.array();
			throw error;
		}

		// user validation
		const user = await User.findOne({ username: username });
		if (user) {
			throw new Error('User already exists');
		}

		// password encrypt
		const rightPassword = await bcrypt.hash(password, 12);

		// user creation
		const newUser = new User({ username: username, password: rightPassword });

		// db user save
		await newUser.save();

		// response
		res.status(200).json({ message: 'User created successfully' });
	} catch (error) {
		error.statusCode = 401;
		return next(error);
	}
};
