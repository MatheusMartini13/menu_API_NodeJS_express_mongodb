// Category Schema Definition 

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema({
	parent: {
		type: Schema.Types.ObjectId,
		ref: 'Category',
	},
	name: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('Category', categorySchema);
