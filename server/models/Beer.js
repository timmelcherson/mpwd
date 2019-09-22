const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const BeerSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String
	},
	score: {
		type: Number,
		required: true
	},
	img: {
		type: String
	},
	date: {
		type: String
	}
});

module.exports = Beer = mongoose.model('Beer', BeerSchema);
