// controllers
const categoryController = require('../controllers/category');

// middlewares
const { isAuth } = require('../middleware/auth');

// express router
const express = require('express');
const router = express.Router();

// routes definition
router.use('/category*', isAuth);
router.get('/category', categoryController.getCategory);

// router export
module.exports = router;
