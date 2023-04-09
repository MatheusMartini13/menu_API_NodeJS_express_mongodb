// controllers
const productController = require('../controllers/product');

// validation
const { body } = require('express-validator');

// express router
const express = require('express');
const router = express.Router();

// routes definition
router.get('/product', productController.getAllProducts);
// router.get('/product:id', productController.getOneProduct);
router.post(
	'/product',
	[
		body('name').not().isEmpty().escape(),
		body('categories.*').trim().not().isEmpty().escape(),
		body('price').trim().isNumeric().toFloat(),
		body('quantity').trim().isNumeric().toFloat(),
	],
	productController.postProduct,
);
// router.patch('/product/:id', productController.patchProduct);
// router.delete('/product:id', productController.deleteProduct);

// router export
module.exports = router;
