// models
const Product = require('../models/product');
const Category = require('../models/category');

// validation results import
const { validationResult } = require('express-validator');

// functions
exports.getAllProducts = async (req, res, next) => {
	// database all products find
	const products = await Product.find().populate('categories');

	// request handler
	res.status(200).json({
		products: products,
	});
};

exports.getOneProduct = async (req, res, next) => {
	// variables
	const id = req.params.productId;

	// database Product find
	const product = await Product.findById(id).populate('categories');

	// validation
	if (!product) {
		const error = new Error('Product not found.');
		error.statusCode = 404;
		return next(error);
	}

	// request handler
	res.status(200).json({
		product: product,
	});
};

exports.postProduct = async (req, res, next) => {
	// variables
	const name = req.body.name;
	const reqCategories = req.body.categories;
	const quantity = req.body.quantity;
	const price = req.body.price;
	let realCategories;

	// basic user input validation error verification
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const error = new Error('Validation error.');
		error.statusCode = 400;
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

	// product validation

	const existingProduct = await Product.findOne({ name: name });
	if (existingProduct) {
		const error = new Error(
			'There is another product in the database with the same name.',
		);
		error.statusCode = 400;
		error.data = { databaseProductId: existingProduct._id };
		return next(error);
	}

	// db product creation
	const newProduct = new Product({
		name: name,
		categories: realCategories,
		price: price,
		qty: quantity,
	});

	// database save
	newProduct.save();

	// response handler
	res.status(200).json({
		message: 'Product created successfully',
		product: newProduct,
	});
};

exports.patchProduct = async (req, res, next) => {
	// variables
	const name = req.body.name;
	const reqCategories = req.body.categories;
	const quantity = req.body.quantity;
	const price = req.body.price;
	const productId = req.params.productId;
	let realCategories;

	// basic user input validation error verification
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const error = new Error('Validation error.');
		error.statusCode = 400;
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

	// DB product find and validation
	const product = await Product.findById(productId);
	if (!product) {
		const error = new Error('Product not found.');
		error.statusCode = 404;
		return next(error);
	}

	// change product information
	product.name = name;
	product.categories = realCategories;
	product.price = price;
	product.qty = quantity;

	console.log(product);

	//db product save
	await product.save();

	// request handler
	res.status(200).json({
		message: 'Product patched successfully.',
		product: product,
	});
};

exports.deleteProduct = async (req, res, next) => {
	// variables
	const productId = req.params.productId;

	// db find and delete
	const deletedProduct = await Product.findByIdAndDelete(productId);

	if (!deletedProduct) {
		const error = new Error('Product not found.');
		error.statusCode = 404;
		return next(error);
	}

	// request handler
	res.status(200).json({
		message: 'Product deleted successfully.',
		deletedProduct: deletedProduct,
	});
};
