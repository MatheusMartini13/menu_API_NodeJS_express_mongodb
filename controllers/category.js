//models
const Category = require('../models/category');

// functions
exports.getCategory = async (req, res, next) => {
	const allCategories = await Category.find().populate('parent');

	res.status(200).json({
		categories: allCategories,
	});
};
