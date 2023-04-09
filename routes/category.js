// controllers
const categoryController = require('../controllers/category');

// express router
const express = require('express');
const router = express.Router();

// routes definition
router.get('/category', categoryController.getCategory);

// router export
module.exports = router;
