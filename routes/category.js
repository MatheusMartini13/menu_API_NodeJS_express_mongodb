// 3rd party modules
const express = require('express');

// constrollers
const categoryController = require('../controllers/category');

// Router

const router = express.Router();

router.get('/category', categoryController.getCategory);

module.exports = router;
