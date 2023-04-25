// controllers
const productController = require('../controllers/product');

// validation
const { body } = require('express-validator');

// middlewares
const { isAuth } = require('../middleware/auth');

// express router
const express = require('express');
const router = express.Router();

// routes definition
router.get('/product', productController.getAllProducts);
router.get('/product:productId', productController.getOneProduct);
router.post(
	'/product',
	isAuth,
	[
		body('name', 'Error in name. Check if it is a valid string.')
			.trim()
			.not()
			.isEmpty()
			.escape(),
		body('categories.*', 'Error in categories. Check if it is defined.')
			.trim()
			.not()
			.isEmpty()
			.escape(),
		body('price', 'Error in price. Check if it is a valid number.')
			.trim()
			.isNumeric()
			.toFloat(),
		body('quantity', 'Error in quantity. Check if it is a valid number.')
			.trim()
			.isNumeric()
			.toFloat(),
	],
	productController.postProduct,
);
router.patch(
	'/product/:productId',
	[
		body('name', 'Error in name. Check if it is a valid string.')
			.trim()
			.not()
			.isEmpty()
			.escape(),
		body('categories.*', 'Error in categories. Check if it is defined.')
			.trim()
			.not()
			.isEmpty()
			.escape(),
		body('price', 'Error in price. Check if it is a valid number.')
			.trim()
			.isNumeric()
			.toFloat(),
		body('quantity', 'Error in quantity. Check if it is a valid number.')
			.trim()
			.isNumeric()
			.toFloat(),
	],
	isAuth,
	productController.patchProduct,
);
router.delete('/product:productId', isAuth, productController.deleteProduct);

// router export
module.exports = router;
