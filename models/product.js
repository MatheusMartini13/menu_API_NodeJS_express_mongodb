// Product Schema Definition
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
	categories: {
		type: [Schema.Types.ObjectId],
		ref: 'Category',
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	qty: {
		type: Number,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
});

module.exports = mongoose.model('Product', productSchema);
