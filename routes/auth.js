// controllers
const authController = require('../controllers/auth');

// validation
const { body } = require('express-validator');

// express router
const express = require('express');
const router = express.Router();

// routes definition
router.post(
	'/auth/singup',
	[
		body('password').trim().not().isEmpty(),
		body('username').trim().not().isEmpty(),
	],
	authController.postSingUp,
);
router.post(
	'/auth/login',
	[
		body('password').trim().not().isEmpty(),
		body('username').trim().not().isEmpty(),
	],
	authController.postLogin,
);

module.exports = router;
