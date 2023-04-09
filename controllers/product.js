// models
const Product = require('../models/product');
const Category = require('../models/category');

// validation results import
const { validationResult } = require('express-validator');

// functions
exports.getAllProducts = async (req, res, next) => {
	const products = await Product.find();
	console.log(products);

	res.status(200).json({
		products: products,
	});
};

exports.postProduct = async (req, res, next) => {
	// variables fetch
	const name = req.body.name;
	const reqCategories = req.body.categories;
	const quantity = req.body.quantity;
	const price = req.body.price;
	let realCategories;

	// validation error verification
	const errors = validationResult(req);
	console.log(errors);
	if (!errors.isEmpty()) {
		const error = new Error('Validation error.');
		error.statusCode = 404;
		error.data = errors.array();
		return next(error);
	}

	// categories validation and ._id return
	try {
		realCategories = await Promise.all(
			reqCategories.map(async (category) => {
				const existingCategory = await Category.findOne({
					name: category.toLowerCase(),
				});
				if (!existingCategory) {
					const error = new Error('One or more Categories do not exist!');
					error.statusCode = 404;
					error.data = { wrongCategory: category };
					throw error;
				}
				return existingCategory._id;
			}),
		);
	} catch (error) {
		return next(error);
	}

	// db product creation
	const newProduct = new Product({
		name: name,
		categories: realCategories,
		price: price,
		qty: quantity,
	});

	console.log(newProduct);

	res.status(200).json({
		products: 'test',
	});
};
